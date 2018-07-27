import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/App.css';
import axios from "axios";
import Editor from './editor.js';
import BattleDisplay from './battle-display.js';

class App extends Component {
  state = {
      user: [],
      battles: [],
      loading: false,
      loginUser: "",
      newUser: ""
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  loadUsers = async () => {
    // this.setState({ loading: true })
    // const userRes = await axios.get('/users');
    // const user = userRes.data.payload[0]
    // this.setState({ user, loading: false })
  }

  loginUser = async (e) => {
    // this.setState({ loading: true })
    const checkUser = this.state.loginUser;
    const checkingUser = await axios.get(`/user/${checkUser}`);
    console.log(checkingUser);
    // this.setState({ loading: false })

    // if (checkUser === checkingUser) {
    //   console.log("samesies")
    // } else {
    //   console.log("nope");
    // }


    //search the database for this value
    //if found then return it and set it to state
      //refresh page
    //else return user not found
  }

  signUpUser = async (e) => {
    const body = {
      name: this.state.newUserName,
      email: this.state.newUserEmail
    }
    axios.post("/usersPost", body).then(res => {
      this.props.history.push('/');
    }).catch( err => console.log(err))
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
    if (user === undefined || user.length === 0) return (
      <div className="battle-skry-not-logged-in">
        <h2>Have an account already?</h2>
        <input className='battle-skry-login-user' onChange={this.onChange} name="loginUser" placeholder="Email Address" />
        <button className="battle-skry-login-button" type="button" onClick={this.loginUser}>Login</button>
        <h2>Or sign up!</h2>
        <input className='battle-skry-signup-user' onChange={this.onChange} name="newUserName" placeholder="Username" />
        <input className='battle-skry-signup-user-email' onChange={this.onChange} name="newUserEmail" placeholder="Email Address" />
        <button className="battle-skry-signup-button" type="button" onClick={this.signUpUser}>Sign Up</button>
      </div>
    )
    return (
      <Router>
        <div className="battle-skry-home">
          <header className="battle-skry-header">
            <h1>Battle Skry</h1>
            <h3>Welcome {user.name}!</h3>
          </header>
          <Route exact path='/' render={({history}) => <BattleDisplay user={this.state.user} refresh={this.refresh} history={history} ></BattleDisplay>} />
          <Route exact path='/editor' render={({history}) => <Editor user={this.state.user} refresh={this.refresh} history={history} />} />
          <Route exact path='/editor/:_id' render= {(routerProps) => <Editor user={this.state.user} refresh={this.refresh} {...routerProps} />} />
        </div>
      </Router>
    );
  }
}

export default App;