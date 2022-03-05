import React from "react";
import EnergyCost from "./EnergyCost.jsx";
import Items from "./Items.jsx";

export default function OpponentActive({ opponentActive }) {
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
          />
          <div className="d-flex flex-column align-items-center" style={{ width: "7rem" }}>
            <div>{`${opponentActive.hp - opponentActive.effects.damage}/${
              opponentActive.hp
            } HP`}</div>
            <EnergyCost energies={opponentActive.effects.energy} />
            <Items items={opponentActive.effects.attachments} />
          </div>
        </div>
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
