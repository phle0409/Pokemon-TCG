import React from "react";

export default function OpponentBench({ opponentBench }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentBench.length > 0 ? (
        opponentBench.map((card, index) => {
          return (
            <img
              className="mx-2 opp-pkmn-card"
              src={card.image}
              key={`bench-${index}`}
              id={`${card.name}-${card.set.name}-opponentbench-${index}`}
            />
          );
        })
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
