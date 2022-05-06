import { IMessage } from '../../context/AppMessage';

type IChatMessage = {
  data: IMessage;
  userActive: string;
};

const ChatMessage: React.FC<IChatMessage> = (props) => {
  const { data, userActive } = props;

  const isCurrentUser = userActive === data.userId;

  const sideMessageClassName = isCurrentUser ? 'chat-right' : 'chat-left';

  const messageDate = new Date(data.datetime);

  const dateFormat = `${messageDate.getHours()}:${String(
    messageDate.getMinutes()
  ).padStart(2, '0')}`;

  let sortElement = ['avatar', 'text', 'hour'];

  if (isCurrentUser) {
    sortElement = ['hour', 'text', 'avatar'];
  }

  let splitComponents: any = [];

  sortElement.forEach((value) => {
    if (value === 'avatar') {
      splitComponents.push(
        <div className="chat-avatar">
          <img src={`./${data.profileUrl}`} alt="User" />
          <div className="chat-name">{data.username}</div>
        </div>
      );
    } else if (value === 'text') {
      splitComponents.push(
        <div
          className="chat-text"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      );
    } else if (value === 'hour') {
      splitComponents.push(
        <div className="chat-hour">
          <span>{dateFormat}</span>
          {isCurrentUser && data.sendStatus === 'success' && (
            <span className="icon-status">✅</span>
          )}
          {isCurrentUser && data.sendStatus === 'fail' && (
            <span className="icon-status">❗</span>
          )}
        </div>
      );
    }
  });

  const keyMessageId = data.messageId + '-' + Number(new Date());

  return (
    <li
      key={data.messageId + Number(new Date())}
      message-key={keyMessageId}
      className={sideMessageClassName}
    >
      {splitComponents}
    </li>
  );
};

export default ChatMessage;
