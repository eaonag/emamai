/**
 * Bottom Navigation Component for EmamAi Application
 * 
 * This component renders the fixed bottom navigation bar with three main sections:
 * Quran, Islamic Q&A, and Pamphlets with integrated chat interface.
 */

import React from 'react';
import { QAChatbox } from '../chat/QAChatbox';
import { PamphletCard } from '../../types';

interface BottomNavigationProps {
  activeBottomNav: string;
  handleBottomNavClick: (section: string) => void;
  selectedPamphlet?: PamphletCard | null;
  chatInitialMessage?: string;
  onSendMessage: (message: string, pamphletContext?: string) => void;
}

/**
 * Bottom Navigation Component - Fixed bottom navigation bar with three sections and integrated chat
 */
export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeBottomNav,
  handleBottomNavClick,
  selectedPamphlet,
  chatInitialMessage,
  onSendMessage
}) => {
  return (
    <nav className="bottom-nav">
      {/* Integrated Chat Box */}
      <div className="bottom-nav-chatbox">
        <QAChatbox 
          selectedPamphlet={selectedPamphlet}
          initialMessage={chatInitialMessage}
          onSendMessage={onSendMessage}
        />
      </div>
      
      {/* Navigation Tabs */}
      <div className="bottom-nav-tabs">
        {/* Quran section */}
        <div 
          className={`bottom-nav-item ${activeBottomNav === 'quran' ? 'active' : ''}`}
          onClick={() => handleBottomNavClick('quran')}
        >
          <div className="bottom-nav-item-content">
            <img src="/quran.png" className="bottom-nav-icon" alt="quran" />
            <span className="bottom-nav-label">Quran</span>
          </div>
        </div>
        
        {/* Q&A section */}
        <div 
          className={`bottom-nav-item ${activeBottomNav === 'qa' ? 'active' : ''}`}
          onClick={() => handleBottomNavClick('qa')}
        >
          <div className="bottom-nav-item-content">
            <img src="/qa.png" className="bottom-nav-icon" alt="qa" />
            <span className="bottom-nav-label">Islamic Q&A</span>
          </div>
        </div>
        
        {/* Research/Pamphlets section */}
        <div 
          className={`bottom-nav-item ${activeBottomNav === 'research' ? 'active' : ''}`}
          onClick={() => handleBottomNavClick('research')}
        >
          <div className="bottom-nav-item-content">
            <img src="/paper.png" className="bottom-nav-icon" alt="pamphlets" />
            <span className="bottom-nav-label">Pamphlets</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
