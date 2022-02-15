import React from "react";

export default function Active({ active }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      {active ? (
        <img className="m-1 pkmn-card" src={active.image} />
      ) : (
        <div
          className="m-1 pkmn-card"
          style={{ backgroundColor: "#eee" }}
        ></div>
      )}
    </div>
  );
}
