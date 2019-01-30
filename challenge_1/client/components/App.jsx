import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      pageNum: 0,
      query: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  loadEventsFromServer(query = '', page = 1) {
    fetch(`/events?q=${query}&_limit=10&_page=${this.state.pageNum}`)
      .then(res => res.json())
      .then((events) => {
        this.setState({ events });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.loadEventsFromServer();
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  handlePageClick(data) {
    let pageNum = data.selected;
    this.setState({ pageNum }, () => {
      this.loadEventsFromServer();
    });
  };

  render() {
    return (
      <div>
        <Search />
        <EventList events={this.state.events} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}

          //  Total page count (with 10 items per page displayed) obtained by making GET req 
          // to '/events?_start=1&_limit=10' and checking the amount in the 'X-Total-Count'
          // header, then dividing that number by 10
          pageCount={3786}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;