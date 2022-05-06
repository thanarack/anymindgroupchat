import { useLazyQuery } from '@apollo/client';
import { IMessage } from '../context.js/AppMessage';
import FetchMoreMessages, {
  IFetchMoreMessages,
} from '../query/FetchMoreMessages';
import mapDataMessage from '../utils/mapDataMessage';

type ILazyFetchMoreMessagesResponse = {
  fetchMoreMessages: Array<IFetchMoreMessages>;
};

const useLazyFetchMoreMessages = () => {
  const [fetchData, result] = useLazyQuery(FetchMoreMessages);

  let dataJson: Array<IMessage> = [];

  const data: ILazyFetchMoreMessagesResponse = result.data;

  if (!result.error && !result.loading && data?.fetchMoreMessages.length) {
    dataJson = mapDataMessage(data.fetchMoreMessages);
  }

  return { ...result, dataJson, fetchData };
};

export default useLazyFetchMoreMessages;
