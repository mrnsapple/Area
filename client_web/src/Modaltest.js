import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Toast, Col, Container} from 'react-bootstrap';

function Example(props) {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    
    //<Actionmodal></Actionmodal>
  
    return (
    <Container >
        <Row>
            <br>
            </br>
        </Row>
        <Row>
            <Col style={{ display:'flex' }} md={6}>
                <Button onClick={toggleShowA}> Display {props.name} service</Button>
            </Col>
        </Row>
        {
            showA && (
                <Row>
            <Col>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
                        <strong className="mr-auto">Description</strong>
                        <small>{props.name}</small>
                    </Toast.Header>
                    <Toast.Body style={{ height:'250px', overflowY:'scroll'}}>{
                        props.test &&
                        props.test.data.services[props.id].description
                        }</Toast.Body>
                </Toast>
            </Col>
            <Col>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
                        <strong className="mr-auto">Action</strong>
                        <small>{props.name}</small>
                    </Toast.Header>
                    <Toast.Body style={{ height:'250px', overflowY:'scroll'}}>{
                        props.test &&
                        props.test.data.services[props.id].actions.map(({name,description}) => (
                            <div>
                                <p>{name}:{description}</p>
                            </div>
                           
                        ))
                        }
                        </Toast.Body>
                </Toast>
            </Col>
            <Col>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
                        <strong className="mr-auto">Reaction</strong>
                        <small>{props.name}</small>
                    </Toast.Header>
                    <Toast.Body style={{ height:'250px', overflowY:'scroll'}}>
                    {
                        props.test &&
                        props.test.data.services[props.id].reactions.map(({name,description}) => (
                            <div>
                                <p>{name}:{description}</p>
                            </div>
                           
                        ))
                        }
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
            )
        }
        
      </Container>
    );
  }
  


export default Example;