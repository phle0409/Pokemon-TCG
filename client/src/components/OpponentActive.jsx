import React from "react";
import EnergyCost from "./EnergyCost.jsx";

export default function OpponentActive({ opponentActive }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentActive ? (
        <div className="d-flex flex-row">
          <img
            className="opp-pkmn-card"
            src={opponentActive.image}
            id={`${opponentActive.name}-${opponentActive.set.name}-opponentactive`}
          />
          <div className="px-2 d-flex flex-column align-items-center justify-content-center">
            <div>{`${opponentActive.hp - opponentActive.effects.damage}/${
              opponentActive.hp
            } HP`}</div>
            <EnergyCost energies={opponentActive.effects.energy} />
          </div>
        </div>
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
