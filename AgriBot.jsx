import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AgriBot.css';

const AgriBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AgriBot 🌱, your farming assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const predefinedResponses = {
    soil: [
      "🌱 Soil Health Tips:",
      "• Test your soil pH regularly (aim for 6.0-7.0)",
      "• Add organic matter like compost to improve fertility",
      "• Rotate crops to prevent soil depletion",
      "• Use cover crops to protect soil during off-season"
    ],
    water: [
      "💧 Irrigation Advice:",
      "• Water deeply but less frequently for stronger roots",
      "• Use drip irrigation to conserve water (up to 50% savings)",
      "• Water early morning or evening to reduce evaporation",
      "• Monitor soil moisture with sensors for precision"
    ],
    fertilizer: [
      "🌾 Fertilizer Suggestions:",
      "• Use NPK 10-10-10 for balanced growth",
      "• Apply organic fertilizers like manure for long-term benefits",
      "• Test soil before fertilizing to avoid over-application",
      "• Consider foliar feeding for quick nutrient uptake"
    ],
    crop: [
      "🌽 Best Crop Suggestions:",
      "• Tomatoes: High value, good for small farms",
      "• Leafy greens: Quick harvest, continuous production",
      "• Herbs: High profit margin, low water needs",
      "• Consider local climate and market demand"
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('soil')) {
      return predefinedResponses.soil;
    } else if (message.includes('water') || message.includes('irrigation')) {
      return predefinedResponses.water;
    } else if (message.includes('fertilizer') || message.includes('nutrient')) {
      return predefinedResponses.fertilizer;
    } else if (message.includes('crop') || message.includes('plant')) {
      return predefinedResponses.crop;
    } else {
      return ["I'm AgriBot 🌱, I can help with farming advice! Try asking about soil, water, fertilizer, or crop suggestions."];
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponses = getBotResponse(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: botResponses,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <motion.div
        className="agribot-icon"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="agribot-icon-inner">
          <span className="agribot-icon-emoji">🌱</span>
        </div>
      </motion.div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="agribot-backdrop"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Chat Window */}
            <motion.div
              className="agribot-chat"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="agribot-header">
                <div className="agribot-header-info">
                  <h3>🌱 AgriBot</h3>
                  <p>Ask anything about farming</p>
                </div>
                <button
                  className="agribot-close"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="agribot-messages">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`agribot-message ${message.sender}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Array.isArray(message.text) ? (
                      <div className="agribot-message-list">
                        {message.text.map((line, index) => (
                          <div key={index} className="agribot-message-line">
                            {line}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="agribot-message-text">
                        {message.text}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="agribot-input">
                <input
                  type="text"
                  placeholder="Ask about farming..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="agribot-send"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  📤
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgriBot;