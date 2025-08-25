/**
 * Language Popup Component for EmamAi Application
 * 
 * This component handles language selection dropdown with click-outside detection,
 * smooth animations, and accessibility features.
 */

import React, { useRef, useEffect } from 'react';
import { Language } from '../../types';

interface LanguagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (language: string) => void;
  selectedLanguage: string;
}

/**
 * Language Popup Component - Handles language selection dropdown
 * Features: Click-outside detection, smooth animations, accessibility
 */
export const LanguagePopup: React.FC<LanguagePopupProps> = ({ isOpen, onClose, onSelect, selectedLanguage }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        // Don't close if clicking on the language button itself
        const languageButton = document.querySelector('.language-button');
        if (languageButton && languageButton.contains(target)) {
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Enhanced language list with proper names and codes
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
  ];

  return (
    <div className="language-popup-overlay">
      <div className="language-popup-container" ref={popupRef}>
        <ul className="language-list">
          {languages.map((lang, index) => (
            <React.Fragment key={lang.code}>
              <li className="language-item" onClick={() => onSelect(lang.name)}>
                <span className="language-name">{lang.name}</span>
                {selectedLanguage === lang.name && (
                  <svg className="tick-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </li>
              {index < languages.length - 1 && <hr className="separator" />}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};
