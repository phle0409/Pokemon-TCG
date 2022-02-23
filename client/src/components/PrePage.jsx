import React from 'react';
import '../styles/prepage.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const PrePage = () => {
  return (
    <Container className="my-5">
      <Row
        style={{ maxWidth: '80%', marginLeft: '70px', marginRight: '70px' }}
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

        <Col className="border border-dark bg-light my-3 mx-3">
          <div> Test Select</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            reiciendis hic asperiores ex, adipisci harum animi quod, libero
            accusamus labore perferendis quas voluptatum provident beatae
            quibusdam autem quos ratione eligendi, minus placeat aut molestiae
            illum tempora. Rerum autem ducimus, optio ipsum at iste libero
            labore voluptate modi, aliquam fugit, repellendus ea! Ratione
            asperiores harum fugit nulla consectetur quidem, optio velit rem ea
            repellat ad fuga, ullam sequi dolores ipsum eveniet nobis a iusto
            eaque, exercitationem reiciendis corrupti? Consectetur unde labore
            ullam incidunt quia reiciendis doloremque cum impedit ea cupiditate
            explicabo dicta, dolorum possimus repellat voluptates aliquid velit?
            Itaque, eos libero.
          </p>
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
