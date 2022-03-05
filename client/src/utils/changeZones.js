export const handToDiscard = (indices, hand, setHand, discard, setDiscard) => {
  indices.sort().reverse();

  let newHand = hand;
  let discarded = [];

  for (let i = 0; i < indices.length; i++) {
    discarded.push(newHand[indices[i]]);
    newHand.splice(indices[i], 1);
  }

  let newDiscard = [...discard, ...discarded];
  setDiscard(newDiscard);
  setHand(newHand);
};

export const deckToHand = (indices, deck, setDeck, hand, setHand) => {
  indices.sort().reverse();

  let newDeck = deck;
  let newCards = [];

  for (let i = 0; i < indices.length; i++) {
    newCards.push(deck.cards[indices[i]]);
    deck.cards.splice(indices[i], 1);
  }

  let newHand = [...hand, ...newCards];
  setDeck(newDeck);
  setHand(newHand);
  deck.shuffle();
};

export const discardToHand = (indices, hand, setHand, discard, setDiscard) => {
  indices.sort().reverse();

  let newDiscard = discard;
  let newCards = [];

  for (let i = 0; i < indices.length; i++) {
    newCards.push(discard[indices[i]]);
    newDiscard.splice(indices[i], 1);
  }

  let newHand = [...hand, newCards];
  setHand(newHand);
  setDiscard(newDiscard);
};

export const benchToActive = (bench, benchIndex, setBench, active, setActive) => {
  let newActive = bench[benchIndex];
  let newBench = bench;
  newBench.splice(benchIndex, 1);
  setBench([...newBench, active]);
  setActive(newActive);
};

/*
export const handToActive = (hand, handIndex, setHand, active, setActive) => {
    let newActive = hand[handIndex];
    let newHand = hand.splice(handIndex, 1);
    setActive(newActive);
    setHand(newHand);
};

export const handToBench = (hand, handIndex, bench, hand, setHand, bench, setBench) => {
    let newBench = [...bench, hand[handIndex]];
    let newHand = hand.splice(handIndex, 1);
    setBench(newBench);
    setHand(newHand);
};

export const attachEnergy = () => {

};

export const attachItem = () => {

};

export const evolve = () => {

};

export const knockout = () => {

};
*/
