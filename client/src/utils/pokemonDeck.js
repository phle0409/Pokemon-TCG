export default class PokemonDeck {
  constructor(cards) {
    this.cards = cards;
  }

  draw(n) {
    const draws = [];

    for (let i = 0; i < n; i++) {
      draws.push(this.cards.pop());
    }

    return draws;
  }

  shuffle() {
    const n = this.cards.length - 1;

    for (let i = n; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}
