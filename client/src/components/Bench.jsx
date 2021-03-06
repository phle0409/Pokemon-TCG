import React from "react";
import EffectStatus from "./EffectStatus";
import EnergyCost from "./EnergyCost.jsx";
import Items from "./Items.jsx";

import {
  attachEnergyToBench,
  attachTrainerToBench,
  benchToActive,
  evolveBench,
  handToDiscard,
} from "../utils/changeZones.js";

export default function Bench({
  hand,
  setHand,
  active,
  setActive,
  bench,
  deck,
  prizes,
  discard,
  setDiscard,
  setBench,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  setUsesTargeting,
  setHealBenched,
  retreat,
  setRetreat,
  setZoneModal,
  setToast,
  socket,
  yourName,
  disablePlayer,
  playedEnergy,
  setPlayedEnergy,
}) {
  const handleClick = (e) => {
    if (disablePlayer) return;
    const [pokemonName, set, zone, index] = e.target.id.split("-");

    if (retreat) {
      const [newActive, newBench] = benchToActive(
        bench,
        index,
        setBench,
        active,
        setActive
      );

      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench: newBench,
        prizes,
        discard,
      });

      if (selected?.name === "Switch") {
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

      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench: newBench,
        prizes,
        discard,
      });

      socket.emit(
        "toast",
        `${yourName} ${
          selected?.name === "Switch" ? "used Switch and" : ""
        } sent out ${newActive.name}!`
      );

      setSelected(null);
      setSelectedIndex(null);
      setUsesTargeting(false);
      setRetreat(false);
      return;
    }

    if (!selected) {
      const selectedPkmn = bench[index];
      console.log(selectedPkmn);
      setSelected(selectedPkmn);
      setSelectedIndex(index);
      setUsesTargeting(false);
      return;
    }

    const { supertype, name, subtypes, evolvesFrom } = selected;

    if (supertype.includes("Energy")) {
      if (!playedEnergy) {
        const [newHand, newBench] = attachEnergyToBench(
          hand,
          selectedIndex,
          setHand,
          bench,
          index,
          setBench
        );
        socket.emit(
          "toast",
          `${yourName} attached ${name} to ${newBench[index].name}`
        );
        socket.emit("played-card", {
          deck,
          hand: newHand,
          active,
          bench: newBench,
          discard,
          prizes,
        });
        setPlayedEnergy(true);
      } else {
        setToast({
          show: true,
          text: "You've already played an energy this turn",
        });
      }
    } else if (
      supertype.includes("Pok??mon") &&
      evolvesFrom === bench[index].name
    ) {
      socket.emit(
        "toast",
        `${yourName} evolved ${bench[index].name} into ${name}!`
      );

      const [newHand, newBench] = evolveBench(
        hand,
        selectedIndex,
        setHand,
        bench,
        index,
        setBench
      );

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active,
        bench: newBench,
        discard,
        prizes,
      });
    } else if (supertype.includes("Trainer")) {
      if (name === "Potion") {
        const [newHand, newDiscard] = handToDiscard(
          [selectedIndex],
          hand,
          setHand,
          discard,
          setDiscard
        );
        setHealBenched({ index: index, heal: 20 });
        socket.emit(
          "toast",
          `${yourName} used ${name} on ${bench[index].name}`
        );
      } else if (name === "Super Potion") {
        if (bench[index].effects.energy.length < 1) {
          setToast({
            show: true,
            text: `${bench[index].name} does not have any attached energy`,
          });
          return;
        }
        setHealBenched({ index: index, heal: 80 });
        const [newHand, newDiscard] = handToDiscard(
          [selectedIndex],
          hand,
          setHand,
          discard,
          setDiscard
        );

        socket.emit(
          "toast",
          `${yourName} used ${name} on ${bench[index].name}`
        );

        setZoneModal({
          show: true,
          zone: `Choose an energy to discard from ${bench[index].name}`,
          numTargets: 1,
          cards: bench[index].effects.attachments,

          action: "discard energy from bench",
          index: index,
        });
      } else if (name === "PlusPower" || name === "Defender") {
        const [newHand, newBench] = attachTrainerToBench(
          hand,
          selectedIndex,
          setHand,
          bench,
          index,
          setBench
        );
        socket.emit(
          "toast",
          `${yourName} attached ${name} to ${newBench[index].name}`
        );
        socket.emit("played-card", {
          deck,
          hand: newHand,
          active,
          bench: newBench,
          discard,
          prizes,
        });
      }
    }

    setSelected(null);
    setSelectedIndex(null);
    setUsesTargeting(false);
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {bench?.length > 0 ? (
        bench.map((card, index) => {
          return (
            <div
              className="d-flex flex-row mx-2 border border rounded"
              style={{ width: "auto", height: "6.125rem" }}
              key={`bench-${index}`}
            >
              <img
                className="pkmn-card table-card"
                src={card.image}
                id={`${card.name}-${card.set.name}-bench-${index}`}
                onClick={handleClick}
              />
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "7rem" }}
              >
                <div className="d-flex justify-content-center">{`${
                  card.hp - card.effects.damage
                }/${card.hp} HP`}</div>
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
