import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import '../css/ChatBot.css';
import PhysicalMessage from './PhysicalMessage';

const suggestions = [
  "Tell me about yourself",
  "Your Daily Brief",
  "Smart Workday Assistant",
  "New Project"
];

function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const fetchChats = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('https://chatbot-backend-snowy-one.vercel.app/api/chats', {
        headers: { 'x-auth-token': token }
      });
      const data = await res.json();
      if (Array.isArray(data)) setChats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadChat = async (chatId) => {
    const token = localStorage.getItem('token');
    setActiveChatId(chatId);
    setShowSuggestions(false);
    setMessages([]);
    try {
      const res = await fetch(`https://chatbot-backend-snowy-one.vercel.app/api/chats/${chatId}/messages`, {
        headers: { 'x-auth-token': token }
      });
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setShowSuggestions(true);
  };

  const sendMessage = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowSuggestions(false);
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://chatbot-backend-snowy-one.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ message: messageText, chatId: activeChatId }),
      });
      const data = await response.json();

      if (!activeChatId && data.chatId) {
        setActiveChatId(data.chatId);
        fetchChats();
      }

      const botMsg = { role: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`layout-container ${theme}-mode`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">Chat.X<span className="logo-accent">®</span></div>
          <button className="new-chat-btn" onClick={startNewChat}>+ New Chat</button>
        </div>
        <div className="sidebar-chats">
          {chats.map(chat => (
            <button
              key={chat._id}
              className={`sidebar-chat-item ${activeChatId === chat._id ? 'active' : ''}`}
              onClick={() => loadChat(chat._id)}
            >
              {chat.title}
            </button>
          ))}
        </div>
        <div className="sidebar-footer">
          {/* Logout moved to top menu */}
        </div>
      </aside>

      {/* Main chat area */}
      <div className="cinematic-chat flex-1">
        <header className="chat-header">
          <div className="header-left">
            <button className="icon-btn mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
            <div className="status">AI Agent • Active</div>
          </div>
          <div className="header-right" style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="icon-btn" onClick={() => setShowMenu(!showMenu)}>
              ⋯
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="menu-overlay" 
                  onClick={() => setShowMenu(false)} 
                  style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                />
                <div className="dropdown-menu" style={{ zIndex: 100 }}>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="chat-window" ref={scrollRef}>
          <div className="messages-container">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <PhysicalMessage key={idx} text={msg.text} role={msg.role} />
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                className="chat-message bot-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="message-bubble chat-typing mock-message bot">
                  <span>●</span><span>●</span><span>●</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {showSuggestions && messages.length === 0 && (
          <div className="suggestions-panel">
            <div className="suggestions-grid">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="input-area">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
            >
              ⌘
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;