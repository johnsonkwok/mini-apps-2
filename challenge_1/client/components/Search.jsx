import React from 'react';

const Search = ({ updateQuery, handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" placeholder="Search for event" onChange={updateQuery} />
      <input type="submit" />
    </form>
  </div>
);

export default Search;
