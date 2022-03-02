import React from "react";
import EnergyCost from "./EnergyCost.jsx";

export default function Bench({
  hand,
  active,
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
  socket
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    if (!selected) {
      const selectedPkmn = bench[index];
      console.log(selectedPkmn);
      setSelected(selectedPkmn);
      setSelectedIndex(index);
      setUsesTargeting(false);
    } else {
      if (selected.supertype.includes("Energy")) {
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
        selected.effects.attachments = bench[index].effects.attachments;
        bench[index].effects.attachments = [];
        selected.effects.energy = bench[index].effects.energy;
        bench[index].effects.energy = [];
        selected.effects.attachments.push(bench[index]);
        hand.splice(selectedIndex, 1);
        let newBench = bench.splice(index, 1);
        let newerBench = [...newBench, selected];
        setBench(newerBench);
        setSelected(null);
        setSelectedIndex(null);
        setUsesTargeting(false);
        socket.emit("played-card", {
          deck,
          hand,
          active,
          bench: newerBench,
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
            <div className="d-flex flex-row mx-2 border border rounded">
              <img
                className="pkmn-card table-card"
                src={card.image}
                key={`bench-${index}`}
                id={`${card.name}-${card.set.name}-bench-${index}`}
                onClick={handleClick}
              />
              <div
                className="d-flex flex-column"
                style={{ width: "7rem" }}
              >
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
