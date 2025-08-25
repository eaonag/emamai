/**
 * Delete Confirmation Dialog Component for EmamAi Application
 * 
 * This component displays a modal dialog for confirming chat deletion
 * with proper accessibility and click handling.
 */

import React from 'react';
import { ChatItem } from '../../types';

interface DeleteConfirmDialogProps {
  deleteConfirmOpen: boolean;
  deletingChatId: number | null;
  chatHistory: ChatItem[];
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

/**
 * Delete Confirmation Dialog Component - Modal for confirming chat deletion
 */
export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  deleteConfirmOpen,
  deletingChatId,
  chatHistory,
  handleCancelDelete,
  handleConfirmDelete
}) => {
  if (!deleteConfirmOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancelDelete}>
      <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="delete-dialog-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2-2V6"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </div>
        <div className="delete-dialog-content">
          <h3>Delete Chat</h3>
          <p>
            Are you sure you want to delete "{chatHistory.find(chat => chat.id === deletingChatId)?.title}"? 
            This action cannot be undone.
          </p>
        </div>
        <div className="delete-dialog-actions">
          <button className="delete-dialog-btn cancel" onClick={handleCancelDelete}>
            Cancel
          </button>
          <button className="delete-dialog-btn confirm" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
