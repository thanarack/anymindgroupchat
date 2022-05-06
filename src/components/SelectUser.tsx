import { IUsers } from '../context.js/AppContext';

type ISelectChannel = {
  data: Array<IUsers>;
  setSelect: Function;
};

const SelectUser: React.FC<ISelectChannel> = (props) => {
  const { data, setSelect } = props;

  const selectHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
  };

  return (
    <div className="user-select">
      <label>1. Choose your user</label>
      <select className="form-control" onChange={selectHandle}>
        {data.map((value, id) => (
          <option key={id} value={value.id}>
            {value.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUser;
