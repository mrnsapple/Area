import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import Apk from './Apk';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
    Route,
} from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      mail: "",
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
/*       if (this.state.user) {
        this.setState({ user });
        // User is signed in.
      } else {
        this.setState({ user : null})
        // No user is signed in.
      }; */
}

updateUser = (user) => {
  this.setState({user})
}
updatemail = (mail) => {
  this.setState({mail})
}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              {this.state.user ? ( <Home mail={this.state.mail} updateUser={this.updateUser}/>) : (<Login  updateUser={this.updateUser}  updatemail={this.updatemail}/>)}
            </div>
          </Route>
          <Route path="/client.apk">
            <Apk></Apk>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
//{this.state.user ? ( <Home mail={this.state.mail} updateUser={this.updateUser}/>) : (<Login  updateUser={this.updateUser}  updatemail={this.updatemail}/>)}
//<Link to="/apk/client-release.apk" target="_blank" download>Download</Link>