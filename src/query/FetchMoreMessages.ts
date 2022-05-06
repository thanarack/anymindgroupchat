import { gql } from '@apollo/client';

export type IFetchMoreMessages = {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
};

const FetchMoreMessages = gql`
  query FetchMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export default FetchMoreMessages;
