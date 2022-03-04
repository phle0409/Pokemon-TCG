import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { isTargetedItem, itemMap } from "../utils/itemMap.js";

export default function InfoPanel({
  selected,
  selectedIndex,
  setSelected,
  setSelectedIndex,
  usesTargeting,
  setUsesTargeting,
  deck,
  hand,
  setHand,
  active,
  setActive,
  bench,
  setBench,
  prizes,
  discard,
  socket,
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
    }
    else if(action === "item") {
      itemMap(selected.name, deck, hand, setHand);
      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench,
        prizes,
        discard,
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
  }, [selected]);

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
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
}
