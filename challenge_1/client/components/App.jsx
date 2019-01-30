import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      query: ''
    };
  }

  render() {
    return (
      <div>
        <Search />
        <EventList />
        
      </div>
    );
  }
}

export default App;