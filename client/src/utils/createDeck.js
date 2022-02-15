import PokemonCard from "./pokemonCard.js";
import PokemonDeck from "./pokemonDeck.js";

const createDeck = (decklist, cardpool) => {
  let cards = [];

  decklist.forEach((card) => {
    cardpool.forEach((cardpoolCard) => {
      if (cardpoolCard.name === card.name) {
        for (let i = 0; i < card.quantity; i++) {
          cards.push(new PokemonCard(cardpoolCard));
        }
      }
    });
  });

  return cards;
};

export const fetchDeck = async (decklist) => {
  const promise = await fetch("http://localhost:8080/cards")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return new PokemonDeck(createDeck(decklist, res.data));
    })
    .catch((error) => {
      console.log(error);
    });

  return promise;
};
