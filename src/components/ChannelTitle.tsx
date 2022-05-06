type IChannelTitle = {
  title: string;
};

const ChannelTitle: React.FC<IChannelTitle> = (props) => {
  const { title } = props;

  return <div className="channel-title">{title}</div>;
};

export default ChannelTitle;
