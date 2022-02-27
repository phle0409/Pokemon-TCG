import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export default function InfoPanel({
  selected,
  selectedIndex,
  setSelected,
  deck,
  hand,
  active,
  setActive,
  bench,
  setBench,
  prizes,
  discard,
  socket,
}) {
  const [action, setAction] = React.useState("");
  const [targeted, setTargeted] = React.useState(false);
  const [infoText, setInfoText] = React.useState("");

  const handleClick = () => {
    if (action === "toActive") {
      setActive(selected);
      hand.splice(selectedIndex, 1);
      setSelected(null);
      socket.emit("played-card", {
        deck,
        hand,
        active: selected,
        bench,
        prizes,
        discard,
      });
    } else if (action === "toBench") {
      let newBench = [...bench, selected];
      setBench(newBench);
      hand.splice(selectedIndex, 1);
      setSelected(null);
      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench: newBench,
        prizes,
        discard,
      });
    }
  };

  React.useEffect(() => {
    if (!selected) return;
    const { name, supertype, subtypes, evolvesFrom } = selected;

    if (
      supertype.includes("Pokémon") &&
      subtypes.includes("Basic") &&
      !active
    ) {
      setInfoText(`Play ${name} to active?`);
      setTargeted(false);
      setAction("toActive");
    } else if (
      supertype.includes("Pokémon") &&
      subtypes.includes("Basic") &&
      bench.length < 5
    ) {
      setInfoText(`Play ${name} to bench?`);
      setTargeted(false);
      setAction("toBench");
    } else if (
      (supertype.includes("Pokémon") && subtypes.includes("Stage 1")) ||
      (supertype.includes("Pokémon") && subtypes.includes("Stage 2"))
    ) {
      setInfoText(
        `Select a ${evolvesFrom} on your active or bench to evolve into ${name}`
      );
      setTargeted(true);
      setAction("evolve");
    } else if (supertype.includes("Energy")) {
      setInfoText(`Attach ${name} to a Pokémon on your active or bench`);
      setTargeted(true);
    } else if (supertype.includes("Trainer")) {
      setInfoText(`Play ${name}?`);
      setTargeted(false);
    }
  }, [selected]);

  if (!selected || selected === active) return <div></div>;

  // if (
  //     selectedPkmn.supertype.includes("Pokémon") &&
  //     selectedPkmn.subtypes.includes("Basic")
  //   ) {
  //     hand.splice(index, 1);
  //     let newBench = null;
  //     if (!active) {
  //       setActive(selectedPkmn);
  //       socket.emit("played-card", {
  //         deck,
  //         hand,
  //         active: selectedPkmn,
  //         bench,
  //         prizes,
  //         discard,
  //       });
  //     } else if (bench.length < 5) {
  //       let newBench = [...bench, selectedPkmn];
  //       setBench(newBench);
  //       socket.emit("played-card", {
  //         deck,
  //         hand,
  //         active,
  //         bench: newBench,
  //         prizes,
  //         discard,
  //       });
  //     }
  //   }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="mb-4 text-center">
        <strong>{infoText}</strong>
      </div>
      <ButtonGroup>
        {!targeted ? <Button onClick={handleClick}>Confirm</Button> : ""}
        <Button variant="secondary" onClick={() => setSelected(null)}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
}
