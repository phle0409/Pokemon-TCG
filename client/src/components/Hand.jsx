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
  setSelected,
  setSelectedIndex,
  socket,
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    const selected = hand[index];
    setSelected(selected);
    setSelectedIndex(index);
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
