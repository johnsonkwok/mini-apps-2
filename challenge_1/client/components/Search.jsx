import React from 'react';

const Search = ({ handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" placeholder="Search for event" />
      <input type="submit" />
    </form>
  </div>
);

export default Search;
