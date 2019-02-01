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
      endDate: ''
    };
    this.updateData = this.updateData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateData() {
    fetch(`/bpi/range?start=${this.state.startDate}&end=${this.state.endDate}`)
      .then(res => res.json())
      .then((chartData) => {
        this.setState({ chartData: chartData.bpi });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.startDate > this.state.endDate) {
      alert('Please enter a valid date range')
    } else {
      this.updateData();
    }
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
    return (
      <div>
        <DateRange startDate={this.state.startDate} endDate={this.state.endDate} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <Chart chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;