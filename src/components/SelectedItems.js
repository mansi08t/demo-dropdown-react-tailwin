import React from 'react';

const SelectedItems = ({ selectedItems, toggleSelection }) => (
  <div className="selected-items">
    {selectedItems.map(item => (
      <span key={item.id} className="selected-item">
        {item.name} <button onClick={() => toggleSelection(item)}>×</button>
      </span>
    ))}
  </div>
);

export default SelectedItems;
