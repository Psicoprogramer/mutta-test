'use client'
import React, { useState } from 'react';

const Search = ({ data, setFilteredData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(data.filter(item => item.name.toLowerCase().includes(query)));
  };

  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchQuery}
        onChange={handleSearch}
        className="w-3/4 h-full border rounded p-4 mb-4"
      />
    </div>
  );
};

export default Search;
