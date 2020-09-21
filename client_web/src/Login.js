import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDwCU9QTuIlk8chFbuoN8QZIshSi3WCxMc",
  authDomain: "area-13e0f.firebaseapp.com"
})

class Login extends Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks : {
      signInSucess: () => false
    }
  }
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email:'',
      password:'',
      test:'',
      res_value:'',
      isSingnin: false,
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      const mail = user.email;
      this.props.updatemail(mail);
      axios.post(`http://localhost:8080/login/oauth2/check/${mail}/`)
      .then(data => {
        console.log(data)
      })
      .catch(e => console.log(e))
        const us =  user;
        this.props.updateUser(us);
      
    })
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  login(e){
    e.preventDefault();
    const mail = this.state.email;
    this.props.updatemail(mail);
    axios.post(`http://localhost:8080/login/${this.state.email}/${this.state.password}/`)
    .then(data => {
      console.log(data);
      this.setState({
        res_value: data.data.login,
      });
      if (data.data.login  === 'failed: no account exists with this email'){
        const user = null;
        window.alert("failed: no account exists with this email");
        this.props.updateUser(user);
      }else if (data.data.login === 'failed: incorrect password'){
        const user = null;
        this.props.updateUser(user);
      } else {
        const user = 'success';
        this.props.updateUser(user);
      }
    })
    .catch(e => console.log(e))

  }

  signup(e){
    e.preventDefault();
    const mail = this.state.email;
    this.props.updatemail(mail);
    axios.post(`http://localhost:8080/register/${this.state.email}/${this.state.password}/`)
    .then(data => {
      this.setState({
        res_value: data.data.login,
      });
      const user = data.data.login === 'failed: email already taken' ? null : 'success';
      this.props.updateUser(user);
      console.log(data);
    })
    .catch(e => console.log(e))

  }


  render() {
    return (
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label><br></br>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
                <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label><br></br>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={this.login} className="btn-primary">Login</button>
            <button onClick={this.signup} className="btn-success">Signup</button>
            <StyleFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </form>
          </div>
        </div>
    );
  }
}

export default Login;
