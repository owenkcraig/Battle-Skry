import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Login from './login.js';
import Editor from './editor.js';
import Battle from './battle.js';

class App extends Component {
  async componentDidMount () {
    try {
      const response = await axios.get('/healthcheck')
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    try {
      const response = await axios.post('/login')
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="battle-skry-home">
        <header className="battle-skry-header">
          <h1>Battle Skry</h1>
          <div className="battle-skry-header-buttons">
            <Login />
            <button className="battle-skry-add-battle-button" type="button">Add Battle</button>
          </div>
        </header>
        <div className="battle-skry-body">
        </div>
        <Editor />
        <Battle />
      </div>
    );
  }
}

export default App;
