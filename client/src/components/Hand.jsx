import React from "react";

export default function Hand({ hand, bench, active, setActive, setBench }) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");
    const selectedPkmn = hand[index];
    if (
      selectedPkmn.supertype === "Pokémon" &&
      selectedPkmn.subtypes.includes("Basic")
    ) {
      hand.splice(index, 1);
      if (!active) setActive(selectedPkmn);
      else if (bench.length < 5) {
        let cards = [];
        bench.forEach((card) => cards.push(card));
        cards.push(selectedPkmn);
        setBench(cards);
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
