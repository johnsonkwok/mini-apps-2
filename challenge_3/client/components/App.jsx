import React, { Component } from 'react';
import Keypad from './Keypad';
import Scorecard from './Scorecard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: 1,
      score: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
      }
    };
  }
  
  render() {
    return (
      <div>
        <Keypad />
        <Scorecard score={this.state.score} />
      </div>
    );
  }
}

export default App;