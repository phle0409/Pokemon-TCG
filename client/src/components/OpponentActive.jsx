import EffectStatus from "./EffectStatus";
import React from "react";
import EnergyCost from "./EnergyCost.jsx";
import Items from "./Items.jsx";
import { handToDiscard } from "../utils/changeZones.js";

export default function OpponentActive({
  opponentActive,
  deck,
  hand,
  setHand,
  active,
  bench,
  discard,
  setDiscard,
  prizes,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  setUsesTargeting,
  setZoneModal,
  setToast,
  yourName,
  socket,
}) {
  const handleClick = (e) => {
    const [name, set, zone] = e.target.id.split("-");

    if (selected.name === "Energy Removal") {
      if (opponentActive.effects.energy.length < 1) {
        setToast({
          show: true,
          text: `${opponentActive.name} has no energy to discard`,
        });
        return;
      }

      const [newHand, newDiscard] = handToDiscard(
        [selectedIndex],
        hand,
        setHand,
        discard,
        setDiscard
      );

      setZoneModal({
        show: true,
        zone: "Select an energy to discard from your opponent's active",
        numTargets: 1,
        cards: opponentActive.effects.attachments,
        action: "make opponent discard energy from active",
      });

      socket.emit(`${yourName} used ${selected.name} on ${opponentActive}!`);
      socket.emit({
        deck,
        hand: newHand,
        active,
        bench,
        discard: newDiscard,
        prizes,
      });

      setSelected(null);
      setSelectedIndex(null);
      setUsesTargeting(false);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentActive ? (
        <div
          className="d-flex flex-row border rounded"
          style={{ width: "auto", height: "6.125rem" }}
        >
          <img
            className="opp-pkmn-card"
            src={opponentActive.image}
            id={`${opponentActive.name}-${opponentActive.set.name}-opponentactive`}
            onClick={handleClick}
          />
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: "7rem" }}
          >
            <div>{`${opponentActive.hp - opponentActive.effects.damage}/${
              opponentActive.hp
            } HP`}</div>
            <EnergyCost energies={opponentActive.effects.energy} />
            <Items items={opponentActive.effects.attachments} />
            <EffectStatus status={opponentActive.effects.statusConditions} />
          </div>
        </div>
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
