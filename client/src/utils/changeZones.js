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
  return [newHand, newDiscard];
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
  return [newDeck, newHand];
};

export const discardToHand = (indices, hand, setHand, discard, setDiscard) => {
  indices.sort().reverse();

  let newDiscard = discard;
  let newCards = [];

  for (let i = 0; i < indices.length; i++) {
    newCards.push(discard[indices[i]]);
    newDiscard.splice(indices[i], 1);
  }

  let newHand = [...hand, ...newCards];
  setHand(newHand);
  setDiscard(newDiscard);
  return [newHand, newDiscard];
};

export const benchToActive = (
  bench,
  benchIndex,
  setBench,
  active,
  setActive
) => {
  let newActive = bench[benchIndex];
  let newBench = bench;
  newBench.splice(benchIndex, 1);
  newBench = [...newBench, active];
  setBench(newBench);
  setActive(newActive);
  return [newActive, newBench];
};

export const activeToDiscard = (active, setActive, discard, setDiscard) => {
  let newDiscard = [...discard, ...active.effects.attachments, active];
  setDiscard(newDiscard);
  let newActive = null;
  setActive(newActive);
  return [newActive, newDiscard];
};

export const handToActive = (hand, handIndex, setHand, setActive) => {
  let newActive = hand[handIndex];
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setActive(newActive);
  setHand(newHand);
  return [newActive, newHand];
};

export const handToBench = (hand, handIndex, setHand, bench, setBench) => {
  let newBench = [...bench, hand[handIndex]];
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setBench(newBench);
  setHand(newHand);
  return [newHand, newBench];
};

export const discardEnergyFromActive = (
  indices,
  active,
  setActive,
  discard,
  setDiscard
) => {
  indices.sort().reverse();

  let newActive = active;
  let discarded = [];

  for (let i = 0; i < indices.length; i++) {
    discarded.push(newActive.effects.attachments[indices[i]]);
    newActive.effects.attachments.splice(indices[i], 1);
    newActive.effects.energy.splice(indices[i], 1);
  }

  let newDiscard = [...discard, ...discarded];

  setActive(newActive);
  setDiscard(newDiscard);

  return [newActive, newDiscard];
};

export const discardEnergyFromBench = (
  indices,
  bench,
  benchIndex,
  setBench,
  discard,
  setDiscard
) => {
  indices.sort().reverse();

  let benched = bench[benchIndex];
  let discarded = [];

  for (let i = 0; i < indices.length; i++) {
    discarded.push(benched.effects.attachments[indices[i]]);
    benched.effects.attachments.splice(indices[i], 1);
    benched.effects.energy.splice(indices[i], 1);
  }

  let newBench = bench;
  bench.splice(benchIndex, 1);
  newBench = [...bench, benched];

  let newDiscard = [...discard, ...discarded];

  setBench(newBench);
  setDiscard(newDiscard);

  return [newBench, newDiscard];
};

export const attachEnergyToActive = (
  hand,
  handIndex,
  setHand,
  active,
  setActive
) => {
  let newActive = active;
  let newHand = hand;
  newActive.effects.attachments.push(hand[handIndex]);
  newActive.effects.energy.push(hand[handIndex].name.replace(" Energy", ""));
  newHand.splice(handIndex, 1);
  setHand(newHand);
  setActive(newActive);
  return [newHand, newActive];
};

export const attachEnergyToBench = (
  hand,
  handIndex,
  setHand,
  bench,
  benchIndex,
  setBench
) => {
  let benched = bench[benchIndex];
  benched.effects.attachments.push(hand[handIndex]);
  benched.effects.energy.push(hand[handIndex].name.replace(" Energy", ""));
  let newBench = bench;
  newBench.splice(benchIndex, 1);
  newBench = [...bench, benched];
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setHand(newHand);
  setBench(newBench);
  return [newHand, newBench];
};

export const evolveActive = (hand, handIndex, setHand, active, setActive) => {
  let newActive = hand[handIndex];
  newActive.effects.attachments = active.effects.attachments;
  active.effects.attachments = [];
  newActive.effects.energy = active.effects.energy;
  active.effects.energy = [];
  newActive.effects.attachments.push(active);
  setActive(newActive);
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setActive(newActive);
  setHand(newHand);

  return [newHand, newActive];
};

export const evolveBench = (
  hand,
  handIndex,
  setHand,
  bench,
  benchIndex,
  setBench
) => {
  let benched = hand[handIndex];
  benched.effects.attachments.push(bench[benchIndex]);
  bench[benchIndex].effects.attachments = [];
  let newBench = bench;
  newBench.splice(benchIndex, 1);
  newBench = [...bench, benched];
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setHand(newHand);
  setBench(newBench);
  return [newHand, newBench];
};

export const attachTrainerToActive = (
  hand,
  handIndex,
  setHand,
  active,
  setActive
) => {
  let newActive = active;
  newActive.effects.attachments.push(hand[handIndex]);
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setActive(newActive);
  setHand(newHand);
  return [newHand, newActive];
};

export const attachTrainerToBench = (
  hand,
  handIndex,
  setHand,
  bench,
  benchIndex,
  setBench
) => {
  let benched = bench[benchIndex];
  benched.effects.attachments.push(hand[handIndex]);
  let newBench = bench;
  bench.splice(benchIndex, 1);
  newBench = [...newBench, benched];
  let newHand = hand;
  newHand.splice(handIndex, 1);
  setBench(newBench);
  setHand(newHand);
  return [newHand, newBench];
};
