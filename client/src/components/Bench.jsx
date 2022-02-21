import React from "react";

export default function Bench({ bench, setSelected, yourCard }) {
  const handleClick = (e) => {
    if (!yourCard) return;
    const [name, set, zone, index] = e.target.id.split("-");
    const selectedPkmn = bench[index];
    console.log(selectedPkmn.name);
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {bench.length > 0 ? (
        bench.map((card, index) => {
          return (
            <img
              className="m-1 pkmn-card"
              style={yourCard ? {} : { transform: "rotate(180deg)" }}
              src={card.image}
              key={`bench-${index}`}
              id={`${card.name}-${card.set.name}-bench-${index}`}
              onClick={handleClick}
            />
          );
        })
      ) : (
        <div
          className="m-1 pkmn-card"
          style={{ backgroundColor: "#eee" }}
        ></div>
      )}
    </div>
  );
}
