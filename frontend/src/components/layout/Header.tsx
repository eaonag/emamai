/**
 * Header Component for EmamAi Application
 * 
 * This component renders the top navigation bar with drawer toggle, logo,
 * and language selector. It handles different states for pamphlet view.
 */

import React from 'react';
import { PamphletCard } from '../../types';
import { LanguagePopup } from '../ui/LanguagePopup';

interface HeaderProps {
  isDrawerTooltipVisible: boolean;
  setDrawerTooltipVisible: (visible: boolean) => void;
  toggleDrawer: () => void;
  isLangTooltipVisible: boolean;
  setLangTooltipVisible: (visible: boolean) => void;
  selectedLanguage: string;
  isPopupOpen: boolean;
  togglePopup: () => void;
  handleSelectLanguage: (language: string) => void;
  setIsPopupOpen: (open: boolean) => void;
  activeBottomNav: string;
  selectedPamphlet?: PamphletCard | null;
  onPamphletBack?: () => void;
}

/**
 * Header Component - Top navigation bar with drawer toggle, logo, and language selector
 */
export const Header: React.FC<HeaderProps> = ({
  isDrawerTooltipVisible,
  setDrawerTooltipVisible,
  toggleDrawer,
  isLangTooltipVisible,
  setLangTooltipVisible,
  selectedLanguage,
  isPopupOpen,
  togglePopup,
  handleSelectLanguage,
  setIsPopupOpen,
  activeBottomNav,
  selectedPamphlet,
  onPamphletBack
}) => {
  return (
    <header className="App-header">
      <div className="header-top">
        {/* Conditional header content based on whether pamphlet is selected */}
        {selectedPamphlet ? (
          // Pamphlet view header - Back button and pamphlet title
          <>
            <div className="header-left">
              <div 
                className="drawer-container"
                onClick={onPamphletBack}
                style={{ cursor: 'pointer' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5m7-7l-7 7 7 7"/>
                </svg>
              </div>
              <div className="pamphlet-header-title">
                {selectedPamphlet.paperNumber && (
                  <div className="pamphlet-paper-number-only">{selectedPamphlet.paperNumber}</div>
                )}
              </div>
            </div>
            <div className="header-right">
              {/* Language selector remains available */}
              <div 
                className="language-selector"
                onMouseEnter={() => setLangTooltipVisible(true)}
                onMouseLeave={() => setLangTooltipVisible(false)}
                onMouseDown={() => setLangTooltipVisible(false)}
              >
                <button 
                  className={`language-button ${isPopupOpen ? 'popup-open' : ''}`}
                  onClick={togglePopup}
                >
                  {selectedLanguage}
                  <svg 
                    className={`dropdown-svg-arrow ${isPopupOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isLangTooltipVisible && <div className="tooltip">Select language</div>}
                <LanguagePopup
                  isOpen={isPopupOpen}
                  onClose={() => setIsPopupOpen(false)}
                  onSelect={handleSelectLanguage}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            </div>
          </>
        ) : (
          // Normal header - Drawer toggle, logo, and language selector
          <>
            <div className="header-left">
              <div 
                className="drawer-container"
                onMouseEnter={() => setDrawerTooltipVisible(true)}
                onMouseLeave={() => setDrawerTooltipVisible(false)}
                onMouseDown={() => setDrawerTooltipVisible(false)}
                onClick={toggleDrawer}
              >
                <img src="/drawer.png" className="drawer-icon" alt="drawer" />
                {isDrawerTooltipVisible && <div className="tooltip" style={{bottom: '-35px'}}>Main menu</div>}
              </div>
              <div className="logo-section">
                <img src="/logo.jpg" className="logo" alt="EmamAi Logo" />
                <span className="logo-text">EmamAi</span>
              </div>
            </div>

            {/* Right side - Language selector */}
            <div 
              className="language-selector"
              onMouseEnter={() => setLangTooltipVisible(true)}
              onMouseLeave={() => setLangTooltipVisible(false)}
              onMouseDown={() => setLangTooltipVisible(false)}
            >
              <button 
                className={`language-button ${isPopupOpen ? 'popup-open' : ''}`}
                onClick={togglePopup}
              >
                {selectedLanguage}
                <svg 
                  className={`dropdown-svg-arrow ${isPopupOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isLangTooltipVisible && <div className="tooltip">Select language</div>}
              <LanguagePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSelect={handleSelectLanguage}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
