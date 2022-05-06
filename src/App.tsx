import { useState } from 'react';
import { ChannelTitle, ChatBox, SelectChannel, SelectUser } from './components';
import {
  AppContext,
  appContextValue,
  IAppContextValue,
} from './context.js/AppContext';
import './styles/app.scss';

const initialAppContextState: IAppContextValue = {
  ...appContextValue,
  userSelect: 'Joyse',
  channelSelect: '1',
};

function App() {
  // Context api setup
  const [defaultAppContext, setDefaultAppContext] = useState(
    initialAppContextState
  );

  const setUserSelect = (value: string) => {
    setDefaultAppContext({ ...defaultAppContext, userSelect: value });
  };

  const setChannelSelect = (value: string) => {
    setDefaultAppContext({ ...defaultAppContext, channelSelect: value });
  };

  // Pass data and set function to child component
  const appContext = {
    ...defaultAppContext,
    setUserSelect,
    setChannelSelect,
  };

  // Necessary variables
  const usersData = appContext?.users || [];
  const channelsData = appContext?.channels || [];
  const getRoom = appContext.channels?.find(
    (value) => value.id === appContext.channelSelect
  );

  return (
    <AppContext.Provider value={appContext}>
      <div className="app">
        <div className="chat-container">
          <div className="left-side">
            <SelectUser data={usersData} setSelect={setUserSelect} />
            <SelectChannel
              roomActive={defaultAppContext?.channelSelect}
              data={channelsData}
              setSelect={setChannelSelect}
            />
          </div>
          <div className="right-side">
            <ChannelTitle title={getRoom?.value || ''} />
            <ChatBox channelId={getRoom?.id || ''} />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
