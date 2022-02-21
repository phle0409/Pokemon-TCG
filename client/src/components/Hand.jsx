import React from "react";

export default function Hand({
  hand,
  bench,
  active,
  setActive,
  setBench,
  socket,
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    const selectedPkmn = hand[index];
    if (
      selectedPkmn.supertype.includes("Pokémon") &&
      selectedPkmn.subtypes.includes("Basic")
    ) {
      hand.splice(index, 1);
      if (!active) {
        setActive(selectedPkmn);
        socket.emit("played-to-active", selectedPkmn);
      } else if (bench.length < 5) {
        setBench([...bench, selectedPkmn]);
        socket.emit("played-to-bench", bench);
      }
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center w-100">
      {hand ? (
        hand.map((card, index) => {
          return (
            <img
              className="m-1 pkmn-card"
              src={card.image}
              key={`hand-${index}`}
              id={`${card.name}-${card.set.name}-hand-${index}`}
              onClick={handleClick}
            />
          );
        })
      ) : (
        <div>
          <div className="m-1 pkmn-card"></div>
        </div>
      )}
    </div>
  );
}
