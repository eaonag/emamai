/**
 * Chat Message Component for EmamAi Application
 * 
 * This component displays individual chat messages with timestamp and typing indicators.
 * Supports both user and AI messages with different styling.
 */

import React from 'react';
import { ChatMessage } from '../../types';
import { formatChatTime } from '../../utils';

interface ChatMessageComponentProps {
  message: ChatMessage;
  isOwn?: boolean;
}

/**
 * Individual Chat Message Component - Displays a single chat message with rich content support
 */
export const ChatMessageComponent: React.FC<ChatMessageComponentProps> = ({ message, isOwn = false }) => {
  return (
    <div className={`chat-message ${isOwn ? 'user-message' : 'ai-message'}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <div className="message-timestamp">
          {formatChatTime(message.timestamp)}
        </div>
      </div>
      {message.isTyping && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};
