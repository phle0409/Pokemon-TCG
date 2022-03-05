import { flipCoin, discard, damageYourself } from './skils_util';
let effectSkill = null;
export const skillCalculate = (
  name,
  damage,
  energies,
  selected,
  handleAttackChange
) => {
  switch (name) {
    /*****  decklist_brushfire skill *****/
    case 'Horn Hazzard':
      return FlipAttack(damage, energies);
    case 'Poison Sting':
      return FlipEffect(damage, energies, 'posion');
    case 'Confuse Ray':
      return FlipEffect(damage, energies, 'confused');
    case 'Blind':
      return FlipEffect(damage, energies, 'paralyzed');
    case 'Ember':
      return NormalDiscardOne(damage, energies);
    case 'Fire Blast':
      return NormalDiscardOne(damage, energies);
    case 'Flamethrower':
      return NormalDiscardOne(damage, energies);
    case 'Take Down':
      return TakeDown(damage, energies, selected, handleAttackChange);
    case `Poisonpowder`:
      return NormalEffect(damage, energies, 'posion');

    /*****  decklist_overgrowth skill *****/
    case 'Bubblebeam':
      return FlipEffect(damage, energies, 'paralyzed');
    case 'Recover':
      return Recover(damage, energies, selected);
    case 'Star Freeze':
      return FlipEffect(damage, energies, 'paralyzed');
    case 'Twineedle':
      return Flip2CoinsAttack(damage, energies);

    case 'Stiffen':
      return Stiffen(damage, energies);

    /*****  decklist_zap skill *****/
    case 'Psychic':
      return Psychic(damage, energies);
    case 'Barrier':
      return Barrier(damage, energies);
    case 'Doubleslap':
      return Flip2CoinsAttack(damage, energies);
    case 'Meditate':
      return Meditate(30, energies);
    case `Hypnosis`:
      return NormalEffect(damage, energies, 'asleep');
    case `Dream Eater`:
      return DreamEater(damage, energies);

    /*****  decklist_blackout skill *****/

    /*****  Normal Default Attack skill *****/
    default:
      return NormalAttack(damage, energies);
  }
};

const NormalAttack = (damage, energies) => {
  return [damage, null];
};

/*****  decklist_brushfire skill *****/

const TakeDown = (damage, energies, selected, handleAttackChange) => {
  handleAttackChange(30);
  return [damage, null, selected.hp];
};

const NormalDiscardOne = (damage, energies) => {
  discard(energies);
  return [damage, null];
};

const FlipAttack = (damage, energies) => {
  if (!flipCoin()) {
    damage = 0;
  }
  return [damage, null];
};

const NormalEffect = (damage, energies, effect) => {
  return [damage, effect];
};

const FlipEffect = (damage, energies, effect) => {
  if (flipCoin()) {
    effectSkill = effect;
  } else {
    effectSkill = null;
  }
  return [damage, effectSkill];
};

/*****  decklist_brushfire skill *****/

const Recover = (damage, energies, selected) => {
  // check update hp
  discard(energies);
  // recovery
  return [damage, null];
};

const Flip2CoinsAttack = (damage, energies) => {
  damage =
    Math.floor(Math.random() * 2) * 30 + Math.floor(Math.random() * 2) * 30;
  return [damage, null];
};

const Stiffen = (damage, energies, selected) => {
  // get current hp
  if (flipCoin()) {
    selected.effect.immortal = true;
  }

  return [0, null];
};

/*****  decklist_zap skill *****/
const Psychic = (damage, energies) => {
  damage = energies.length * 10;
  return [damage, null];
};

const Barrier = (damage, energies, selected) => {
  const index = energies.findIndex((energy) => energy === 'Psychic');
  if (index !== -1) energies.splice(index, 1);
  selected.effect.immortal = true;
  return [damage, null];
};

const Meditate = (damage, energies) => {
  return [damage, null];
};

const DreamEater = (damage, energies) => {
  return [damage, null];
};
