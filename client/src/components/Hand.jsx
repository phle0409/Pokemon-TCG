import React from "react";

export default function Hand({
  hand,
  bench,
  active,
  setActive,
  setBench,
  deck,
  prizes,
  discard,
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
      let newBench = null;
      if (!active) {
        setActive(selectedPkmn);
        socket.emit("played-card", {
          deck,
          hand,
          active: selectedPkmn,
          bench,
          prizes,
          discard,
        });
      } else if (bench.length < 5) {
        let newBench = [...bench, selectedPkmn];
        setBench(newBench);
        socket.emit("played-card", {
          deck,
          hand,
          active,
          bench: newBench,
          prizes,
          discard,
        });
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
