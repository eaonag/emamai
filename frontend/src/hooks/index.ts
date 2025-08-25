/**
 * Custom Hooks for EmamAi Application
 * 
 * This file contains all custom React hooks for state management,
 * side effects, and reusable logic throughout the application.
 */

import { useState, useEffect } from 'react';
import { ChatMessage, PamphletCard } from '../types';

/**
 * UI State Hook - Manages tooltip visibility and menu states
 */
export const useUIState = () => {
  const [isLangTooltipVisible, setLangTooltipVisible] = useState(false);
  const [isDrawerTooltipVisible, setDrawerTooltipVisible] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleMenuToggle = (chatId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering chat selection
    setOpenMenuId(openMenuId === chatId ? null : chatId);
  };

  return {
    isLangTooltipVisible,
    setLangTooltipVisible,
    isDrawerTooltipVisible,
    setDrawerTooltipVisible,
    openMenuId,
    setOpenMenuId,
    handleMenuToggle,
  };
};

/**
 * Chat Hook - Manages chat messages and API integration
 */
export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addUserMessage = (text: string, pamphletContext?: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
      pamphletContext
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate API call - replace with actual Cohere AI integration
    handleAIResponse(text, pamphletContext);
  };

  const handleAIResponse = async (userText: string, pamphletContext?: string) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual Cohere AI Command R API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      let responseText = "I understand your question. ";
      if (pamphletContext) {
        responseText += `Regarding "${pamphletContext}", here's what I can help you with: `;
      }
      responseText += "This is a placeholder response. The Cohere AI integration will provide detailed Islamic guidance here.";
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        pamphletContext
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    addUserMessage,
    clearMessages,
  };
};

/**
 * Navigation Hook - Manages drawer state and bottom navigation
 */
export const useNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBottomNav, setActiveBottomNav] = useState('quran');
  const [selectedPamphlet, setSelectedPamphlet] = useState<PamphletCard | null>(null);
  const [chatInitialMessage, setChatInitialMessage] = useState('');

  const toggleDrawer = () => {
    setTimeout(() => {
      setIsDrawerOpen(!isDrawerOpen);
    }, 100);
  };

  const handleBottomNavClick = (section: string) => {
    setActiveBottomNav(section);
    setSelectedPamphlet(null); // Clear pamphlet view when navigating to other sections
    setChatInitialMessage(''); // Clear initial message when navigating
    // Here you would typically load the selected section content
    // For now, we'll just update the visual state
  };

  const openPamphletView = (pamphlet: PamphletCard) => {
    setTimeout(() => {
      setSelectedPamphlet(pamphlet);
      setChatInitialMessage(''); // Clear any previous message
    }, 200);
  };

  const closePamphletView = () => {
    setTimeout(() => {
      setSelectedPamphlet(null);
      setChatInitialMessage(''); // Clear message when closing
    }, 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatInitialMessage(suggestion);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    activeBottomNav,
    setActiveBottomNav,
    selectedPamphlet,
    chatInitialMessage,
    toggleDrawer,
    handleBottomNavClick,
    openPamphletView,
    closePamphletView,
    handleSuggestionClick,
  };
};

/**
 * Language Hook - Manages language selection and popup state
 */
export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsPopupOpen(false);
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    isPopupOpen,
    setIsPopupOpen,
    togglePopup,
    handleSelectLanguage,
  };
};

/**
 * Drawer Effects Hook - Handles side effects for drawer behavior
 */
export const useDrawerEffects = (
  isDrawerOpen: boolean,
  openMenuId: number | null,
  editingChatId: number | null,
  setOpenMenuId: (id: number | null) => void,
  setEditingChatId: (id: number | null) => void,
  setEditingChatName: (name: string) => void,
  setDrawerTooltipVisible: (visible: boolean) => void
) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add('drawer-open');
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      
      // Prevent touch scrolling on mobile
      const preventDefault = (e: TouchEvent) => {
        if (e.target && !(e.target as Element).closest('.drawer-history-content')) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('touchmove', preventDefault, { passive: false });
      
      return () => {
        document.removeEventListener('touchmove', preventDefault);
      };
    } else {
      document.body.classList.remove('drawer-open');
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('drawer-open');
      document.body.style.top = '';
    };
  }, [isDrawerOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
      // Cancel inline editing when clicking outside
      if (editingChatId !== null) {
        setEditingChatId(null);
        setEditingChatName('');
      }
    };

    if (openMenuId !== null || editingChatId !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId, editingChatId, setOpenMenuId, setEditingChatId, setEditingChatName]);

  // Auto-hide drawer tooltip when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      setDrawerTooltipVisible(false);
    }
  }, [isDrawerOpen, setDrawerTooltipVisible]);
};
