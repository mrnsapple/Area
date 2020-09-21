import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Navbar, Container, Badge, Form} from 'react-bootstrap';
import firebase from "firebase";
import Area from "./AreaModal"

import Modaltest from './Modaltest';

import Test from './test';

import {
  BrowserRouter,
} from "react-router-dom";


class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.Timer = this.Timer.bind(this);
        this.Github = this.Github.bind(this);
        this.Weather = this.Weather.bind(this);
        this.Movie = this.Movie.bind(this);
        this.Mail = this.Mail.bind(this);
        this.actionarea = this.actionarea.bind(this);
        this.reactionarea = this.reactionarea.bind(this);
        this.haChange = this.haChange.bind(this);

        this.state = {
          actionarea: "",
          reactionarea: "",
          action: "",
          ID: "0",
          val: "",
          data: [],
          loading: false,
          temp: "",
          name: "",
          mail: this.props.mail,
          info: null,
          filmdate: "",
          area: "",
          name0: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          subscribeTimer: "",
          subscribeWeather: "",
          subscribeGithub: "",
          subscribeMail: "",
          subscribeMovie: "",
          GitHubcheked: false,
          Weathercheked: false,
          Timerchecked: false,
          Mailcheked: false,
          Moviecheked: false,
        };
    }

    logout() {
    axios.post(`http://localhost:8080/logout/${this.state.mail}`)
    .then(data => {
      firebase.auth().signOut();
      const user = null;
      this.props.updateUser(user);
    })
    .catch(e => console.log(e))
  }


    async componentDidMount() {
      this.setState({loading: true});
      var data = await axios.get(`http://localhost:8080/services/${this.state.mail}`)
      var da = await axios.get(`http://localhost:8080/area/${this.state.mail}`)
      .catch(e => console.log(e))
      //console.log(date);
      this.setState({
        subscribeTimer: data.data.services[0].subscribed,
        subscribeGithub: data.data.services[3].subscribed,
        subscribeWeather: data.data.services[2].subscribed,
        subscribeMail: data.data.services[4].subscribed,
        subscribeMovie : data.data.services[1].subscribed,
        name: data.data.services[0].name,
        info: data,
        area: da.data.areas,
        name0: data.data.services[0].name,
        name1: data.data.services[1].name,
        name2: data.data.services[2].name,
        name3: data.data.services[3].name,
        name4: data.data.services[4].name,
      })
      console.log(this.state.area);
      this.VerifcheckTimer();
      this.VerifcheckGithub();
      this.Verifcheckweather();
      this.VerifcheckMail();
      this.VerifcheckMovie();
    }

    VerifcheckGithub()
    {
      if(this.state.subscribeGithub === "ok"){
        this.setState({
          GitHubcheked: true,
        })
      }else {
        this.setState({
          GitHubcheked: false,
        })
      }
    }
    VerifcheckMail()
    {
      if(this.state.subscribeMail === "ok"){
        this.setState({
          Mailcheked: true,
        })
      }else {
        this.setState({
          Mailcheked: false,
        })
      }
    }
    Verifcheckweather()
    {
      if(this.state.subscribeWeather === "ok"){
        this.setState({
          Weathercheked: true,
        })
      }else {
        this.setState({
          Weathercheked: false,
        })
      }
    }
    VerifcheckTimer()
    {
      if(this.state.subscribeTimer === "ok"){
        this.setState({
          Timerchecked: true,
        })
      }else {
        this.setState({
          Timerchecked: false,
        })
      }
    }
    VerifcheckMovie()
    {
      if(this.state.subscribeMovie === "ok"){
        this.setState({
          Moviecheked: true,
        })
      }else {
        this.setState({
          Moviecheked: false,
        })
      }
    }

    Timer()
    {
      if (this.state.Timerchecked === true){
        axios.post(`http://localhost:8080/services/unsubscribe/${this.state.mail}/1`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Timerchecked: false,
        })
      }else {
        axios.post(`http://localhost:8080/services/subscribe/${this.state.mail}/1`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Timerchecked: true,
        })
      }
    }
    Weather()
    {
      if (this.state.Weathercheked === true){
        axios.post(`http://localhost:8080/services/unsubscribe/${this.state.mail}/4`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Weathercheked: false,
        })
      }else {
        axios.post(`http://localhost:8080/services/subscribe/${this.state.mail}/4`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Weathercheked: true,
        })
      }
    }
    Mail()
    {
      if (this.state.Mailcheked === true){
        axios.post(`http://localhost:8080/services/unsubscribe/${this.state.mail}/3`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Mailcheked: false,
        })
      }else {
        axios.post(`http://localhost:8080/services/subscribe/${this.state.mail}/3`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Mailcheked: true,
        })
      }
    }
    Github()
    {
      if (this.state.GitHubcheked === true){
        axios.post(`http://localhost:8080/services/unsubscribe/${this.state.mail}/2`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          GitHubcheked: false,
        })
      }else {
          axios.post(`http://localhost:8080/services/subscribe/${this.state.mail}/2`)
          .then(data => {
            console.log(data);
          })
          .catch(e => console.log(e))
        this.setState({
          GitHubcheked: true,
        })
      }
    }

    Movie()
    {
      if (this.state.Moviecheked === true){
        axios.post(`http://localhost:8080/services/unsubscribe/${this.state.mail}/5`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Moviecheked: false,
        })
      }else {
        axios.post(`http://localhost:8080/services/subscribe/${this.state.mail}/5`)
        .then(data => {
          console.log(data);
        })
        .catch(e => console.log(e))
        this.setState({
          Moviecheked: true,
        })
      }
    }
    actionarea = (actionarea) => {
        this.setState({actionarea}, () => {
      //console.log(this.state.actionarea);
      if(this.state.actionarea.action === "Timer"){
        console.log("Timer OK");
      }
      else if(this.state.actionarea.action === "Trello"){
        console.log("Trello OK");
      }
      else if(this.state.actionarea.action === "Mail"){
        console.log("Mail OK");
    }
    else if(this.state.actionarea.action === "OpenWeather"){
      console.log("OpenWeather OK");
  
  }
      })

    }
    reactionarea = (reactionarea) => {
      this.setState({reactionarea}, () => {
    //console.log(this.state.actionarea);
    if(this.state.reactionarea.reaction === "Timer"){
      console.log("Timer OK");
    }
    else if(this.state.reactionarea.reaction === "Trello"){
      console.log("Trello OK");
    }
    else if(this.state.reactionarea.reaction === "Mail"){
      console.log("Mail OK");
  }
  else if(this.state.reactionarea.reaction === "OpenWeather"){
    console.log("OpenWeather OK");}
    })
  }

  haChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.val);
  }

    render() {
        return (
          <div>
            <BrowserRouter>
            </BrowserRouter>
            <Navbar fixed="top" expand="lg" variant="dark" bg="dark">
              <Container>
                <Navbar.Brand>
                  <h1>AREA</h1>
                  </Navbar.Brand>
                <h3 style={{color: "white"}}>Welcome <Badge variant="secondary" style={{color: "white"}}>{this.props.mail}</Badge></h3>
                <Button onClick={this.logout}>logout</Button>
              </Container>
            </Navbar>
            <Container>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Row>
              <Container>
                    <Form.Check style={{marginRight:"5px", marginTop:"6px"}} 
                      onClick={this.Timer}
                      checked={this.state.Timerchecked}
                      readOnly type="switch"
                      id={this.state.name0}
                      label="Subscribe"/>
                    <Modaltest name={this.state.name0} sub={this.state.subscribe} test={this.state.info} id="0"></Modaltest>
                </Container>
                <Container>
                    <Form.Check style={{marginRight:"5px", marginTop:"6px"}} 
                      onClick={this.Movie}
                      checked={this.state.Moviecheked}
                      readOnly type="switch"
                      id={this.state.name1}
                      label="Subscribe"/>
                    <Modaltest name={this.state.name1} sub={this.state.subscribe} test={this.state.info} id="1"></Modaltest>
                </Container>
                <Container>
                    <Form.Check style={{marginRight:"5px", marginTop:"6px"}} 
                      onClick={this.Weather}
                      checked={this.state.Weathercheked}
                      readOnly type="switch"
                      id={this.state.name2}
                      label="Subscribe"/>
                    <Modaltest name={this.state.name2} sub={this.state.subscribe} test={this.state.info} id="2"></Modaltest>
                </Container>
                <Container>
                    <Form.Check style={{marginRight:"5px", marginTop:"6px"}} 
                      onClick={this.Github} 
                      checked={this.state.GitHubcheked} 
                      readOnly type="switch" 
                      id={this.state.name3} 
                      label="Subscribe"/>
                    <Modaltest name={this.state.name3} sub={this.state.subscribe} test={this.state.info} id="3"></Modaltest>
                </Container>
                <Container>
                    <Form.Check style={{marginRight:"5px", marginTop:"6px"}} 
                      onClick={this.Mail}
                      checked={this.state.Mailcheked}
                      readOnly type="switch"
                      id={this.state.name4}
                      label="Subscribe"/>
                    <Modaltest name={this.state.name4 } sub={this.state.subscribe} test={this.state.info} id="4"></Modaltest>
                </Container>
              </Row>
            </Container>
            <Container>
              <Test name="AREA" info={this.state.info} actionarea={this.actionarea} reactionarea={this.reactionarea} email={this.state.mail}/>
            </Container>

            <Container>
            <Area email={this.state.mail} areaa={this.state.area}></Area>
            </Container>
          </div>
        );
    }
}
export default Home;

//<Test name="test" info={this.state.info} actionarea={this.actionarea} reactionarea={this.reactionarea}/>