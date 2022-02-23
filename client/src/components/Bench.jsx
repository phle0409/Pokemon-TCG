import React from "react";

export default function Bench({ bench, setSelected }) {
  const handleClick = (e) => {
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
              className="mx-2 pkmn-card"
              src={card.image}
              key={`bench-${index}`}
              id={`${card.name}-${card.set.name}-bench-${index}`}
              onClick={handleClick}
            />
          );
        })
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
