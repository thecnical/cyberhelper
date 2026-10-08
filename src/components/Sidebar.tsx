import { useState } from 'react';
import { useStore } from '../store';
import './Sidebar.css';

const Sidebar = () => {
  const {
    conversations,
    currentConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    toggleSidebar,
    toggleSettings,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = () => {
    createConversation();
  };

  // const formatDate = (timestamp: number) => {
  //   const date = new Date(timestamp);
  //   const now = new Date();
  //   const diff = now.getTime() - date.getTime();
  //   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //
  //   if (days === 0) return 'Today';
  //   if (days === 1) return 'Yesterday';
  //   if (days < 7) return `${days} days ago`;
  //   if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  //   return date.toLocaleDateString();
  // };

  const groupConversationsByDate = () => {
    const groups: { [key: string]: typeof conversations } = {
      Today: [],
      Yesterday: [],
      'Previous 7 Days': [],
      'Previous 30 Days': [],
      Older: [],
    };

    filteredConversations.forEach((conv) => {
      const date = new Date(conv.updatedAt);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days === 0) groups.Today.push(conv);
      else if (days === 1) groups.Yesterday.push(conv);
      else if (days < 7) groups['Previous 7 Days'].push(conv);
      else if (days < 30) groups['Previous 30 Days'].push(conv);
      else groups.Older.push(conv);
    });

    return groups;
  };

  const groupedConversations = groupConversationsByDate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={handleNewChat}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>New chat</span>
        </button>
        <button className="sidebar-toggle" onClick={toggleSidebar} title="Close sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="sidebar-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="conversations-list">
        {Object.entries(groupedConversations).map(
          ([group, convs]) =>
            convs.length > 0 && (
              <div key={group} className="conversation-group">
                <div className="group-label">{group}</div>
                {convs.map((conv) => (
                  <div
                    key={conv.id}
                    className={`conversation-item ${
                      currentConversation?.id === conv.id ? 'active' : ''
                    }`}
                    onClick={() => selectConversation(conv.id)}
                  >
                    <div className="conversation-content">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="conversation-title">{conv.title}</span>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this conversation?')) {
                          deleteConversation(conv.id);
                        }
                      }}
                      title="Delete conversation"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )
        )}

        {filteredConversations.length === 0 && (
          <div className="no-conversations">
            <p>{searchQuery ? 'No conversations found' : 'No conversations yet'}</p>
            <p className="subtitle">Start a new chat to begin</p>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button className="settings-btn" onClick={toggleSettings}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
            <path
              d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;