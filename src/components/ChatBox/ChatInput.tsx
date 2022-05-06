import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { IMessage } from '../../context.js/AppMessage';
import { PostMessage } from '../../query';
import { IPostMessage } from '../../query/PostMessage';
import setToScrollChat from '../../utils/setToScrollChat';

type IChatInput = {
  channelId: string;
  userActive: string;
  pushMessage: (data: IMessage) => void;
};

const ChatInput: React.FC<IChatInput> = (props) => {
  const { channelId, userActive, pushMessage } = props;

  const [text, setText] = useState('');

  const [addPost, postResult] = useMutation(PostMessage);

  const formHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!postResult.loading) {
      const formText: string = event.target.value;
      setText(formText);
    }
  };

  const handleNewMessage = () => {
    const data: IPostMessage = postResult?.data?.postMessage;
    pushMessage({
      messageId: data?.messageId || '',
      userId: data?.userId || userActive,
      username: data?.userId || userActive,
      text: data?.text || text,
      datetime: data?.datetime || new Date().toISOString(),
      profileUrl: data?.userId ? `${data?.userId}.png` : `${userActive}.png`,
      sendStatus: postResult.error ? 'fail' : 'success',
    });
    setText('');
    setToScrollChat('down');
  };

  useEffect(() => {
    if (postResult.data || postResult.error) {
      handleNewMessage();
    }
  }, [postResult.data, postResult.error]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text) {
      addPost({
        variables: { channelId, text, userId: userActive },
      });
    }
  };

  return (
    <div className="input-box">
      <form id="form-send-message" onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Type your message here..."
          onChange={formHandler}
          value={text}
        ></textarea>
        <button
          form="form-send-message"
          type="submit"
          className="btn btn-send-message btn-info"
          disabled={!text}
        >
          Send Message ↗️
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
