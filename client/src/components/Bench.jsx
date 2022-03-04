import React from "react";
import EnergyCost from "./EnergyCost.jsx";

export default function Bench({
  hand,
  active,
  setActive,
  bench,
  deck,
  prizes,
  discard,
  setBench,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  setUsesTargeting,
  forcedAction, 
  setForcedAction,
  socket,
  yourName
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");

    if(forcedAction === "switch") {
      let newActive = bench[index];
      setActive(newActive);
      bench.splice(index, 1);
      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
      socket.emit("toast", `${yourName} sent out ${newActive.name}!`);

      setForcedAction("");
      return;
    }

    if (!selected) {
      const selectedPkmn = bench[index];
      console.log(selectedPkmn);
      setSelected(selectedPkmn);
      setSelectedIndex(index);
      setUsesTargeting(false);
    } else {
      if (selected.supertype.includes("Energy")) {
        socket.emit("toast", `${yourName} attached ${selected.name} to ${bench[index].name}`);
        bench[index].effects.attachments.push(selected);
        bench[index].effects.energy.push(selected.name.replace(" Energy", ""));
        hand.splice(selectedIndex, 1);
        setSelected(null);
        setSelectedIndex(null);
        socket.emit("played-card", {
          deck,
          hand,
          active,
          bench,
          prizes,
          discard,
        });
      } else if (
        (selected.subtypes?.includes("Stage 1") ||
          selected.subtypes?.includes("Stage 2")) &&
        selected.evolvesFrom === bench[index].name
      ) {
        socket.emit("toast", `${yourName} evolved ${bench[index].name} into ${selected.name}!`);
        selected.effects.attachments = bench[index].effects.attachments;
        bench[index].effects.attachments = [];
        selected.effects.energy = bench[index].effects.energy;
        bench[index].effects.energy = [];
        selected.effects.attachments.push(bench[index]);
        hand.splice(selectedIndex, 1);
        bench.splice(index, 1);
        bench.splice(index, 1);
        let newBench = [...bench, selected];
        setBench(newBench);
        setSelected(null);
        setSelectedIndex(null);
        setUsesTargeting(false);
        socket.emit("played-card", {
          deck,
          hand,
          active,
          bench: newBench,
          prizes,
          discard,
        });
      }
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {bench.length > 0 ? (
        bench.map((card, index) => {
          return (
            <div
              className="d-flex flex-row mx-2 border border rounded"
              style={{ width: "auto", height: "6.125rem" }}
            >
              <img
                className="pkmn-card table-card"
                src={card.image}
                key={`bench-${index}`}
                id={`${card.name}-${card.set.name}-bench-${index}`}
                onClick={handleClick}
              />
              <div className="d-flex flex-column" style={{ width: "7rem" }}>
                <div className="d-flex align-items-center justify-content-center">{`${
                  card.hp - card.effects.damage
                }/${card.hp} HP`}</div>
                <EnergyCost energies={card.effects.energy} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
