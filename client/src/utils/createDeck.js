import PokemonCard from "./pokemonCard.js";
import PokemonDeck from "./pokemonDeck.js";
import {
  decklist_brushfire,
  decklist_blackout,
  decklist_zap,
  decklist_overgrowth,
} from "./precons.js";

const createDeck = (decklist, cardpool) => {
  let cards = [];

  decklist.forEach((card) => {
    for (const cardpoolCard of cardpool) {
      if (cardpoolCard.name === card.name) {
        for (let i = 0; i < card.quantity; i++) {
          cards.push(new PokemonCard(cardpoolCard));
        }
        break;
      }
    }
  });

  return cards;
};

export const fetchDeck = async (decklist) => {
  let deck;

  switch (decklist) {
    case "brush":
      deck = decklist_brushfire;
      break;
    case "black":
      deck = decklist_blackout;
      break;
    case "overgrowth":
      deck = decklist_overgrowth;
      break;
    default:
      deck = decklist_zap;
      break;
  }

  // const promise = await fetch("https://mighty-crag-86175.herokuapp.com/cards")
  const promise = await fetch("http://localhost:8080/cards")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return new PokemonDeck(createDeck(deck, res.data));
    })
    .catch((error) => {
      console.log(error);
    });

  return promise;
};
