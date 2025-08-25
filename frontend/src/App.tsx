/**
 * EmamAi Application Main Component
 * 
 * This is the main entry point for the EmamAi application.
 * It orchestrates all the hooks, context providers, and main UI components.
 * 
 * Features:
 * - Islamic Q&A chat functionality
 * - Pamphlet browsing and interaction
 * - Quran exploration
 * - Multi-language support
 * - Responsive design with drawer navigation
 */

import React, { useEffect } from 'react';
import './styles/index.css';
import './styles/LanguagePopup.css';

// Import types
import { PamphletCard } from './types';

// Import context and hooks
import { ChatProvider, useChatContext } from './context/ChatContext';
import { 
  useUIState, 
  useChat, 
  useNavigation, 
  useLanguage, 
  useDrawerEffects 
} from './hooks';

// Import components
import {
  Header,
  Drawer,
  BottomNavigation,
  MainContent,
  DeleteConfirmDialog
} from './components';

/**
 * App Content Component - Main application content wrapper
 * Handles all the state management integration and renders the UI
 */
interface AppContentProps {
  uiState: ReturnType<typeof useUIState>;
}

const AppContent: React.FC<AppContentProps> = ({ uiState }) => {
  const chatContext = useChatContext();
  const navigation = useNavigation();
  const language = useLanguage();
  const chat = useChat();

  // Clear chat messages when changing pamphlets or sections
  useEffect(() => {
    chat.clearMessages();
  }, [navigation.selectedPamphlet, navigation.activeBottomNav]);

  // Handle drawer effects and side effects
  useDrawerEffects(
    navigation.isDrawerOpen,
    uiState.openMenuId,
    chatContext.editingChatId,
    uiState.setOpenMenuId,
    chatContext.setEditingChatId,
    chatContext.setEditingChatName,
    uiState.setDrawerTooltipVisible
  );

  return (
    <div className="App">
      {/* Header - Fixed top navigation with drawer toggle, logo, and language selector */}
      <Header
        isDrawerTooltipVisible={uiState.isDrawerTooltipVisible}
        setDrawerTooltipVisible={uiState.setDrawerTooltipVisible}
        toggleDrawer={navigation.toggleDrawer}
        isLangTooltipVisible={uiState.isLangTooltipVisible}
        setLangTooltipVisible={uiState.setLangTooltipVisible}
        selectedLanguage={language.selectedLanguage}
        isPopupOpen={language.isPopupOpen}
        togglePopup={language.togglePopup}
        handleSelectLanguage={language.handleSelectLanguage}
        setIsPopupOpen={language.setIsPopupOpen}
        activeBottomNav={navigation.activeBottomNav}
        selectedPamphlet={navigation.selectedPamphlet}
        onPamphletBack={navigation.closePamphletView}
      />

      {/* Drawer - Sliding side navigation with search and chat history */}
      <Drawer
        isDrawerOpen={navigation.isDrawerOpen}
        toggleDrawer={navigation.toggleDrawer}
        searchQuery={chatContext.searchQuery}
        setSearchQuery={chatContext.setSearchQuery}
        handleNewChatClick={chatContext.handleNewChatClick}
        filteredChats={chatContext.filteredChats}
        selectedChatId={chatContext.selectedChatId}
        editingChatId={chatContext.editingChatId}
        editingChatName={chatContext.editingChatName}
        openMenuId={uiState.openMenuId}
        handleChatHistoryClick={chatContext.handleChatHistoryClick}
        setEditingChatName={chatContext.setEditingChatName}
        handleSaveRename={chatContext.handleSaveRename}
        handleCancelRename={chatContext.handleCancelRename}
        handleMenuToggle={uiState.handleMenuToggle}
        handleMenuAction={chatContext.handleMenuAction}
      />

      {/* Main Content - Central content area that changes based on navigation */}
      <MainContent 
        activeBottomNav={navigation.activeBottomNav}
        selectedPamphlet={navigation.selectedPamphlet}
        chatInitialMessage={navigation.chatInitialMessage}
        onPamphletChat={navigation.openPamphletView}
        onPamphletBack={navigation.closePamphletView}
        onSuggestionClick={navigation.handleSuggestionClick}
        chat={chat}
      />

      {/* Bottom Navigation - Fixed bottom navigation with integrated chat */}
      <BottomNavigation
        activeBottomNav={navigation.activeBottomNav}
        handleBottomNavClick={navigation.handleBottomNavClick}
        selectedPamphlet={navigation.selectedPamphlet}
        chatInitialMessage={navigation.chatInitialMessage}
        onSendMessage={chat.addUserMessage}
      />

      {/* Delete Confirmation Dialog - Modal for confirming chat deletion */}
      <DeleteConfirmDialog
        deleteConfirmOpen={chatContext.deleteConfirmOpen}
        deletingChatId={chatContext.deletingChatId}
        chatHistory={chatContext.chatHistory}
        handleCancelDelete={chatContext.handleCancelDelete}
        handleConfirmDelete={chatContext.handleConfirmDelete}
      />
    </div>
  );
};

/**
 * Main App Component - Entry point with context providers
 * Provides chat context and UI state management to the entire application
 */
function App() {
  const uiState = useUIState();
  
  return (
    <ChatProvider setOpenMenuId={uiState.setOpenMenuId}>
      <AppContent uiState={uiState} />
    </ChatProvider>
  );
}

export default App;
