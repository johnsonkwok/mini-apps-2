import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import url from 'url';

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
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  loadEventsFromServer(query = '') {
    axios.get(`/events?q=${query}&_limit=10&_page=${this.state.pageNum}`)
      .then(res => {
        const pageCount = Math.ceil(res.headers['x-total-count'] / 10);
        const events = res.data;
        // const parsedUrl = url.parse(res.headers.link.split(';')[0].slice(1, -1));
        // let previousQuery = parsedUrl.query.substring(2, parsedUrl.query.indexOf('&'));;
        this.setState({ events, pageCount });
      })
      // .then(() => {
      //   this.setState({ query: '' });
      // })
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

  handlePageClick(data) {
    let pageNum = data.selected + 1;
    this.setState({ pageNum }, () => {
      this.loadEventsFromServer(this.state.query);
    });
  };

  render() {
    return (
      <div>
        <Search updateQuery={this.updateQuery} handleSubmit={this.handleSubmit} />
        <EventList events={this.state.events} />
        <nav>
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
        </nav>
      </div>
    );
  }
}

export default App;