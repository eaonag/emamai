/**
 * Type Definitions for EmamAi Application
 * 
 * This file contains all the TypeScript interfaces and types used throughout
 * the application for chat functionality, pamphlets, language support, etc.
 */

export interface ChatItem {
  id: number;
  title: string;
  time: string;
  pinned: boolean;
}

export interface PamphletCard {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  paperNumber?: string;
  image?: string;
  backgroundImage?: string;
  downloadUrl: string;
  tags: string[];
}

export interface Language {
  code: string;
  name: string;
  nativeName?: string;
  direction?: 'ltr' | 'rtl';
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  isTyping?: boolean;
  pamphletContext?: string;
}

export interface ChatContextType {
  // State
  chatHistory: ChatItem[];
  selectedChatId: number | null;
  editingChatId: number | null;
  editingChatName: string;
  deleteConfirmOpen: boolean;
  deletingChatId: number | null;
  searchQuery: string;
  
  // Actions
  setChatHistory: React.Dispatch<React.SetStateAction<ChatItem[]>>;
  setSelectedChatId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditingChatId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditingChatName: React.Dispatch<React.SetStateAction<string>>;
  setDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingChatId: React.Dispatch<React.SetStateAction<number | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  
  // Computed
  filteredChats: ChatItem[];
  
  // Methods
  handleChatHistoryClick: (chatId: number) => void;
  handleNewChatClick: () => void;
  handleMenuAction: (action: string, chatId: number, event: React.MouseEvent) => void;
  handleSaveRename: () => void;
  handleCancelRename: () => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
}
