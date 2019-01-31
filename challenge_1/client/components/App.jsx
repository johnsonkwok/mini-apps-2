import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      pageNum: 0,
      pageCount: 1,
      query: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.goHome = this.goHome.bind(this);
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
    this.setState({
      pageNum: 1
    }, () => {
      this.loadEventsFromServer(this.state.query);
    });
  }

  updateQuery(e) {
    this.setState({
      query: e.target.value
    });
  }

  goHome() {
    this.setState({
      query: '',
      pageNum: 1
    }, () => {
      this.loadEventsFromServer();
    });
  }

  handlePageClick(data) {
    let pageNum = data.selected + 1;
    this.setState({ pageNum }, () => {
      this.loadEventsFromServer(this.state.query);
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar-header sticky-top shadow-sm">
          <div className="space-btwn">
            <button className="title" onClick={this.goHome}>
              Historical Events Finder
            </button>
            <Search updateQuery={this.updateQuery} handleSubmit={this.handleSubmit} query={this.state.query} />
          </div>
        </nav>
        <EventList events={this.state.events} />
        <nav className="page-bar fixed-bottom">
          <div className="centered">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              forcePage={this.state.pageNum - 1}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </div>
        </nav>
      </div>
    );
  }
}

export default App;