import React from 'react';

export type IMessage = {
  messageId: string,
  userId: string;
  username: string;
  text: string;
  datetime: string;
  profileUrl: string;
  sendStatus: string; // success, fail, sending
};

export type IAppMessage = {
  messages: Array<IMessage>;
};

export const appMessage: IAppMessage = {
  messages: [],
};

export const AppMessage = React.createContext(appMessage);
