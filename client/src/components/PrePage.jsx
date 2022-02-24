import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const PrePage = () => {
  const [isMissing, setIsMissing] = useState(false);
  let selectedDesk = '';

  const handleClick = (deskName) => {
    selectedDesk = deskName;
    const desk = document.querySelector(`#pre-desk-${deskName}`);
    const preDesksBackground = document.querySelectorAll('.pre-desk');

    preDesksBackground.forEach((desk) => {
      desk.style.backgroundColor = '#ffffff';
    });
    desk.style.backgroundColor = '#a6f2ff';
  };

  const handleMouseEnter = (deskName) => {
    const desk = document.querySelector(`#pre-desk-${deskName}`);
    if (desk.style.backgroundColor !== 'rgb(166, 242, 255)') {
      desk.style.backgroundColor = '#f2d2bd';
    }
  };
  const handleMouseLeave = (deskName) => {
    const desk = document.querySelector(`#pre-desk-${deskName}`);
    if (desk.style.backgroundColor !== 'rgb(166, 242, 255)') {
      desk.style.backgroundColor = '#ffffff';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector('#username');
    const roomName = document.querySelector('#roomName').value;

    console.log(roomName);
    console.log(name.value);
    console.log(selectedDesk);
    if (
      !selectedDesk ||
      !name ||
      name.value === '' ||
      roomName === 'Choose Room'
    ) {
      setIsMissing(true);
    } else {
      setIsMissing(false);
    }
  };

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

        <Col className="border border-dark bg-white my-3 mx-3 text-center">
          <h3 className="text-center mt-1">Select Desk</h3>
          <Row>
            <Col
              onClick={(e) => handleClick('brush')}
              onMouseEnter={(e) => handleMouseEnter('brush')}
              onMouseLeave={(e) => handleMouseLeave('brush')}
              className="border border-dark mx-2 my-2 pre-desk "
              id="pre-desk-brush"
            >
              <img
                className="img-fluid my-2"
                src={require('../images/how_to_play/brushfire.png')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
            <Col
              onClick={(e) => handleClick('black')}
              onMouseEnter={(e) => handleMouseEnter('black')}
              onMouseLeave={(e) => handleMouseLeave('black')}
              className="border border-dark mx-2 my-2 pre-desk"
              id="pre-desk-black"
            >
              <img
                className="img-fluid my-2"
                src={require('../images/how_to_play/blackout.png')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
          </Row>
          <Row>
            <Col
              onClick={(e) => handleClick('overgrowth')}
              onMouseEnter={(e) => handleMouseEnter('overgrowth')}
              onMouseLeave={(e) => handleMouseLeave('overgrowth')}
              className="border border-dark mx-2 my-2 pre-desk"
              id="pre-desk-overgrowth"
            >
              <img
                className="img-fluid my-2"
                src={require('../images/how_to_play/overgrowth.png')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
            <Col
              onClick={(e) => handleClick('zap')}
              onMouseEnter={(e) => handleMouseEnter('zap')}
              onMouseLeave={(e) => handleMouseLeave('zap')}
              className="border border-dark mx-2 my-2 pre-desk"
              id="pre-desk-zap"
            >
              <img
                className="img-fluid my-2"
                src={require('../images/how_to_play/zap.png')}
                width="150px"
                alt="Brushfire_Deck"
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit} className=" my-3 mx-3">
            <div>
              <Form.Group className="my-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="e.g. Doug" />
              </Form.Group>

              <Form.Select aria-label="Default select example" id="roomName">
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
          {isMissing && (
            <div className="text-danger text-center">
              Please select a desk, room name and provide username
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PrePage;
