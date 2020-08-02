import React from 'react';

import { ConversationProvider } from './hooks/conversation';
import Chat from './components/Chat';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <ConversationProvider>
        <Chat />
      </ConversationProvider>
    </div>
  );
};

export default App;
