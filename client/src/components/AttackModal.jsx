import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import EnergyCost from "./EnergyCost.jsx";
import { skillCalculate } from "../utils/skills/skills";

export default function AttackModal({
  show,
  handleClose,
  selected,
  socket,
  setDamage,
  setRetreat,
  setSelected,
  setSelectedIndex,
  setUsesTargeting,
  setHeal,
  setToast,
  setEffect,
  setZoneModal,
  setEndPhrase,
  disableAttack,
  disablePass,
  opponentActive,
}) {
  const canUseSkill = (costs, energies) => {
    let colorless = 0;
    let isEnoughEnergy = true;
    let result = false;
    for (let cost of costs) {
      if (cost === "Colorless") {
        colorless++;
      } else {
        const index = energies.findIndex((energy) => energy === cost);
        if (index === -1) {
          isEnoughEnergy = false;
          break;
        } else {
          energies.splice(index, 1);
        }
      }
    }
    if (isEnoughEnergy) {
      if (colorless === 0) {
        result = true;
      } else if (colorless <= energies.length) {
        energies.splice(0, colorless);
        result = true;
      }
    }
    return result;
  };

  const attackButton = (event) => {
    const [name, damage, cost] = event.target.id.split("#");
    const costArray = cost.split(",");
    const energyForCheckSkill = [...selected.effects.energy];
    if (!disableAttack && canUseSkill(costArray, energyForCheckSkill)) {
      let [actualDamage, effectSkill] = skillCalculate(
        name,
        damage,
        selected,
        setDamage,
        setHeal,
        setEffect,
        setZoneModal
      );
      let superEffective = false;
      let notVeryEffective = false;
      if (selected.types[0] === opponentActive.weaknesses[0].type) {
        superEffective = true;
        actualDamage *= 2;
      }
      if (
        opponentActive.resistances &&
        selected.types[0] === opponentActive.resistances[0].type
      ) {
        notVeryEffective = true;
        actualDamage -= parseInt(30);
      }
      if (
        selected.effects.attachments.find((attachment) => {
          return attachment.name === "PlusPower";
        })
      ) {
        actualDamage += parseInt(10);
      }
      if (opponentActive.effects.attachments.includes("Defender")) {
        actualDamage -= parseInt(20);
        //TODO detach defender
      }

      socket.emit(
        "toast",
        `${selected.name} used ${name}! ${
          superEffective ? "It's super effective!" : ""
        } ${notVeryEffective ? "It's not very effective..." : ""}`
      );
      setTimeout(() => socket.emit("attack", { actualDamage, effectSkill }), 2000);
      setEndPhrase(true);
    } else {
      if (disableAttack) {
        setToast({ show: true, text: `You cannot attack on your first turn` });
      } else
        setToast({
          show: true,
          text: `You don't have enough energy to use ${name}`,
        });
    }

    handleClose();
  };

  const retreatButton = () => {
    //TODO force discard energy

    /*
      const { retreatCost, effects } = selected;

      if(effects.energy.length < retreatCost.length) {
        setToast({
          show: true, 
          text: "You do not have enough energy to retreat"
        })
        return;
      }

      setZoneModal({
        show: true,
        zone: `Choose ${retreatCost.length} energy to discard`
        numTargets: retreatCost.length,
        cards: effects.attachments
        action: "discard energy from active"
      })
    */
    if (selected.effects.energy.length > 0) {
      selected.effects.energy.splice(selected.effects.energy.length - 1, 1);
      setSelected(null);
      setSelectedIndex(null);
      setUsesTargeting(false);
      setRetreat(true);
    } else {
      setToast({ show: true, text: `Cannot use retreat` });
    }

    handleClose();
  };

  const passButton = () => {
    if (disablePass) {
      setToast({ show: true, text: `Cannot Pass when it's not your turn.` });
    } else {
      setToast({ show: true, text: "Player has ended turn." });
      setEndPhrase(true);
    }

    handleClose();
  };

  if (!selected || selected.supertype !== "Pokémon")
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
        <Container className="px-3">
          {selected.attacks.map((attack, index) => {
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
                <Col xs={2}>
                  <Button
                    variant="success"
                    id={`${name}#${damage}#${cost}`}
                    onClick={attackButton}
                  >
                    Select
                  </Button>
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
            <Col xs={2}>
              <Button variant="warning" onClick={retreatButton}>
                Select
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={passButton}>
          Pass
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
