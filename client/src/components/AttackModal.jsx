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
        size="lg"
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
    >
      <Modal.Header closeButton>
        <Modal.Title>{selected.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {selected.attacks.map((attack) => {
            const { name, cost, text, damage } = attack;

            return (
              <Row className="mt-2" key={name}>
                <Col md={2}>
                  <EnergyCost energies={cost} />
                </Col>
                <Col md={6}>
                  <span className="fw-bold d-block">{name}</span>
                  <span className="d-block">{text}</span>
                </Col>
                <Col md={2}>
                  <span className="fw-bold d-block">{damage}</span>
                </Col>
                <Col md={2}>
                  <Button>Select</Button>
                </Col>
              </Row>
            );
          })}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
