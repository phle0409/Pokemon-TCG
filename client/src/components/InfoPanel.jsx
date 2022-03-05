import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { isTargetedItem, nonTargetedItems } from "../utils/itemMap.js";

export default function InfoPanel({
  selected,
  selectedIndex,
  setSelected,
  setSelectedIndex,
  usesTargeting,
  setUsesTargeting,
  setForcedAction,
  deck,
  setDeck,
  hand,
  setHand,
  opponentDeck,
  setOpponentDeck,
  opponentHand,
  setOpponentHand,
  active,
  setActive,
  bench,
  setBench,
  prizes,
  discard,
  setDiscard,
  yourName,
  socket,
  setZoneModal,
}) {
  const [action, setAction] = React.useState("");
  const [infoText, setInfoText] = React.useState("");

  const handleClick = () => {
    if (action === "toActive") {
      let newActive = selected;
      setActive(newActive);
      hand.splice(selectedIndex, 1);
      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
      socket.emit("toast", `${yourName} sent out ${newActive.name}!`);
    } else if (action === "toBench") {
      let newBench = [...bench, selected];
      setBench(newBench);
      hand.splice(selectedIndex, 1);
      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench: newBench,
        prizes,
        discard,
      });
      socket.emit("toast", `${yourName} played ${selected.name} to bench`);
    } else if (action === "item") {
      socket.emit("toast", `${yourName} played ${selected.name}`);
      let newDiscard = [...discard, hand[selectedIndex]];
      setDiscard(newDiscard);
      hand.splice(selectedIndex, 1);
      let newHand = hand;

      if(selected.name === "Bill") {
        let cards = deck.draw(2);
        newHand = [...hand, ...cards];
        setHand(newHand);
      }
      else if(selected.name === "Professor Oak") {
        newDiscard = [...discard, ...hand];
        setDiscard(newDiscard);
        newHand = deck.draw(7);
        setHand(newHand);
      }
      else if(selected.name === "Lass") {
        setZoneModal({
          show: true,
          text: "Your opponent's hand",
          numTargets: 0,
          cards: opponentHand
        })

        let cards = [];
        hand.forEach((card, i) => {
          if(card.supertype === "Trainer") {
            cards.push(card);
            hand.splice(i, 1);
          }
        });

        deck.putBack(cards);
        deck.shuffle();

        //TODO make it affect opponent
      }
      else if(selected.name === "Computer Search") {
        setZoneModal({
          show: true,
          zone: "Select two cards from your hand to discard",
          numTargets: 2,
          cards: hand,
          action: "discard then search deck"
        })
      }

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active,
        bench,
        prizes,
        discard: newDiscard,
      });
    }

    setSelected(null);
    setSelectedIndex(null);
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

  if (!selected || selected === active) return <div></div>;

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
            setForcedAction("");
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
}
