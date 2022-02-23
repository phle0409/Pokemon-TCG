const attackMap = {
  'Confuse Ray': function () {
    // confuse fucntion
    // discuss how to implement
    if (flipCoin()) {
      confuse();
      damageOpponentActive(30);
    }
  },
  'Hydro Pump': function (eneryCards) {
    // plus 10 damage for each Energy attached
    // discuss how to implement
    let damage = 40 + eneryCards * 10;
    damageOpponentActive(damage);
  },
  Scrunch: function () {
    // discuss how to implement
    if (flipCoin()) preventDamage();
  },
  'Double-edge': function () {
    // discuss how to implement
    damageYourself(80);
  },
  'Fire Spin': function () {
    // Use 2 enery cards
    // discuss how to implement
    if (isDiscard(2)) damageOpponentActive(100);
  },
  Sing: function () {
    // Asleep opponent
    // discuss how to implement
    if (flipCoin()) Asleep();
  },
  Metronome: function () {
    // Choose defending pokemon and Copy attack
    // discuss how to implement
  },
  'Dragon Rage': function () {
    damageOpponentActive(50);
  },
  Bubllebeam: function () {
    if (flipCoin()) {
      // discuss how to implement
      Paralyzed();
    }
    damageOpponentActive(50);
  },
  Jab: function () {
    damageOpponentActive(20);
  },
  'Special Punch': function () {
    damageOpponentActive(40);
  },
  'Seismic Toss': function () {
    damageOpponentActive(60);
  },
  'Thunder Wave': function () {
    if (flipCoin()) {
      Paralyzed();
    }
    damageOpponentActive(30);
  },
  Selfdestruct: function () {
    // discuss how to implement
    damageAllOpponents(20);
  },
  Psychic: function (eneryCards) {
    let damage = 10 + eneryCards * 10;
    damageOpponentActive(damage);
  },
  Barrier: function () {
    // discuss how to implement
    if (isDiscard(1)) preventDamage();
  },
  Thrash: function () {
    if (flipCoin()) {
      damageOpponentActive(40);
    } else {
      damageAllOpponents(30);
      damageYourself(10);
    }
  },
  Toxic: function () {
    // discuss how to implement
    // poison 20 each tern
    poison(20);
  },
  Lure: function () {
    // ninetales
    // discuss how to implement
  },
  'Fire Blast': function () {
    if (isDiscard(1)) damageOpponentActive(80);
  },
};
