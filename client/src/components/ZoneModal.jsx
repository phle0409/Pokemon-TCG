import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ZoneModal({
  show,
  handleClose,
  zone,
  numTargets,
  cards,
}) {
  if (!cards)
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
        <Modal.Body>No Pokemon in {zone}</Modal.Body>
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
      <Modal.Header>
        <Modal.Title>{zone}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cards.map((card, index) => {
          return (
            <img
              className="m-1 pkmn-card table-card"
              key={`${zone}-${index}`}
              id={`${card.name}-${card.set.name}-${zone}-${index}`}
              src={card.image}
            />
          );
        })}
      </Modal.Body>
      {numTargets === 0 && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
