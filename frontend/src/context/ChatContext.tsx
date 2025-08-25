/**
 * Chat Context Provider for EmamAi Application
 * 
 * This file manages all chat-related state including chat history, search,
 * editing operations, and deletion functionality using React Context.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatItem, ChatContextType } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * Custom hook to access the Chat Context
 * Throws an error if used outside of ChatProvider
 */
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
}

/**
 * Chat Provider Component
 * Provides chat state management to all child components
 */
export const ChatProvider: React.FC<ChatProviderProps> = ({ children, setOpenMenuId }) => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([
    { id: 1, title: 'Prayer times for today', time: '2 hours ago', pinned: false },
    { id: 2, title: 'What is the meaning of Surah Al-Fatiha?', time: 'Yesterday', pinned: false },
    { id: 3, title: 'How to perform Wudu correctly?', time: 'Yesterday', pinned: false },
    { id: 4, title: 'Islamic calendar events this month', time: '3 days ago', pinned: false },
    { id: 5, title: 'Qibla direction from my location', time: '1 week ago', pinned: false },
    { id: 6, title: '99 names of Allah with meanings', time: '1 week ago', pinned: false },
    { id: 7, title: 'Ramadan fasting guidelines', time: '2 weeks ago', pinned: false }
  ]);
  
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editingChatName, setEditingChatName] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingChatId, setDeletingChatId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Computed values
  const filteredChats = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Methods
  const handleChatHistoryClick = (chatId: number) => {
    setSelectedChatId(chatId);
    // Here you would typically load the selected chat conversation
    // For now, we'll just update the visual state
  };

  const handleNewChatClick = () => {
    setSelectedChatId(null);
    // Here you would typically start a new chat conversation
    // Clear the current chat and prepare for new input
  };

  const handleMenuAction = (action: string, chatId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    switch (action) {
      case 'pin':
        setChatHistory(prevHistory => 
          prevHistory.map(chat => 
            chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
          )
        );
        // Close the menu after pin/unpin action
        setOpenMenuId(null);
        break;
      case 'rename':
        const chatToRename = chatHistory.find(chat => chat.id === chatId);
        if (chatToRename) {
          setEditingChatId(chatId);
          setEditingChatName(chatToRename.title);
        }
        // Close the menu when entering rename mode
        setOpenMenuId(null);
        break;
      case 'delete':
        setDeletingChatId(chatId);
        setDeleteConfirmOpen(true);
        // Close the menu when opening delete dialog
        setOpenMenuId(null);
        break;
    }
  };

  const handleSaveRename = () => {
    if (editingChatId && editingChatName.trim()) {
      setChatHistory(prevHistory => 
        prevHistory.map(chat => 
          chat.id === editingChatId ? { ...chat, title: editingChatName.trim() } : chat
        )
      );
      setEditingChatId(null);
      setEditingChatName('');
    }
  };

  const handleCancelRename = () => {
    setEditingChatId(null);
    setEditingChatName('');
  };

  const handleConfirmDelete = () => {
    if (deletingChatId) {
      setChatHistory(prevHistory => 
        prevHistory.filter(chat => chat.id !== deletingChatId)
      );
      // Clear selection if deleted chat was selected
      if (selectedChatId === deletingChatId) {
        setSelectedChatId(null);
      }
      setDeleteConfirmOpen(false);
      setDeletingChatId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setDeletingChatId(null);
  };

  const value: ChatContextType = {
    // State
    chatHistory,
    selectedChatId,
    editingChatId,
    editingChatName,
    deleteConfirmOpen,
    deletingChatId,
    searchQuery,
    
    // Actions
    setChatHistory,
    setSelectedChatId,
    setEditingChatId,
    setEditingChatName,
    setDeleteConfirmOpen,
    setDeletingChatId,
    setSearchQuery,
    setOpenMenuId,
    
    // Computed
    filteredChats,
    
    // Methods
    handleChatHistoryClick,
    handleNewChatClick,
    handleMenuAction,
    handleSaveRename,
    handleCancelRename,
    handleConfirmDelete,
    handleCancelDelete,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
