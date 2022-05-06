/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { appMessage, AppMessage, IMessage } from '../../context/AppMessage';
import useLazyFetchLatestMessages from '../../hooks/useLazyFetchLatestMessages';
import useLazyFetchMoreMessages from '../../hooks/useLazyFetchMoreMessages';
import setToScrollChat from '../../utils/setToScrollChat';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';

type IChatBox = {
  channelId: string;
};

let lastMessageId: string = '';
let firstMessageId: string = '';

const ChatBox: React.FC<IChatBox> = (props) => {
  const { channelId } = props;
  const [messages, setMessages] = useState(appMessage);
  const [firstPoll, setFirstPoll] = useState(true);
  const [oldPageCount, setOldPageCount] = useState(1);
  const appContext = useContext(AppContext);
  const fetchLatestMessages = useLazyFetchLatestMessages();
  const fetchMoreMessages = useLazyFetchMoreMessages();
  const fetchOldMessages = useLazyFetchMoreMessages();

  // Clear message after change channel
  useEffect(() => {
    // Set initial chat
    setFirstPoll(true);
    setOldPageCount(1);
    lastMessageId = '';
    firstMessageId = '';
  }, [channelId]);

  // Start subscription messages
  useEffect(() => {
    // Start get lastest messages
    if (firstPoll) {
      fetchLatestMessages.fetchData({
        variables: { channelId },
      });

      // Refetch when reopen
      fetchLatestMessages.refetch();
      fetchLatestMessages.startPolling(5000);
    }

    // Start fetch for subscription new messages
    if (!firstPoll && lastMessageId) {
      fetchMoreMessages.fetchData({
        variables: { channelId, messageId: lastMessageId, old: false },
      });
      fetchMoreMessages.startPolling(5000);
    }
  }, [firstPoll, lastMessageId]);

  // Start polling fist messages
  useEffect(() => {
    if (fetchLatestMessages.data) {
      latestMessageReceived(fetchLatestMessages.dataJson);
    }
  }, [fetchLatestMessages.data]);

  // Listen from subscription new messages
  useEffect(() => {
    if (fetchMoreMessages.data) {
      concatNewMessage(fetchMoreMessages.dataJson);
    }
  }, [fetchMoreMessages.data]);

  // Listen from fetch old messages
  useEffect(() => {
    if (fetchOldMessages.data) {
      concatOldMessage(fetchOldMessages.dataJson);
    }
  }, [fetchOldMessages.data]);

  // Start fetch old messages if oldPageCount increase.
  useEffect(() => {
    if (oldPageCount > 1 && firstMessageId) {
      const variables = {
        channelId,
        messageId: firstMessageId,
        old: true,
      };

      if (oldPageCount === 2) {
        fetchOldMessages.fetchData({
          variables,
        });
      }

      if (oldPageCount > 2) {
        fetchOldMessages.refetch(variables);
      }
    }
  }, [oldPageCount, firstMessageId]);

  const latestMessageReceived = (data: Array<IMessage>) => {
    // Pooling utils get message then stop
    if (data.length) {
      fetchLatestMessages.stopPolling();
    }

    if (firstPoll) {
      setMessages({ messages: data });
    }

    setFirstPoll(false);
    setToScrollChat('down');
    setLastMessageId(data);
    firstMessageId = data[0]?.messageId || '';
  };

  // Push new message to old message
  const pushMessage = (data: IMessage) => {
    const oldMessage = [...messages.messages];
    oldMessage.push(data);
    setMessages({ messages: oldMessage });
  };

  const concatNewMessage = (newMessage: Array<IMessage>) => {
    const newMessageData = [...messages.messages];

    // Logic check messageId exists
    newMessage.forEach((message) => {
      const hasMessage = newMessageData.some(
        (messageFind) => message.messageId === messageFind.messageId
      );

      if (!hasMessage) {
        newMessageData.push(message);
      }
    });

    setMessages({ messages: newMessageData });
    setToScrollChat('down');
    setLastMessageId(newMessageData);

    // Refetch more last message
    fetchMoreMessages.stopPolling();
    fetchMoreMessages.refetch({
      channelId,
      messageId: lastMessageId,
      old: false,
    });
    fetchMoreMessages.startPolling(5000);
  };

  const concatOldMessage = (newMessage: Array<IMessage>) => {
    const newMessageData = [...newMessage, ...messages.messages];
    setMessages({ messages: newMessageData });
    setToScrollChat('top');
    firstMessageId = newMessageData[0]?.messageId || '';
  };

  // Set last messageId
  const setLastMessageId = (data: Array<IMessage>) => {
    const formatData = [...data];
    if (formatData.filter((value) => value.messageId).length) {
      lastMessageId = formatData.reverse().at(0)?.messageId || '';
    }
  };

  const getMoreMessages = () => {
    if (
      fetchMoreMessages.loading ||
      fetchOldMessages.loading ||
      fetchLatestMessages.loading
    )
      return;
    setOldPageCount(oldPageCount + 1);
  };

  return (
    <AppMessage.Provider value={messages}>
      <div className="chat-box">
        {messages?.messages.length > 0 && (
          <div className="button-more">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => getMoreMessages()}
            >
              Read More ⬆️
            </button>
          </div>
        )}
        <ChatContainer
          data={messages?.messages || []}
          userActive={appContext.userSelect}
        />
        <ChatInput
          channelId={channelId}
          userActive={appContext.userSelect}
          pushMessage={pushMessage}
        />
      </div>
    </AppMessage.Provider>
  );
};
export default ChatBox;
