import React from "react";
import EnergyCost from "./EnergyCost.jsx";

export default function OpponentBench({ opponentBench }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentBench.length > 0 ? (
        opponentBench.map((card, index) => {
          return (
            <div className="d-flex flex-row">
              <img
                className="mx-2 opp-pkmn-card"
                src={card.image}
                key={`bench-${index}`}
                id={`${card.name}-${card.set.name}-opponentbench-${index}`}
              />
              <div className="p-2 d-flex align-items-center">
                {`${card.hp - card.effects.damage}/${card.hp} HP`}
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
