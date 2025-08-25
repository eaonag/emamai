/**
 * Search Box Component for EmamAi Application
 * 
 * This component provides chat search functionality for the drawer
 * with input field and search icon styling.
 */

import React from 'react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * Search Box Component - Chat search functionality in drawer
 */
export const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <img src="/search_chat.png" className="search-icon" alt="search" />
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search chat..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
