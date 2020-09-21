import React, {  Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form} from 'react-bootstrap';
import axios from "axios";



class Test extends Component {
  constructor(props){
    super(props);
    this.handelChangeAction = this.handelChangeAction.bind(this);
    this.handelChangeReaction = this.handelChangeReaction.bind(this);
    this.sendArea = this.sendArea.bind(this);
    this.handelInfoReaction = this.handelInfoReaction.bind(this);
    this.handelInfoAction = this.handelInfoAction.bind(this);
    this.handelChangeA = this.handelChangeA.bind(this);
    this.handelChangeR = this.handelChangeR.bind(this);
    this.state = {
      show: null,
      setShow: null,
      action: null,
      textReaction: "null",
      textAction: "null",
      reaction: "Mail",
      IDA: "4",
      actionID: "3",
      reactionID: "1",
      IDR: "4",
      mail: this.props.email,
    }
  }
  async sendArea(){
    const email = this.state.mail;
    const id_reaction = this.state.reactionID;

    if (this.state.textAction === ""){
      await this.setState({
        textAction: "Null"
      })
    }
    if (this.state.textReaction === ""){
      await this.setState({
        textReaction: "Null"
      })
    }
    var action_param = this.state.textAction;
    var reaction_param = this.state.textReaction;
    const id_action = this.state.actionID;
    var data = await axios.get(`http://localhost:8080/services/${this.state.mail}`)
    const Movie = data.data.services[1].subscribed;
    const Timer = data.data.services[0].subscribed;
    const OpenWeather = data.data.services[2].subscribed;
    const Mail= data.data.services[4].subscribed;
    const Github = data.data.services[3].subscribed;
    if (this.state.action === "Timer" && Timer ==="ko"){
        window.alert("Your not subcribe to the timer service")
    }
    else if (this.state.reaction === "Mail" && Mail ==="ko"){
      window.alert("Your not subcribe to the Mail service");
    } 
    else if (this.state.action === "Movie" && Movie === "ko"){
      window.alert("Your not subcribe to the Movie service");
    }
    else if (this.state.action === "OpenWeather" && OpenWeather === "ko"){
      window.alert("Your not subcribe to the OpenWeather service");
    }
    else if (this.state.reaction === "Github" && Github === "ko"){
      window.alert("Your not subcribe to the Github service");
    }
    else if (this.state.action === "Github" && Github === "ko"){
      window.alert("Your not subcribe to the Github service");
    }
    else {
      console.log(action_param);
      console.log(reaction_param);
    console.log(`http://localhost:8080/area/add/${email}/${id_action}/${action_param}/${id_reaction}/${reaction_param}`);
   axios.post(`http://localhost:8080/area/add/${email}/${id_action}/${action_param}/${id_reaction}/${reaction_param}`)
    .then(data => {
      console.log(data);
    })
    .catch(e => console.log(e))
    }

  }

  async handelInfoReaction(e){
    const test = e.target.value;
     await this.setState({textReaction: test});
  }
  async handelInfoAction(e){
    const test = e.target.value;
     await this.setState({textAction: test});
  }

  async handelChangeA(e){
    const name = e.target.value;
    if (name === "Step"){
      await this.setState({actionID: "4"})
    }
    else if (name === "Date"){
      await this.setState({actionID: "1"})
    }
    else if (name === "Time"){
      await this.setState({actionID: "3"})
      console.log(this.state.actionID);
    }
    else if (name === "Day of the week"){
      await this.setState({actionID: "2"})
    }
    else if (name === "Bio has changed"){
      await this.setState({actionID: "11"})
    }
    else if (name === "Company has changed"){
      await this.setState({actionID: "8"})
    }
    else if (name === "Blog has changed"){
      await this.setState({actionID: "7"})
    }
    else if (name === "Location has changed"){
      await this.setState({actionID: "9"})
    }
    else if (name === "Name has changed"){
      await this.setState({actionID: "5"})
    }
    else if (name === "Email has changed"){
      await this.setState({actionID: "6"})
    }
    else if (name === "Hireable status has changed"){
      await this.setState({actionID: "10"})
    }
    else if (name === "Wind Direction"){
      await this.setState({actionID: "17"})
    }
    else if (name === "Humidity"){
      await this.setState({actionID: "15"})
    }
    else if (name === "Temperature"){
      await this.setState({actionID: "13"})
    }
    else if (name === "Pressure"){
      await this.setState({actionID: "14"})
    }
    else if (name === "Wind Speed"){
      await this.setState({actionID: "16"})
    }
    else if (name === "Clouds"){
      await this.setState({actionID: "18"})
    }
    else if (name === "vote count"){
      await this.setState({actionID: "12"})
    }
    else if (name === "release date"){
      await this.setState({actionID: "21"})
    }
    else if (name === "popularity"){
      await this.setState({actionID: "20"})
    }
    else if (name === "vote avarage"){
      await this.setState({actionID: "22"})
    }
    else if (name === "Original Title"){
      await this.setState({actionID: "19"})
    }

  }

