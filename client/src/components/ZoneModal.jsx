import React from "react";
import { Button, Modal } from "react-bootstrap";
import {
  deckToHand,
  discardToHand,
  discardEnergyFromActive,
  discardEnergyFromBench,
  handToDiscard,
} from "../utils/changeZones";

export default function ZoneModal({
  show,
  handleClose,
  zone,
  numTargets,
  cards,
  action,
  index,
  selectedIndex,
  setSelectedIndex,
  setSelected,
  setUsesTargeting,
  multiSelect,
  setMultiSelect,
  setSecondaryAction,
  deck,
  setDeck,
  hand,
  setHand,
  active,
  setActive,
  bench,
  setBench,
  discard,
  setDiscard,
  prizes,
  socket,
}) {
  const isValidTarget = (action, name) => {
    if (action.includes("energy") && !name.includes("Energy")) return false;

    return true;
  };

  const handleClickCard = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    if (
      !isValidTarget(action, cards[index].name) ||
      !action ||
      multiSelect.includes(index)
    )
      return;

    document.getElementById(e.target.id).style = "border: 5px solid green";
    let newMultiSelect = [...multiSelect, index];
    setMultiSelect(newMultiSelect);
  };

  React.useEffect(() => {
    if (multiSelect.length !== numTargets) return;

    if (action === "discard then search deck") {
      const [newHand, newDiscard] = handToDiscard(
        multiSelect,
        hand,
        setHand,
        discard,
        setDiscard
      );
      setSecondaryAction("search deck");

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active,
        bench,
        discard: newDiscard,
        prizes,
      });
    }

    if (action === "search deck") {
      const [newDeck, newHand] = deckToHand(
        multiSelect,
        deck,
        setDeck,
        hand,
        setHand
      );

      socket.emit("played-card", {
        deck: newDeck,
        hand: newHand,
        active,
        bench,
        discard,
        prizes,
      });
    }

    if (action === "discard energy from active") {
      const [newActive, newDiscard] = discardEnergyFromActive(
        multiSelect,
        active,
        setActive,
        discard,
        setDiscard
      );
      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench,
        discard: newDiscard,
        prizes,
      });
    }

    if (action === "discard energy from bench") {
      const [newBench, newDiscard] = discardEnergyFromBench(
        multiSelect,
        bench,
        index,
        setBench,
        discard,
        setDiscard
      );

      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench: newBench,
        discard: newDiscard,
        prizes,
      });
    }

    if (action === "energy from discard to hand") {
      const [newHand, newDiscard] = discardToHand(
        multiSelect,
        hand,
        setHand,
        discard,
        setDiscard
      );

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active,
        bench,
        discard: newDiscard,
        prizes,
      });
    }

    if (action === "make opponent discard energy from active") {
      socket.emit("forced-energy-discard-active", multiSelect);
    }

    if (action === "make opponent discard energy from bench") {
      socket.emit("forced-energy-discard-bench", multiSelect, index);
    }

    setSelected(null);
    setSelectedIndex(null);
    setUsesTargeting(false);
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
