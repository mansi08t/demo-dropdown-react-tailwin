import React from 'react';

const DropdownItem = ({ item, isSelected, toggleSelection }) => (
  <div
    className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 ${
      isSelected ? 'bg-gray-200' : ''
    }`}
    onClick={() => toggleSelection(item)}
  >
    <img
      src={item.imageURL}
      alt={item.name}
      className="w-10 h-10 rounded-full"
    />
    <span>{item.name}</span>
  </div>
);

export default DropdownItem;
