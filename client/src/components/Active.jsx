import React from "react";

export default function Active({ active, setSelected, setShow }) {
  const handleClick = (e) => {
    const selectedPkmn = active;
    setSelected(selectedPkmn);
    setShow(true);
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {active ? (
        <img
          className="m-1 pkmn-card"
          src={active.image}
          id={`${active.name}-${active.set.name}-active`}
          onClick={handleClick}
        />
      ) : (
        <div
          className="m-1 pkmn-card"
          style={{ backgroundColor: "#eee" }}
        ></div>
      )}
    </div>
  );
}
