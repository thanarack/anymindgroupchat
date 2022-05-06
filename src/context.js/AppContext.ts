import React from 'react';

export type IUsers = {
  id: string;
  username: string;
};

export type IChannel = {
  id: string;
  roomName: string;
  value: string;
};

export type IAppContextValue = {
  users?: Array<IUsers>;
  channels?: Array<IChannel>;
  userSelect: string;
  channelSelect: string;
  setUserSelect?: Function;
  setChannelSelect?: Function;
};

export const appContextValue: IAppContextValue = {
  users: [
    { id: 'Joyse', username: 'Joyse' },
    { id: 'Sam', username: 'Sam' },
    { id: 'Russell', username: 'Russell' },
  ],
  channels: [
    { id: '1', roomName: 'General Channel', value: 'General' },
    { id: '2', roomName: 'Technology Channel', value: 'Technology' },
    { id: '3', roomName: 'LGTM Channel', value: 'LGTM' },
  ],
  userSelect: '',
  channelSelect: '',
  setUserSelect: () => {},
  setChannelSelect: () => {},
};

export const AppContext = React.createContext(appContextValue);
