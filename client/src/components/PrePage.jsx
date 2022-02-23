import React from 'react';
import '../styles/prepage.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const PrePage = () => {
  return (
    <Container className="my-4 justify-content-center ">
      <Row
        style={{ maxWidth: '80%', marginLeft: '90px', marginRight: '70px' }}
        className="border border-dark bg-light"
      >
        <div>
          <h1 className="text-center text-info py-2 ">
            <img
              className="img-fluid"
              src={require('../images/how_to_play/Snorlax.ico')}
              width="60px"
              alt="dragon"
            />
            Pokémon TCG
            <img
              className="img-fluid"
              src={require('../images/how_to_play/Leafeon.ico')}
              width="60px"
              alt="dragon"
            />
          </h1>
        </div>

        <Col className="border border-dark bg-light my-3 mx-3 text-center">
          <h3 className="text-center mt-1">Select Desk</h3>
          <Row>
            <Col className="border border-dark bg-light mx-2 my-2">
              <img
                className="img-fluid"
                src={require('../images/how_to_play/Brushfire_Deck.jpeg')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
            <Col className="border border-dark bg-light mx-2 my-2">
              <img
                className="img-fluid"
                src={require('../images/how_to_play/Blackout_Deck.jpeg')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
          </Row>
          <Row>
            <Col className="border border-dark bg-light mx-2 my-2">
              <img
                className="img-fluid"
                src={require('../images/how_to_play/Overgrowth_Deck.jpeg')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
            <Col className="border border-dark bg-light mx-2 my-2">
              <img
                className="img-fluid"
                src={require('../images/how_to_play/Zap_Deck.jpeg')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Form className=" my-3 mx-3">
            <div>
              <Form.Group className="my-3 " controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="e.g. Doug" />
              </Form.Group>

              <Form.Select aria-label="Default select example">
                <option>Choose Room</option>
                <option value="1">Red</option>
                <option value="2">Lucas</option>
                <option value="3">Ethan</option>
              </Form.Select>
            </div>
            <div className="text-center my-3">
              <Button
                className="btn btn-primary btn-lg button-center"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PrePage;
