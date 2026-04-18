import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const PhysicalMessage = ({ text, role }) => {
  const isUser = role.toLowerCase() === 'user';

  return (
    <motion.div
      className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="message-bubble">
        {isUser ? <p>{text}</p> : <ReactMarkdown>{text}</ReactMarkdown>}
      </div>
    </motion.div>
  );
};

export default PhysicalMessage;