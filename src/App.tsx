import { useEffect } from 'react';
import { useStore } from './store';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Settings from './components/Settings';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';

function App() {
  const { loadFromStorage, currentConversation, sidebarOpen, settingsOpen } = useStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div className="app">
      {sidebarOpen && <Sidebar />}
      <div className="main-content">
        {currentConversation ? <ChatArea /> : <WelcomeScreen />}
      </div>
      {settingsOpen && <Settings />}
    </div>
  );
}

export default App;