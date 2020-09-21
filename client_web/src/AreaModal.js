import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Toast, Col, Container} from 'react-bootstrap';

 function Example(props) {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    return (
    <Container >
        <Row>
            <br>
            </br>
        </Row>
        <Row>
        <Col style={{ display:'flex' }} md={6}>
                <Button variant="outline-info" onClick={toggleShowA}> Display Area</Button>
            </Col>
        </Row>
        {
            showA && (
                <Row>
            <Col>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
                        <strong className="mr-auto">AREA</strong>
                        <small>AREA</small>
                    </Toast.Header>
                    <Toast.Body style={{ height:'250px', overflowY:'scroll'}}>
                       {props.areaa}</Toast.Body>
                </Toast>
            </Col>
        </Row>
            )
        }
        
      </Container>
    );
  }
  


export default Example;