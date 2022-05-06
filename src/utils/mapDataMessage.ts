import { IMessage } from '../context/AppMessage';
import { IFetchLatestMessages } from '../query/FetchLatestMessages';

const mapDataMessage = (
  data: Array<IFetchLatestMessages>,
  isReverse: Boolean = true
) => {
  let dataJson: Array<IMessage> = [];
  let reverseData = [...data];
  if (isReverse) reverseData = reverseData.reverse();
  reverseData.forEach((value) => {
    dataJson.push({
      messageId: value.messageId,
      userId: value.userId,
      text: value.text,
      username: value.userId,
      datetime: value.datetime,
      profileUrl: value.userId + '.png',
      sendStatus: 'success',
    });
  });
  return dataJson;
};

export default mapDataMessage;
