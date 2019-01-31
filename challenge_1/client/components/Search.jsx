import React from 'react';

const Search = ({ updateQuery, handleSubmit }) => (
  <div className="pr-5">
    <form onSubmit={handleSubmit} className="search-input form-inline">
      <input className="form-control mr-1" type="text" name="search" placeholder="Search for event" size="50" onChange={updateQuery} />
      <input className="btn btn-outline-primary input-group-append d-inline" type="submit" />
    </form>
  </div>
);

export default Search;
