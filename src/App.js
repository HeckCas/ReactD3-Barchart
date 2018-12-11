import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import BarChart from './BarChart';
import imgD3 from './media/d3.png';
import imgReact from './media/react.png';

class App extends Component {

  state = {
     data: new Array(9).fill(0).map( n => Math.floor(Math.random() * 300)),
   }

  render() {
    return (
      <div className="wrapper">
        <h1>Hecho con d3.js y React</h1>
        <div className="display">
        <figure>
          <img src= { imgD3 } width="200px" height="200px"/>
        </figure>
        <div id="d3-content">
          <BarChart data={ this.state.data } />
        </div>
        <figure>
          <img src= { imgReact } width="280px" height="220px"/>
        </figure>
      </div>
    </div>
    );
  }
}

export default App;
