import React, { useState, useEffect, useRef } from 'react';
import { fetchMockedData } from '../../api/mockApi';
import './Dropdown.css'; // Add custom styles here if needed

const Dropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Fetching suggestions with pagination
  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const newSuggestions = await fetchMockedData(searchTerm, page);
      setSuggestions(prev => [...prev, ...newSuggestions]);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setSuggestions([]);
      setPage(1);
      fetchSuggestions();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && page > 1) {
      fetchSuggestions();
    }
  }, [page]);

  const handleScroll = e => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  // Add to selected items
  const addToSelected = item => {
    if (!selectedItems.some(selected => selected.id === item.id)) {
      setSelectedItems(prev => [...prev, item]);
    }
    if (!history.find(hist => hist.id === item.id)) {
      setHistory(prev => [...prev, item]);
    }
  };

  // Remove from selected items
  const removeFromSelected = item => {
    setSelectedItems(prev =>
      prev.filter(selected => selected.id !== item.id)
    );
  };

  return (
    <div ref={dropdownRef} className="w-96 mx-auto mt-10">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        className="w-full p-2 border rounded shadow focus:outline-none focus:ring"
      />
      {isOpen && (
        <div
          className="dropdown-menu mt-2 max-h-60 overflow-auto border rounded shadow p-2 bg-white"
          onScroll={handleScroll}
        >
          {suggestions.map(item => (
            <div
              key={item.id}
              className="dropdown-item flex items-center p-2 cursor-pointer"
              onClick={() => addToSelected(item)}
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-8 h-8 rounded-full mr-3 transform hover:scale-125 transition-all"
              />
              <span>{item.name}</span>
            </div>
          ))}
          {isLoading && <p className="text-center">Loading...</p>}
        </div>
      )}
      <div className="mt-4">
        <h3 className="font-bold mb-2">Recent:</h3>
        <div className="flex flex-wrap gap-2">
          {history.slice(-5).map(item => (
            <div
              key={item.id}
              className="recent-item flex items-center gap-2 p-2 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200"
              onClick={() => addToSelected(item)}
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-8 h-8 rounded-full transform hover:scale-110 transition-all"
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold mb-2">Selected Items:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedItems.map(item => (
            <div
              key={item.id}
              className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-8 h-8 rounded-full mr-2 transform hover:scale-110 transition-all"
              />
              {item.name}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeFromSelected(item)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
