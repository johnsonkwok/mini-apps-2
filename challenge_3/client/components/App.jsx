import React, { Component } from 'react';
import Keypad from './Keypad';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Keypad />
      </div>
    );
  }
}

export default App;