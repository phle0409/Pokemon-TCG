import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import EnergyCost from "./EnergyCost.jsx";

export default function AttackModal({ show, handleClose, selected }) {
  if (!selected)
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>No Pokemon selected</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{selected.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="d-flex flex-column">
          {selected.attacks.map((attack) => {
            const { name, cost, text, damage } = attack;
            return (
              <Row className="mt-2" key={name}>
                <Col xs={2}>
                  <EnergyCost energies={cost} />
                </Col>
                <Col xs={7}>
                  <span className="fw-bold d-block mx-4">{name}</span>
                  <span className="d-block mx-4">{text}</span>
                </Col>
                <Col xs={1}>
                  <span className="fw-bold d-block">{damage}</span>
                </Col>
                <Col xs={2} className="d-flex flex-column">
                  <Button variant="info">Select</Button>
                </Col>
              </Row>
            );
          })}
          <Row className="mt-2">
            <Col xs={2}>
              <EnergyCost energies={selected.retreatCost} />
            </Col>
            <Col xs={8}>
              <span className="fw-bold d-block mx-4">Retreat</span>
              <span className="fst-italic d-block mx-4">
                (You must discard energy in order to retreat.)
              </span>
            </Col>
            <Col xs={2} className="d-flex flex-column">
              <Button variant="warning">Select</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col xs={10}></Col>
            <Col xs={2} className="d-flex flex-column">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}
