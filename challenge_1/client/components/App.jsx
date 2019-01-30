import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import ReactPaginate from 'react-paginate';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      pageNum: 1,
      pageCount: 1,
      query: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  loadEventsFromServer(query = '') {
    axios.get(`/events?q=${query}&_limit=10&_page=${this.state.pageNum}`)
      .then(res => {
        const pageCount = Math.ceil(res.headers['x-total-count'] / 10);
        const events = res.data;
        this.setState({ events, pageCount });
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
    let pageNum = data.selected + 1;
    console.log('page number', pageNum);
    this.setState({ pageNum }, () => {
      this.loadEventsFromServer();
    });
  };

  render() {
    return (
      <div>
        <Search />
        <EventList events={this.state.events} />
        <nav id="react-paginate">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </nav>
      </div>
    );
  }
}

export default App;