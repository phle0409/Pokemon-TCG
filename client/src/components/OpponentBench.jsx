import React from "react";
import EffectStatus from "./EffectStatus";
import EnergyCost from "./EnergyCost.jsx";
import Items from "./Items.jsx";
import { handToDiscard } from "../utils/changeZones.js";

export default function OpponentBench({
  opponentActive,
  opponentBench,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  setUsesTargeting,
  deck,
  active,
  hand,
  setHand,
  bench,
  discard,
  setDiscard,
  prizes,
  yourName,
  setToast,
  setZoneModal,
  socket,
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");

    if (selected.name === "Gust of Wind") {
      socket.emit("forced-retreat", index);

      socket.emit(
        "toast",
        `${yourName} used ${selected.name} on ${opponentBench[index].name}!`
      );

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
    } else if (selected.name === "Energy Removal") {
      if (opponentBench[index].effects.energy.length < 1) {
        setToast({
          show: true,
          text: `${opponentBench[index].name} has no energy to discard`,
        });
        return;
      }

      socket.emit(
        `${yourName} used ${selected.name} on ${opponentBench[index].name}!`
      );

      const [newHand, newDiscard] = handToDiscard(
        [selectedIndex],
        hand,
        setHand,
        discard,
        setDiscard
      );

      setZoneModal({
        show: true,
        zone: `Select an energy to discard from your opponent's ${opponentBench[index].name}`,
        numTargets: 1,
        cards: opponentBench[index].effects.attachments,
        action: "make opponent discard energy from bench",
        index: index,
      });

      socket.emit({
        deck,
        hand: newHand,
        active,
        bench,
        discard: newDiscard,
        prizes,
      });
    }

    setSelected(null);
    setSelectedIndex(null);
    setUsesTargeting(false);
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentBench?.length > 0 ? (
        opponentBench.map((card, index) => {
          return (
            <div
              className="d-flex flex-row mx-2 border border-rounded"
              key={`opponentbench-${index}`}
            >
              <img
                className="opp-pkmn-card"
                src={card.image}
                id={`${card.name}-${card.set.name}-opponentbench-${index}`}
                onClick={handleClick}
              />
              <div className="d-flex flex-column" style={{ width: "7rem" }}>
                <div className="d-flex align-items-center justify-content-center">
                  {`${card.hp - card.effects.damage}/${card.hp} HP`}
                </div>
                <EnergyCost energies={card.effects.energy} />
                <Items items={card.effects.attachments} />
                <EffectStatus status={card.effects.statusConditions} />
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
