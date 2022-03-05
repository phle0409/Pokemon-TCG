import { flipCoin, discard } from './skils_util';
let effectSkill = null;

export const skillCalculate = (name, damage, energies) => {
  switch (name) {
    /*****  decklist_brushfire skill *****/
    case 'Horn Hazzard':
      return HornHazzard(damage, energies);
    case 'Poison Sting':
      return normalEffect(damage, energies, 'posion');
    case 'Confuse Ray':
      return normalEffect(damage, energies, 'confused');
    case 'Ember':
      return Ember(damage, energies);
    /*****  decklist_overgrowth skill *****/

    /*****  decklist_zap skill *****/

    /*****  decklist_blackout skill *****/
    default:
      return normalAttack(damage, energies);
  }
};
/*****  decklist_brushfire skill *****/
const Ember = (damage, energies) => {
  discard(energies);
  return [damage, null];
};

const HornHazzard = (damage, energies) => {
  if (!flipCoin()) {
    damage = 0;
  }
  return [damage, null];
};

const normalAttack = (damage, energies) => {
  return [damage, null];
};

const normalEffect = (damage, energies, effect) => {
  if (flipCoin()) {
    effectSkill = effect;
  } else {
    effectSkill = null;
  }
  return [damage, effectSkill];
};
