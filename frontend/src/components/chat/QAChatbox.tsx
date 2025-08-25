/**
 * QA Chatbox Component for EmamAi Application
 * 
 * This component provides a fixed input chatbox with Material Design styling
 * for Q&A functionality with dynamic placeholders based on context.
 */

import React, { useState, useEffect } from 'react';
import { PamphletCard } from '../../types';

interface QAChatboxProps {
  selectedPamphlet?: PamphletCard | null;
  initialMessage?: string;
  onSendMessage: (message: string, pamphletContext?: string) => void;
}

/**
 * QA Chatbox Component - Fixed input with Material Design
 */
export const QAChatbox: React.FC<QAChatboxProps> = ({ selectedPamphlet, initialMessage, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  // Set initial message when provided
  useEffect(() => {
    if (initialMessage) {
      setInputValue(initialMessage);
    }
  }, [initialMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const pamphletContext = selectedPamphlet?.title;
      onSendMessage(inputValue.trim(), pamphletContext);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Dynamic placeholder based on context
  const getPlaceholder = () => {
    if (selectedPamphlet) {
      return `Ask about "${selectedPamphlet.title}"...`;
    }
    return "Ask about Islamic practices...";
  };

  return (
    <div className="qa-chatbox-fixed">
      <input 
        type="text" 
        placeholder={getPlaceholder()}
        className="qa-chat-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button 
        className={`qa-send-button ${inputValue.trim() ? 'filled' : ''}`}
        onClick={handleSend}
      >
        <img 
          src="/send.png" 
          alt="Send" 
          width="18" 
          height="18"
          style={{ filter: inputValue.trim() ? 'brightness(0) invert(1)' : 'none' }}
        />
      </button>
    </div>
  );
};
