import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    counter: 0,
    message: ''
  }

  handleClickInc = () => {
    this.setState({
      ...this.state,
      counter: this.state.counter + 1
    })
  }

  handleClickDec = () => {
    let counterValue = {...this.state.counter};
    if (counterValue < 0) {
     this.setState({
        message: "Counter cannot go below 0"
      })
    } else {
      this.setState({
        counterValue, 
        counter: this.state.counter - 1
      })
    }
   
  }
  render() {
    return (
      <div data-test="component-app">
        <h1>App</h1>
        {this.state.counter >= 0 ?
          <h1 data-test="counter-display">the counter is currently {this.state.counter}</h1>
          :
        <h1 data-test="warning-display" style={{color: 'red'}}>Counter cannot go below 0</h1>

        }
        <button
          data-test="increment-button"
          onClick={() => this.handleClickInc()}
        >
          Increment Counter
        </button >
        <button
          data-test="decrement-button"
          onClick={() => this.handleClickDec()}>
          Decrement Counter
        </button>
      </div>
    )
  }
}

export default App;