  async handelChangeR(e){
    const name = e.target.value;
    if (name === "Change blog"){
      await this.setState({reactionID: "4"})

    }
    else if (name === "Change name"){
      await this.setState({reactionID: "2"})

    }
    else if (name === "Change bio"){
      await this.setState({reactionID: "8"})

    }
    else if (name === "Send a mail"){
      await this.setState({reactionID: "1"})
      console.log(this.state.reactionID);

    }
    else if (name === "Change hireable status"){
      await this.setState({reactionID: "7"})

    }
    else if (name === "Change company"){
      await this.setState({reactionID: "5"})
    }
    else if (name === "Change location"){
      await this.setState({reactionID: "6"})

    }
    else if (name === "Change email"){
      await this.setState({reactionID: "3"})

    }
  }

  async handelChangeAction(e){
    const name = e.target.value;
    if ( name === "Timer"){
      await this.setState({action: name, IDA: "0"})
      this.props.actionarea({action:name});
    }
    else if (name === "Mail"){
      await this.setState({action: name, IDA: "4"})
       this.props.actionarea({action:name});
    }
    else if (name === "Movie"){
      await this.setState({action: name, IDA: "1"})
      this.props.actionarea({action:name});
    }
    else if (name === "OpenWeather"){
      await this.setState({action: name, IDA: "2"})
      this.props.actionarea({action:name});
    }
    else if (name === "Github"){
      await this.setState({action: name, IDA: "3"})
      this.props.actionarea({action:name});
    }
  }
  async handelChangeReaction(e){
    const name = e.target.value;
    if ( name === "Timer"){
      this.setState({reaction: name, IDR: "0"})
      this.props.reactionarea({reaction:name});
    }
    else if (name === "Mail"){
      this.setState({reaction: name, IDR: "4"})
       this.props.reactionarea({reaction:name});
    }
    else if (name === "Movie"){
      this.setState({reaction: name,IDR: "1"})
      this.props.reactionarea({reaction:name});
    }
    else if (name === "OpenWeather"){
      this.setState({reaction: name, IDR: "2"})
      this.props.reactionarea({reaction:name});
    }
    else if (name === "Github"){
      this.setState({reaction: name, IDR: "3"})
      this.props.reactionarea({reaction:name});
    }
  }
  render() {
    
  
    const handleClose = () => this.setState({show:false});
    const handleShow = () => this.setState({show: true});

    return (
        <React.Fragment>
        <Button variant="outline-info" onClick={handleShow}>
          <h3>Create Area</h3>
        </Button>
  
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{marginTop:"0px"}}>
              <Form.Group condrol="exemple">
                <Form.Label>Choose Service action </Form.Label>
                <Form.Control style={{width:"200px"}} as="select" onChange={this.handelChangeAction}>
                {this.props.info && this.props.info.data.services.map(({name}) => (<option selected value={name}>{name}</option> ))}
                </Form.Control>
                <Form.Control style={{width:"200px"}} as="select" onChange={this.handelChangeA}>
                {this.props.info && this.props.info.data.services[this.state.IDA].actions.map(({name}) => (<option selected value={name}>{name}</option> ))}
                </Form.Control>
                <Form.Control type="text" placeholder="Normal text"  value={this.textAction} onChange={this.handelInfoAction}/>
              </Form.Group>
            </Form>
            <Form style={{marginTop:"0px"}}>
              <Form.Group condrol="exemple">
                <Form.Label>Choose service Reaction </Form.Label>
                <Form.Control style={{width:"200px"}} as="select" onChange={this.handelChangeReaction}>
                {this.props.info && this.props.info.data.services.map(({name}) => (<option selected value={name}>{name}</option>))}
                </Form.Control>
                <Form.Control style={{width:"200px"}} as="select" onChange={this.handelChangeR}>
                {this.props.info && this.props.info.data.services[this.state.IDR].reactions.map(({name}) => (<option selected value={name}>{name}</option> ))}
                </Form.Control>
                <Form.Control type="text" placeholder="info" onChange={this.handelInfoReaction} value={this.textReaction}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" onClick={this.sendArea}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </React.Fragment>
    );
  }
}

export default Test;
//{this.state.user ? ( <Home mail={this.state.mail} updateUser={this.updateUser}/>) : (<Login  updateUser={this.updateUser}  updatemail={this.updatemail}/>)}
