/**
 * Pamphlet View Component for EmamAi Application
 * 
 * This component displays detailed view of a single pamphlet with chat interface
 * and suggestion handling for user interaction.
 */

import React from 'react';
import { PamphletCard, ChatMessage } from '../../types';
import { ChatMessages } from '../chat/ChatMessages';

interface PamphletViewProps {
  pamphlet: PamphletCard;
  onBack: () => void;
  onSuggestionClick?: (suggestion: string) => void;
  messages: ChatMessage[];
  isLoading: boolean;
}

/**
 * Individual Pamphlet View Component - Displays detailed view of a single pamphlet with chat interface
 */
export const PamphletView: React.FC<PamphletViewProps> = ({ 
  pamphlet, 
  onBack, 
  onSuggestionClick, 
  messages, 
  isLoading 
}) => {
  const suggestions = [
    "Can you explain this topic in detail?",
    "What are the key points from this pamphlet?", 
    "How does this relate to Islamic teachings?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className="pamphlet-view-container">
      {/* Chat area for this pamphlet */}
      <div className="pamphlet-chat-area">
        {messages.length > 0 ? (
          <ChatMessages messages={messages} isLoading={isLoading} />
        ) : (
          <div className="chat-welcome-message">
            <div className="welcome-icon">
            </div>
            <h3>{pamphlet.title}</h3>
            <p>{pamphlet.description}</p>
            <div className="welcome-suggestions">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: 'pointer' }}
                >
                  "{suggestion}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
