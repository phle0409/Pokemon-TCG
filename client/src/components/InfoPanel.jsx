import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { isTargetedItem } from "../utils/itemMap.js";
import {
  handToActive,
  handToBench,
  handToDiscard,
} from "../utils/changeZones.js";

export default function InfoPanel({
  selected,
  selectedIndex,
  setSelected,
  setSelectedIndex,
  usesTargeting,
  setUsesTargeting,
  retreat,
  deck,
  setDeck,
  hand,
  setHand,
  active,
  setActive,
  bench,
  setBench,
  prizes,
  discard,
  setDiscard,
  yourName,
  setToast,
  socket,
  setZoneModal,
}) {
  const [action, setAction] = React.useState("");
  const [infoText, setInfoText] = React.useState("");

  const handleClick = () => {
    if (action === "toActive") {
      const [newActive, newHand] = handToActive(
        hand,
        selectedIndex,
        setHand,
        setActive
      );

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active: newActive,
        bench,
        prizes,
        discard,
      });

      socket.emit("toast", `${yourName} sent out ${newActive.name}!`);
    } else if (action === "toBench") {
      const [newHand, newBench] = handToBench(
        hand,
        selectedIndex,
        setHand,
        bench,
        setBench
      );

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active,
        bench: newBench,
        prizes,
        discard,
      });

      socket.emit("toast", `${yourName} played ${selected.name} to bench`);
    } else if (action === "item") {
      let trainerPlayed = false;

      if (selected.name === "Bill") {
        let cards = deck.draw(2);
        let newHand = [...hand, ...cards];
        setHand(newHand);
        trainerPlayed = true;
      } else if (selected.name === "Professor Oak") {
        setDiscard([...discard, ...hand]);
        let newHand = deck.draw(7);
        setHand(newHand);
      } else if (selected.name === "Lass") {
        const [newHand, newDiscard] = handToDiscard(
          [selectedIndex],
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
        socket.emit("toast", `${yourName} played ${selected.name}`);
        setTimeout(() => socket.emit("lass", hand), 2000);
      } else if (selected.name === "Computer Search") {
        if (hand.length < 2) {
          setToast({
            show: true,
            text: "You need at least 2 cards in your hand to play Computer Search",
          });
        } else {
          setZoneModal({
            show: true,
            zone: "Select two cards from your hand to discard",
            numTargets: 2,
            cards: hand,
            action: "discard then search deck",
          });
          trainerPlayed = true;
        }
      } else if (selected.name === "Energy Retrieval") {
        let energiesInDiscard = 0;

        for (const card of discard) {
          if (energiesInDiscard >= 2) break;
          if (card.supertype.includes("Energy")) ++energiesInDiscard;
        }

        if (energiesInDiscard < 2) {
          setToast({
            show: true,
            text: "You need at least 2 energies in your discard pile to play Energy Retrieval",
          });
        } else {
          setZoneModal({
            show: true,
            zone: "Select 2 energy cards from discard",
            numTargets: 2,
            cards: discard,
            action: "energy from discard to hand",
          });
          trainerPlayed = true;
        }
      }

      if (trainerPlayed) {
        const [newHand, newDiscard] = handToDiscard(
          [selectedIndex],
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
          prizes,
          discard: newDiscard,
        });
      }
    }

    setSelected(null);
    setSelectedIndex(null);
    setUsesTargeting(false); 
  };

  React.useEffect(() => {
    if (!selected) return;

    const { name, supertype, subtypes, evolvesFrom } = selected;
    if (
      supertype.includes("Pokémon") &&
      subtypes?.includes("Basic") &&
      !active
    ) {
      setInfoText(`Play ${name} to active?`);
      setAction("toActive");
      setUsesTargeting(false);
    } else if (
      supertype.includes("Pokémon") &&
      subtypes?.includes("Basic") &&
      bench.length < 5
    ) {
      setInfoText(`Play ${name} to bench?`);
      setAction("toBench");
      setUsesTargeting(false);
    } else if (
      (supertype.includes("Pokémon") && subtypes?.includes("Stage 1")) ||
      subtypes?.includes("Stage 2")
    ) {
      setInfoText(
        `Select a ${evolvesFrom} on your active or bench to evolve into ${name}`
      );
      setUsesTargeting(true);
    } else if (supertype.includes("Energy")) {
      setInfoText(`Attach ${name} to a Pokémon on your active or bench`);
      setUsesTargeting(true);
    } else if (supertype.includes("Trainer")) {
      if (isTargetedItem(name)) {
        setInfoText(`Select a target for ${name}`);
        setUsesTargeting(true);
      } else {
        setInfoText(`Play ${name}?`);
        setAction("item");
        setUsesTargeting(false);
      }
    }
  }, [selected, selectedIndex, setSelected, setSelectedIndex]);

  if (!selected || (selected === active && !retreat)) return <div></div>;

  //TODO add infoText when forced to retreat

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="mb-4 text-center">
        <strong>{infoText}</strong>
      </div>
      <ButtonGroup>
        {!usesTargeting ? <Button onClick={handleClick}>Confirm</Button> : ""}
        <Button
          variant="secondary"
          onClick={() => {
            setSelected(null);
            setSelectedIndex(null);
            setUsesTargeting(false);
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
}
