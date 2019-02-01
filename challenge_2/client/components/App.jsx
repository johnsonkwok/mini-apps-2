import React, { Component } from 'react';
import Chart from './Chart';
import DateRange from './DateRange';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      currentPrice: 0,
      startDate: '',
      endDate: '',
      cache: false
    };
    this.updateData = this.updateData.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCache = this.toggleCache.bind(this);
  }

  updateData() {
    fetch(`/bpi/range?start=${this.state.startDate}&end=${this.state.endDate}`)
      .then(res => res.json())
      .then((chartData) => {
        const key = `${this.state.startDate}${this.state.endDate}`;        
        window.localStorage.setItem(key, JSON.stringify(chartData.bpi));
        this.setState({ chartData: chartData.bpi });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  checkCache() {
    const key = `${this.state.startDate}${this.state.endDate}`;
    if (this.state.cache) {
      const cachedData = window.localStorage.getItem(key);
      if (cachedData === null) {
        this.updateData();
      } else {
        this.setState({
          chartData: JSON.parse(cachedData)
        });
      }
    } else {
      this.updateData();
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.startDate > this.state.endDate) {
      alert('Please enter a valid date range.')
    } else {
      this.state.cache ? this.checkCache() : this.updateData();
    }
  }

  toggleCache() {
    this.setState({
      cache: !this.state.cache
    });
  }

  componentDidMount() {
    fetch('/bpi')
      .then(res => res.json())
      .then((chartData) => {
        this.setState({ chartData: chartData.bpi });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const cacheActive = this.state.cache ? 'cornflowerblue' : 'white';
    return (
      <div>
        <button type="button" onClick={this.toggleCache} style={{backgroundColor: `${cacheActive}`}}>Use Cache</button>
        <DateRange startDate={this.state.startDate} endDate={this.state.endDate} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <Chart chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;