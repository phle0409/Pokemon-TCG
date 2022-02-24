import React from "react";

export default function Active({ opponentActive }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentActive ? (
        <img
          className="opp-pkmn-card"
          src={opponentActive.image}
          id={`${opponentActive.name}-${opponentActive.set.name}-opponentactive`}
        />
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
