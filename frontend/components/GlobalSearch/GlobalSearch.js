import React from 'react';

const GlobalSearch = ({ filter, setFilter }) => {
  return (
    <div>
      Search:{' '}
      <input
        style={{ border: 'thin grey solid', borderRadius: '6px' }}
        value={filter || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalSearch;
