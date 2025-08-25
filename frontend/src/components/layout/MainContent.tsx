/**
 * Main Content Component for EmamAi Application
 * 
 * This component renders the central content area that changes based on active navigation.
 * It handles different content types: Quran, Q&A, Pamphlets, and individual pamphlet views.
 */

import React from 'react';
import { PamphletCard, ChatMessage } from '../../types';
import { ChatMessages } from '../chat/ChatMessages';
import { QAChatbox } from '../chat/QAChatbox';
import { PamphletCards } from '../pamphlets/PamphletCards';
import { PamphletView } from '../pamphlets/PamphletView';

interface MainContentProps {
  activeBottomNav: string;
  selectedPamphlet: PamphletCard | null;
  chatInitialMessage: string;
  onPamphletChat: (pamphlet: PamphletCard) => void;
  onPamphletBack: () => void;
  onSuggestionClick: (suggestion: string) => void;
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
    addUserMessage: (text: string, pamphletContext?: string) => void;
    clearMessages: () => void;
  };
}

/**
 * Main Content Component - Central content area that changes based on active navigation
 * Features: Dynamic content switching, chat interface, pamphlet display
 */
export const MainContent: React.FC<MainContentProps> = ({ 
  activeBottomNav, 
  selectedPamphlet, 
  chatInitialMessage,
  onPamphletChat, 
  onPamphletBack,
  onSuggestionClick,
  chat
}) => {

  const renderContent = () => {
    switch (activeBottomNav) {
      case 'quran':
        return (
          <div className="quran-messages-area">
            {chat.messages.length > 0 ? (
              <ChatMessages messages={chat.messages} isLoading={chat.isLoading} />
            ) : (
              <div className="chat-welcome-message">
                <div className="welcome-icon">
                </div>
                <h3>Welcome to Quran Chat</h3>
                <p>Ask questions about verses, interpretations, or seek guidance from the Holy Quran. I'm here to help you understand Islamic teachings with authentic references.</p>
                <div className="welcome-suggestions">
                  <div className="suggestion-item">"What does Surah Al-Fatiha mean?"</div>
                  <div className="suggestion-item">"Explain verse 2:255 (Ayat ul-Kursi)"</div>
                  <div className="suggestion-item">"What are the benefits of reciting Quran?"</div>
                </div>
              </div>
            )}
          </div>
        );

      case 'qa':
        return (
          <div className="qa-messages-area">
            {chat.messages.length > 0 ? (
              <ChatMessages messages={chat.messages} isLoading={chat.isLoading} />
            ) : (
              <div className="chat-welcome-message">
                <div className="welcome-icon">
                </div>
                <h3>Islamic Q&A Assistant</h3>
                <p>Ask questions about Islamic practices, beliefs, history, or any topic related to Islam. Get authentic answers based on Quran and Hadith.</p>
                <div className="welcome-suggestions">
                  <div className="suggestion-item">"What are the 5 pillars of Islam?"</div>
                  <div className="suggestion-item">"How to perform Wudu correctly?"</div>
                  <div className="suggestion-item">"What is the significance of Ramadan?"</div>
                </div>
              </div>
            )}
          </div>
        );

      case 'research':
        // Show individual pamphlet view if one is selected, otherwise show the list
        if (selectedPamphlet) {
          return (
            <PamphletView 
              pamphlet={selectedPamphlet} 
              onBack={onPamphletBack}
              onSuggestionClick={onSuggestionClick}
              messages={chat.messages}
              isLoading={chat.isLoading}
            />
          );
        }
        return (
          <div className="pamphlets-messages-area">
            {chat.messages.length > 0 ? (
              <ChatMessages messages={chat.messages} isLoading={chat.isLoading} />
            ) : (
              <div className="pamphlets-welcome-container">
                <PamphletCards />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="content-container">
            <div className="section-header">
              <h2>Welcome to EmamAi</h2>
              <p>Your Islamic AI companion for authentic guidance and knowledge</p>
            </div>
            <div className="section-content">
              <p>Select a section from the bottom navigation to begin:</p>
              <ul>
                <li><strong>Quran:</strong> Read and explore the Holy Quran</li>
                <li><strong>Islamic Q&A:</strong> Ask questions about Islamic practices</li>
                <li><strong>Pamphlets:</strong> Browse educational Islamic resources</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};
