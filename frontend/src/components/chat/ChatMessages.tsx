/**
 * Chat Messages Container Component for EmamAi Application
 * 
 * This component displays the complete conversation history with auto-scroll
 * functionality and loading indicators.
 */

import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

/**
 * Chat Messages Component - Displays conversation history
 */
export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return null; // Show welcome message instead
  }

  return (
    <div className="chat-messages-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
        >
          <div className="message-content">
            {message.text}
          </div>
          <div className="message-timestamp">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="message ai-message loading-message">
          <div className="message-content">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
