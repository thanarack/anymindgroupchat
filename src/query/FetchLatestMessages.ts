import { gql } from '@apollo/client';

export type IFetchLatestMessages = {
	messageId: string
	text: string
	datetime: string
	userId: string
}

const FetchLatestMessages = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export default FetchLatestMessages;
