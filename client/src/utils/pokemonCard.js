export default class PokemonCard {
  constructor(card) {
    const {
      name,
      supertype,
      subtypes,
      hp,
      types,
      evolvesFrom,
      abilities,
      attacks,
      weaknesses,
      resistances,
      retreatCost,
      set,
      images,
    } = card;
    this.name = name;
    this.supertype = supertype;
    this.subtypes = subtypes;
    this.hp = hp;
    this.types = types;
    this.evolvesFrom = evolvesFrom;
    this.abilities = abilities;
    this.attacks = attacks;
    this.weaknesses = weaknesses;
    this.resistances = resistances;
    this.retreatCost = retreatCost;
    this.set = set.name;
    this.image = images.large || images.small;
    this.effects = {
      attachments: [],
      energy: [],
      damage: 0,
      statusConditions: {
        poisoned: false,
        asleep: false,
        confused: false,
        paralyzed: false,
        immortal: false,
        posionedDamage: 0,
        paralyzedDamage: 0,
        justPlayed: true
      },
      misc: [],
    };
  }
}
