const flipCoin = () => {
  let result = true;
  if (Math.floor(Math.random() * 2) === 0) result = false;
  return result;
};

const discard = (energies) => {
  const index = energies.findIndex((energy) => energy !== 'Colorless');
  if (index !== -1) energies.splice(index, 1);
};

const damageYourself = (damage, hp) => {
  let result = hp - damage;
  if (result < 0) {
    result = 0;
  }
  return result;
};

module.exports = { flipCoin, discard, damageYourself };
