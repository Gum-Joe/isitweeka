import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="isitweeka">
          {/*<h2>It is</h2>
          <h1>Week A/B</h1>
          <h3>More coming soon</h3>*/}
          <h2>isitweeka.com</h2>
          <h1>IT BEGINS.</h1>
          <h3>More coming soon</h3>
        </div>
      </div>
    )
  }
}

export default App;
