import React from 'react';

export default function Hand({
  hand,
  setSelected,
  setSelectedIndex,
  forcedAction,
  setToast,
}) {
  const handleClick = (e) => {
    if (forcedAction === 'switch') {
      setToast({
        text: 'You must selected a benched Pokemon to place into active',
        show: true,
      });

      return;
    }

    const [name, set, zone, index] = e.target.id.split('-');
    const selectedCard = hand[index];
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
