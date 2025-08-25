/**
 * Drawer Component for EmamAi Application
 * 
 * This component renders the sliding sidebar with navigation, search,
 * and chat history functionality with proper overlay handling.
 */

import React from 'react';
import { ChatItem } from '../../types';
import { SearchBox } from '../ui/SearchBox';
import { ChatHistoryItem } from '../chat/ChatHistoryItem';

interface DrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleNewChatClick: () => void;
  filteredChats: ChatItem[];
  selectedChatId: number | null;
  editingChatId: number | null;
  editingChatName: string;
  openMenuId: number | null;
  handleChatHistoryClick: (chatId: number) => void;
  setEditingChatName: (name: string) => void;
  handleSaveRename: () => void;
  handleCancelRename: () => void;
  handleMenuToggle: (chatId: number, event: React.MouseEvent) => void;
  handleMenuAction: (action: string, chatId: number, event: React.MouseEvent) => void;
}

/**
 * Drawer Component - Sliding sidebar with navigation, search, and chat history
 */
export const Drawer: React.FC<DrawerProps> = ({
  isDrawerOpen,
  toggleDrawer,
  searchQuery,
  setSearchQuery,
  handleNewChatClick,
  filteredChats,
  selectedChatId,
  editingChatId,
  editingChatName,
  openMenuId,
  handleChatHistoryClick,
  setEditingChatName,
  handleSaveRename,
  handleCancelRename,
  handleMenuToggle,
  handleMenuAction
}) => {
  return (
    <>
      {/* Drawer Overlay - Darkens the background when drawer is open */}
      {isDrawerOpen && (
        <div className={`drawer-overlay ${isDrawerOpen ? 'drawer-open' : ''}`} onClick={toggleDrawer}></div>
      )}
      
      {/* Drawer - Side navigation panel */}
      <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
        {/* Header section with title and close button */}
        <div className="drawer-header">
          <h3>Main Menu</h3>
          <button className="drawer-close" onClick={toggleDrawer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Fixed Top Section - Search and New Chat button */}
        <div className="drawer-fixed-top">
          <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <div className="drawer-item" onClick={handleNewChatClick}>
            <img src="/new_chat.png" className="drawer-icon-img" alt="new chat" />
            <span>New chat</span>
          </div>
        </div>

        {/* Scrollable History Section - Chat history list */}
        <div className="drawer-history-section">
          <div className="drawer-history-header">
            <span>History</span>
          </div>
          <div className="drawer-history-content">
            {/* Sort chats: pinned first, then by original order */}
            {[...filteredChats]
              .sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return 0;
              })
              .map(chat => (
                <ChatHistoryItem
                  key={chat.id}
                  chat={chat}
                  selectedChatId={selectedChatId}
                  editingChatId={editingChatId}
                  editingChatName={editingChatName}
                  openMenuId={openMenuId}
                  handleChatHistoryClick={handleChatHistoryClick}
                  setEditingChatName={setEditingChatName}
                  handleSaveRename={handleSaveRename}
                  handleCancelRename={handleCancelRename}
                  handleMenuToggle={handleMenuToggle}
                  handleMenuAction={handleMenuAction}
                />
              ))
            }
            {/* No results message when search returns no results */}
            {filteredChats.length === 0 && searchQuery && (
              <div className="no-results">
                <img src="/search_chat.png" className="no-results-icon" alt="No results" />
                <p>No chats found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Section - Settings and Help */}
        <div className="drawer-fixed-bottom">
          <div className="drawer-item">
            <img src="/settings.png" className="settings-icon-img" alt="settings" />
            <span>Settings and help</span>
          </div>
        </div>
      </div>
    </>
  );
};
