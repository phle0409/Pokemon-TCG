import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deckToHand, handToDiscard, discardToHand } from "../utils/changeZones";

export default function ZoneModal({
  show,
  handleClose,
  zone,
  numTargets,
  cards,
  action,
  multiSelect,
  setMultiSelect,
  setSecondaryAction,
  deck,
  setDeck,
  hand,
  setHand,
  discard,
  setDiscard,
}) {
  const handleClickCard = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    if (!action || multiSelect.includes(index)) return;

    if (action === "energy retrieval" && !cards[index].name.includes("Energy"))
      return;

    document.getElementById(e.target.id).style = "border: 5px solid green";
    let newMultiSelect = [...multiSelect, index];
    setMultiSelect(newMultiSelect);
  };

  React.useEffect(() => {
    if (multiSelect.length !== numTargets) return;

    if (action === "discard then search deck") {
      handToDiscard(multiSelect, hand, setHand, discard, setDiscard);
      setSecondaryAction("search deck");
    }

    if (action === "search deck") {
      deckToHand(multiSelect, deck, setDeck, hand, setHand);
    }

    if (action === "energy retrieval") {
      discardToHand(multiSelect, discard, setDiscard, hand, setHand);
    }

    setMultiSelect([]);

    handleClose();
  }, [multiSelect.length]);

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
        <Modal.Body>{zone}</Modal.Body>
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
        {cards?.map((card, index) => {
          return (
            <img
              className={`m-1 pkmn-card table-card`}
              key={`modal-${index}`}
              id={`${card.name}-${card.set.name}-modal-${index}`}
              src={card.image}
              onClick={handleClickCard}
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
