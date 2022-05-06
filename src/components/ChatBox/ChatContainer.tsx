import { IMessage } from '../../context/AppMessage';
import ChatMessage from './ChatMessage';

type IChatContainer = {
  data: Array<IMessage>;
  userActive: string;
};

const ChatContainer: React.FC<IChatContainer> = (props) => {
  const { data, userActive } = props;

  return (
    <div id="message-box" className="message-box">
      <ul id="chat-container" className="chat-container">
        {data.map((value, key) => (
          <ChatMessage key={key} data={value} userActive={userActive} />
        ))}
      </ul>
    </div>
  );
};

export default ChatContainer;
