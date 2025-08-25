/**
 * Chat History Item Component for EmamAi Application
 * 
 * This component displays individual chat items in the drawer history
 * with inline editing, menu actions, and pin functionality.
 */

import React from 'react';
import { ChatItem } from '../../types';

interface ChatHistoryItemProps {
  chat: ChatItem;
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
 * Chat History Item Component - Individual chat item in drawer history
 */
export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  chat,
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
    <div 
      key={chat.id}
      className={`drawer-history-item ${selectedChatId === chat.id ? 'selected' : ''} ${chat.pinned ? 'pinned' : ''}`}
      onClick={() => editingChatId !== chat.id && handleChatHistoryClick(chat.id)}
    >
      <div className="drawer-history-item-wrapper">
        <div className="drawer-history-item-content">
          <span>
            {chat.pinned && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            )}
            {editingChatId === chat.id ? (
              <div className="inline-edit-container" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editingChatName}
                  onChange={(e) => setEditingChatName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSaveRename();
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      handleCancelRename();
                    }
                  }}
                  className="inline-edit-input"
                  autoFocus
                  onFocus={(e) => e.target.select()}
                />
                <div className="inline-edit-actions">
                  <button 
                    className="inline-edit-btn save" 
                    onClick={handleSaveRename}
                    title="Save"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </button>
                  <button 
                    className="inline-edit-btn cancel" 
                    onClick={handleCancelRename}
                    title="Cancel"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              chat.title
            )}
          </span>
          {editingChatId !== chat.id && <span className="history-time">{chat.time}</span>}
        </div>
        {editingChatId !== chat.id && (
          <div className="drawer-history-item-menu">
            <button className="menu-dots-button" onClick={(e) => handleMenuToggle(chat.id, e)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
              </svg>
            </button>
            {openMenuId === chat.id && (
              <div className="menu-dropdown open">
                <button className="menu-dropdown-item" onClick={(e) => handleMenuAction('pin', chat.id, e)}>
                  <img src="/pin.png" alt="Pin" width="16" height="16" />
                  {chat.pinned ? 'Unpin' : 'Pin'}
                </button>
                <button className="menu-dropdown-item" onClick={(e) => handleMenuAction('rename', chat.id, e)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Rename
                </button>
                <button className="menu-dropdown-item delete" onClick={(e) => handleMenuAction('delete', chat.id, e)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2,2h4a2,2,0,0,1,2,2V6"/>
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
