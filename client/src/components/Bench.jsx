import React from "react";

export default function Bench({ bench }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {bench.length > 0 ? (
        bench.map((card, index) => {
          return (
            <img
              className="m-1 pkmn-card"
              src={card.image}
              key={`hand-${index}`}
              id={`${card.name}-${card.set.name}-hand-${index}`}
            />
          );
        })
      ) : (
        <div className="m-1 pkmn-card" style={{ backgroundColor: "#eee" }}></div>
      )}
    </div>
  );
}
