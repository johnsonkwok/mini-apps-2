import React, { Component } from 'react';
import Chart from './Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
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
        <Chart chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;