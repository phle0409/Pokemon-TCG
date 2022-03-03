import React from "react";
import EnergyCost from "./EnergyCost";

export default function Active({
  hand,
  active,
  setActive,
  bench,
  deck,
  prizes,
  discard,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  setShow,
  setUsesTargeting,
  setToast,
  socket,
}) {
  const handleClick = (e) => {
    if (!selected) {
      setSelected(active);
      setShow(true);
      setUsesTargeting(false);
      return;
    }

    if (selected?.supertype.includes("Energy")) {
      active.effects.energy.push(selected.name.replace(" Energy", ""));
      let newActive = active;
      hand.splice(selectedIndex, 1);
      setSelected(null);
      setSelectedIndex(null);
      setUsesTargeting(false);
      setToast({
        text: `Attached ${selected.name} to ${active.name}`,
        show: true,
      });
      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
    } else if (
      selected?.subtypes?.includes("Stage 1") ||
      selected?.subtypes?.includes("Stage 2")
    ) {
      if (selected.evolvesFrom === active.name) {
        setToast({
          text: `Evolved ${active.name} to ${selected.name}`,
          show: true,
        });
        let newActive = selected;
        setActive(newActive);
        hand.splice(selectedIndex, 1);
        setSelected(null);
        setSelectedIndex(null);
        setUsesTargeting(false);
        socket.emit("played-card", {
          deck,
          hand,
          active: newActive,
          bench,
          prizes,
          discard,
        });
      }
    } else if (selected?.supertype.includes("Trainer")) {
      return;
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {active ? (
        <div
          className="d-flex flex-row border rounded"
          style={{ width: "auto", height: "6.125rem" }}
        >
          <img
            className="pkmn-card table-card"
            src={active.image}
            id={`${active.name}-${active.set.name}-active`}
            onClick={handleClick}
          />
          <div className="d-flex flex-column" style={{ width: "7rem" }}>
            <div className="d-flex justify-content-center">{`${
              active.hp - active.effects.damage
            }/${active.hp} HP`}</div>
            <EnergyCost energies={active.effects.energy} />
          </div>
        </div>
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
