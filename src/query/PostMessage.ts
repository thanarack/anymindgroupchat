import { gql } from '@apollo/client';

export type IPostMessage = {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
};

const PostMessage = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export default PostMessage;
