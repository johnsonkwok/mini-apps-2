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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/events?_page=1&_limit=10')
      .then(res => res.json())
      .then((events) => {
        this.setState({ events });
      })
      .catch(err => console.error(err));
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div>
        <Search />
        <EventList events={this.state.events} />
        
      </div>
    );
  }
}

export default App;