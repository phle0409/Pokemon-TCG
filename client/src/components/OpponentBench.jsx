import React from "react";
import EnergyCost from "./EnergyCost.jsx";

export default function OpponentBench({ opponentBench }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentBench.length > 0 ? (
        opponentBench.map((card, index) => {
          return (
            <div className="d-flex flex-row mx-2 border border-rounded">
              <img
                className="opp-pkmn-card"
                src={card.image}
                key={`opponentbench-${index}`}
                id={`${card.name}-${card.set.name}-opponentbench-${index}`}
              />
              <div className="d-flex flex-column" style={{ width: "7rem" }}>
                <div className="d-flex align-items-center justify-content-center">
                  {`${card.hp - card.effects.damage}/${card.hp} HP`}
                </div>
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
