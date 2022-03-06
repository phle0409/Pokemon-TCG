

import React from "react";

import {
  attachEnergyToActive,
  attachTrainerToActive,
  evolveActive,
  handToDiscard,
} from "../utils/changeZones.js";
import EnergyCost from "./EnergyCost";
import Items from "./Items.jsx";


export default function Active({
  hand,
  setHand,
  active,
  setActive,
  bench,
  deck,
  prizes,
  discard,
  setDiscard,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  retreat,
  setShow,
  setUsesTargeting,
  yourName,
  setHeal,
  setZoneModal,
  setToast,
  socket,
}) {
  const handleClick = (e) => {
    console.log(active);

    if (retreat) {
      setToast({
        show: true,

        text: "You must choose a benched Pokemon to place into active"
      })
      return;
    };

    if (!selected) {
      setSelected(active);
      setSelectedIndex(null);
      setShow(true);
      setUsesTargeting(false);
      return;
    }

    const { supertype, name, evolvesFrom } = selected;

    if (supertype.includes("Energy")) {

      const [newHand, newActive] = attachEnergyToActive(
        hand,
        selectedIndex,
        setHand,
        active,
        setActive
      );

      socket.emit("toast", `${yourName} attached ${name} to ${active.name}`);

      socket.emit({
        deck,
        hand: newHand,
        active: newActive,
        bench,
        discard,
        prizes,
      });

    } else if (supertype.includes("Pokémon") && evolvesFrom === active.name) {

      const [newHand, newActive] = evolveActive(
        hand,
        selectedIndex,
        setHand,
        active,
        setActive
      );

      socket.emit("toast", `${yourName} evolved ${active.name} into ${name}!`);

      socket.emit({
        deck,
        hand: newHand,
        active: newActive,
        bench,
        discard,
        prizes,
      });

    } else if (supertype.includes("Trainer")) {
      if (name === "Potion") {

        setHeal(20);
        const [newHand, newDiscard] = handToDiscard(
          [selectedIndex],
          hand,
          setHand,
          discard,
          setDiscard
        );

        socket.emit("toast", `${yourName} used ${name} on ${active.name}`);

        socket.emit({
          deck,
          hand: newHand,
          active,
          bench,
          discard: newDiscard,
          prizes,
        });

      } else if (name === "Super Potion") {
        if(active.effects.energy.length < 1) {
          setToast({
            show: true,
            text: `${active.name} does not have any attached energy`

          });
          return;
        }

        setHeal(80);
        const [newHand, newDiscard] = handToDiscard(
          [selectedIndex],
          hand,
          setHand,
          discard,
          setDiscard
        );

        socket.emit("toast", `${yourName} used ${name} on ${active.name}`);

        socket.emit({
          deck,
          hand: newHand,
          active,
          bench,
          discard: newDiscard,
          prizes,
        });
        setZoneModal({
          show: true,
          zone: `Choose an energy to discard from ${active.name}`,
          numTargets: 1,
          cards: active.effects.attachments,

          action: "discard energy from active",
        });
      } else if (name === "PlusPower" || name === "Defender") {

        const [newHand, newActive] = attachTrainerToActive(
          hand,
          selectedIndex,
          setHand,
          active,
          setActive
        );

        socket.emit("toast", `${yourName} attached ${name} to ${active.name}`);

        socket.emit({
          deck,
          hand: newHand,
          active: newActive,
          bench,
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
            <Items items={active.effects.attachments} />
          </div>
        </div>
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
