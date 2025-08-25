/**
 * Chat Input Component for EmamAi Application
 * 
 * This component provides an advanced chat input with auto-expanding textarea,
 * keyboard shortcuts, send button states, and mobile optimization.
 */

import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

/**
 * Chat Input Component - Advanced chat input with auto-expanding textarea
 * Features: Auto-resize, keyboard shortcuts, send button states, mobile optimization
 */
export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Type your message here...",
  disabled = false,
  maxLength = 2000
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  const hasText = message.trim().length > 0;
  const isNearLimit = message.length > maxLength * 0.9;

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="chat-input"
          disabled={disabled}
          rows={1}
          style={{
            minHeight: '44px',
            maxHeight: '120px',
            resize: 'none',
            overflow: 'auto'
          }}
        />
        
        {/* Character count indicator */}
        {isNearLimit && (
          <div className="character-count" style={{
            position: 'absolute',
            top: '-20px',
            right: '50px',
            fontSize: '12px',
            color: message.length >= maxLength ? '#ef4444' : '#666',
          }}>
            {message.length}/{maxLength}
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={!hasText || disabled}
          className={`chat-send-btn ${hasText ? 'filled' : 'outlined'}`}
          title={hasText ? 'Send message' : 'Type a message to send'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
