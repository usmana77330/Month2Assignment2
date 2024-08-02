import React from 'react';
import '../styles/Filter.css';

const Filter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by keyword"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
