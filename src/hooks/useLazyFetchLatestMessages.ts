import { useLazyQuery } from '@apollo/client';
import { IMessage } from '../context.js/AppMessage';
import { FetchLatestMessages } from '../query';
import { IFetchLatestMessages } from '../query/FetchLatestMessages';
import mapDataMessage from '../utils/mapDataMessage';

type IFetchLatestMessagesResponse = {
  fetchLatestMessages: Array<IFetchLatestMessages>;
};

const useLazyFetchLatestMessages = () => {
  const [fetchData, result] = useLazyQuery(FetchLatestMessages);

  let dataJson: Array<IMessage> = [];

  const data: IFetchLatestMessagesResponse = result.data;

  if (!result.error && !result.loading && data?.fetchLatestMessages.length) {
    dataJson = mapDataMessage(data.fetchLatestMessages);
  }

  return { ...result, dataJson, fetchData };
};

export default useLazyFetchLatestMessages;
