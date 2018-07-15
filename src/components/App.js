import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/App.css';
import axios from "axios";
import Login from './login.js';
import Editor from './editor.js';
import BattleDisplay from './battle-display.js';

class App extends Component {
  state = {
      user: [],
      battles: [],
      loading: false
  }

  loadUsers = async () => {
    this.setState({ loading: true })
    const userRes = await axios.get('/users');
    const user = userRes.data.payload[0]
    this.setState({ user, loading: false })
  }



  refresh = () => {
    this.loadBattles();
  }

  componentDidMount = async () => {
    this.loadUsers();
    // this.refresh();
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return (<h1>Loading...</h1>)
    if (!user) return (
      <div className="battle-skry-not-logged-in">
        <h1>Not logged in.</h1>
        <Login />
        <button onClick={this.refresh}>TEST</button>
      </div>
    )
    return (
      <Router>
        <div className="battle-skry-home">
          <header className="battle-skry-header">
            <h1>Battle Skry</h1>
            <h3>Welcome {user.name}!</h3>
          </header>
          <Route exact path='/' render={({history}) => <BattleDisplay history={history} ></BattleDisplay>} />
          <Route path='/editor' render={({history}) => <Editor refresh={this.refresh} history={history} />} />
        </div>
      </Router>
    );
  }
}

export default App;