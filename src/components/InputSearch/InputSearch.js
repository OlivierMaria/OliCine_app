import React, { useState } from "react";

const InputSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center justify-center"
    >
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={query}
        onChange={handleInputChange}
        className="mb-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="mb-8 px-4 py-2 ml-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Rechercher
      </button>
    </form>
  );
};

export default InputSearch;
