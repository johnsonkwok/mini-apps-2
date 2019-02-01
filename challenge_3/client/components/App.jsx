import React, { Component } from 'react';
import Keypad from './Keypad';
import Scorecard from './Scorecard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: 1,
      currentBall: 1,
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
      },
      totalScore: 0,
      currentPinsLeft: 10,
      errorMsg: false,
      gameComplete: false
    };
    this.addPoints = this.addPoints.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }
  
  addPoints(e) {
    const numPinsHit = Number(e.target.value);

    if (numPinsHit > this.state.currentPinsLeft) {
      this.setState({
        errorMsg: true
      });
      setTimeout(() => {
        this.setState({
          errorMsg: false
        });
      }, 3000);
      return;
    }

    let ball = (this.state.currentBall) === 1 ? 2 : 1;
    let frame = this.state.currentFrame;
    let pinsLeft = this.state.currentPinsLeft - numPinsHit;
    let completed = false;
    let points = numPinsHit;
    const currScoreByFrame = this.state.score;
    
    if (this.state.currentBall === 2 && numPinsHit !== 10) {
      frame = this.state.currentFrame + 1;
      pinsLeft = 10;
    }

    if (this.state.currentBall === 1 && numPinsHit === 10) {
      points = 30;
      frame = this.state.currentFrame + 1;
      ball = 1;
      pinsLeft = 10;
    } else if (this.state.currentBall === 2 && numPinsHit === this.state.currentPinsLeft) {
      points = 10;
      frame = this.state.currentFrame + 1;
      ball = 1;
      pinsLeft = 10;
    }
    
    currScoreByFrame[this.state.currentFrame].push(points);
    let currentTotal = 0;
    for (let frame in currScoreByFrame) {
      if (currScoreByFrame[frame].length > 0) {
        currentTotal += currScoreByFrame[frame].reduce((acc, cv) => acc + cv);
      }
    }
    
    if (this.state.currentFrame === 10 && (this.state.currentBall === 2 || numPinsHit === 10)) {
      completed = true;
      frame = 1;
    }
    
    if (!this.state.gameComplete) {
      this.setState({
        score: currScoreByFrame,
        currentBall: ball,
        currentFrame: frame,
        currentPinsLeft: pinsLeft,
        gameComplete: completed,
        totalScore: currentTotal
      });
    }
  }

  startNewGame() {
    this.setState({
      currentFrame: 1,
      currentBall: 1,
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
      },
      totalScore: 0,
      currentPinsLeft: 10,
      errorMsg: false,
      gameComplete: false
    });
  }

  render() {
    return (
      <div>
        <Keypad addPoints={this.addPoints} />
        {this.state.errorMsg ? <h3>Please choose a valid number of pins hit.</h3> : null}
        <h4>Number of Pins Left on Current Frame: {this.state.currentPinsLeft}</h4>
        <Scorecard score={this.state.score} totalScore={this.state.totalScore} />
        {this.state.gameComplete ? <h2>The game has finished!</h2> : null}
        {this.state.gameComplete ? <button type="button" onClick={this.startNewGame}>New Game</button> : null}
      </div>
    );
  }
}

export default App;