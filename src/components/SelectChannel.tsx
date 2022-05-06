import { IChannel } from '../context/AppContext';

type ISelectChannel = {
  data: Array<IChannel>;
  roomActive: number | string;
  setSelect: Function;
};

const SelectChannel: React.FC<ISelectChannel> = (props) => {
  const { data, roomActive, setSelect } = props;

  return (
    <div className="channel-select">
      <label>2. Choose your Channel</label>
      <ul className="users">
        {data.map((value, id) => (
          <li
            key={id}
            className={`channel${
              roomActive === value.id ? ' active-user' : null
            }`}
            onClick={() => setSelect(value.id)}
          >
            <p className="name-time">
              <span className="name">{value.roomName}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectChannel;
