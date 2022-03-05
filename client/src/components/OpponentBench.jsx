import React from "react";
import EnergyCost from "./EnergyCost.jsx";
import Items from "./Items.jsx";

export default function OpponentBench({
  opponentBench,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  deck,
  active,
  hand,
  setHand,
  bench,
  discard,
  setDiscard,
  prizes,
  yourName,
  socket
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split("-");

    if (selected.name === "Gust of Wind") {
      socket.emit("toast", `${yourName} used ${selected.name} to bring in ${opponentBench[index].name}!`);
      let newDiscard = [...discard, hand[selectedIndex]];
      setDiscard(newDiscard);
      hand.splice(selectedIndex, 1);
      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench,
        discard: newDiscard,
        prizes
      })

      setSelected(null);
      setSelectedIndex(null);

      socket.emit("forced-retreat", index);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {opponentBench?.length > 0 ? (
        opponentBench.map((card, index) => {
          return (
            <div
              className="d-flex flex-row mx-2 border border-rounded"
              key={`opponentbench-${index}`}
            >
              <img
                className="opp-pkmn-card"
                src={card.image}
                id={`${card.name}-${card.set.name}-opponentbench-${index}`}
                onClick={handleClick}
              />
              <div className="d-flex flex-column" style={{ width: "7rem" }}>
                <div className="d-flex align-items-center justify-content-center">
                  {`${card.hp - card.effects.damage}/${card.hp} HP`}
                </div>
                <EnergyCost energies={card.effects.energy} />
                <Items items={card.effects.attachments} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
