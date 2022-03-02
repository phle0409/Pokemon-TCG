import React from "react";

export default function Hand({
  hand,
  setSelected,
  setSelectedIndex,
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    const selectedCard = hand[index];
    console.log(selectedCard);
    setSelected(selectedCard);
    setSelectedIndex(index);
  };

  return (
    <div className="d-flex flex-row justify-content-center w-100">
      {hand ? (
        hand.map((card, index) => {
          return (
            <img
              className="my-2 mx-1 pkmn-card hand-card"
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
