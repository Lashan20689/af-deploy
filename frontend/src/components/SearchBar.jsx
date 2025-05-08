import React from 'react';
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or language..."
      className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 dark:bg-white dark:text-gray-900"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;