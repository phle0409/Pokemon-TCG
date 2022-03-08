import { flipCoin } from "./skils_util";
let effectSkill = null;
let leakSlapDamage = 30;
export const skillCalculate = (
  name,
  damage,
  selected,
  setDamage,
  setHeal,
  setEffect,
  setZoneModal
) => {
  switch (name) {
    /*****  decklist_brushfire skill *****/
    case "Horn Hazard":
      return FlipAttack(damage);
    case "Lure":
      return Lure(damage);
    case "Poison Sting":
      return FlipEffect(damage, "posion");
    case "Confuse Ray":
      return FlipEffect(damage, "confused");
    case "Bind":
      return FlipEffect(damage, "paralyzed");
    case "Ember":
      return NormalDiscardOne(damage, setZoneModal, selected);
    case "Fire Blast":
      return NormalDiscardOne(damage, setZoneModal, selected);
    case "Flamethrower":
      return NormalDiscardOne(damage, setZoneModal, selected);
    case "Take Down":
      return TakeDown(damage, selected, setDamage);
    case `Poisonpowder`:
      return NormalEffect(damage, "posion");

    /*****  decklist_overgrowth skill *****/
    case "Bubblebeam":
      return FlipEffect(damage, "paralyzed");
    case "Recover":
      return Recover(damage, setZoneModal, setHeal, selected);
    case "Star Freeze":
      return FlipEffect(damage, "paralyzed");
    case "Twineedle":
      return Flip2CoinsAttack(damage);
    case "Stiffen":
      return Stiffen(damage, setEffect);

    /*****  decklist_zap skill *****/
    case "Psychic":
      return Psychic(damage, selected);
    case "Barrier":
      return Barrier(damage, setEffect, setZoneModal, selected);
    case "Doubleslap":
      return Flip2CoinsAttack(damage);
    case "Meditate":
      return Meditate(30);
    case `Hypnosis`:
      return SleepEffect(damage, "asleep");
    case `Sleeping Gas`:
      return SleepEffect(damage, "asleep");
    case `Dream Eater`:
      return DreamEater(damage);
    case `Destiny Bond`:
      return DestinyBond(damage, setZoneModal, selected);
    case "Psyshock":
      return FlipEffect(damage, "paralyzed");
    case "Thunder Wave":
      return FlipEffect(damage, "paralyzed");
    case "Thunder Jolt":
      return ThunderJolt(damage, setDamage);
    case "Selfdestruct":
      return Selfdestruct(damage);

    /*****  decklist_blackout skill *****/
    case "Leek Slap":
      return LeekSlap();
    case "Withdraw":
      return Withdraw(setEffect);
    case "Bubble":
      return FlipEffect(damage, "paralyzed");
    case "Harden":
      return Stiffen(damage);
    case "Sand-attack":
      return SandAttack(damage);
    case "Karate Chop":
      return KarateChop(damage);
    case "Submission":
      return Submission(damage, setDamage);

    /*****  Normal Default Attack skill *****/
    default:
      return NormalAttack(damage);
  }
};

const discard = (setZoneModal, selected) => {
  setZoneModal({
    show: true,
    zone: "Choose energy to discard",
    cards: selected.effects.attachments,
    numTargets: 1,
    action: "discard energy from active",
  });
};

const NormalAttack = (damage) => {
  return [damage, null];
};

/*****  decklist_brushfire skill *****/
const Lure = (damage) => {
  // TODO: implement proper skill
  return [30, null];
};

const TakeDown = (damage, selected, setDamage) => {
  setDamage(30);
  return [damage, null, selected.hp];
};

const NormalDiscardOne = (damage, setZoneModal, selected) => {
  discard(setZoneModal, selected);
  return [damage, null];
};

const FlipAttack = (damage) => {
  if (!flipCoin()) {
    damage = 0;
  }
  return [damage, null];
};

const NormalEffect = (damage, effect) => {
  return [damage, effect];
};

const FlipEffect = (damage, effect) => {
  if (flipCoin()) {
    effectSkill = effect;
  } else {
    effectSkill = null;
  }
  return [damage, effectSkill];
};

/*****  decklist_brushfire skill *****/

const Recover = (damage, setZoneModal, setHeal, selected) => {
  discard(setZoneModal, selected);
  setHeal(60);
  return [0, null];
};

const Flip2CoinsAttack = (damage) => {
  damage =
    Math.floor(Math.random() * 2) * 30 + Math.floor(Math.random() * 2) * 30;
  return [damage, null];
};

const Stiffen = (damage, setEffect) => {
  if (flipCoin()) {
    setEffect("immortal");
  }
  return [0, null];
};

/*****  decklist_zap skill *****/
const Psychic = (damage, selected) => {
  damage = selected.effects.energy.length * 10;
  return [damage, null];
};

const Barrier = (damage, setEffect, setZoneModal, selected) => {
  discard(setZoneModal, selected);
  setEffect("immortal");
  return [damage, null];
};

const Meditate = (damage) => {
  return [damage, null];
};

const DreamEater = (damage) => {
  // TO DO : implement proper DreamEater skill
  return [damage, null];
};

const SleepEffect = (damage, effect) => {
  return [0, effect];
};

const DestinyBond = (damage, setZoneModal, selected) => {
  // TODO: implement proper skill

  discard(setZoneModal, selected);
  return [20, null];
};

const ThunderJolt = (damage, setDamage) => {
  if (!flipCoin()) {
    setDamage(10);
    damage = 0;
  }
  return [damage, null];
};

const Selfdestruct = (damage) => {
  // TODO: implement proper skill
  return [30, null];
};

/*****  decklist_blackout skill *****/

const LeekSlap = () => {
  if (leakSlapDamage === 30) {
    if (!flipCoin()) {
      leakSlapDamage = 0;
    }
  }
  return [leakSlapDamage, null];
};

const Withdraw = (setEffect) => {
  if (flipCoin()) {
    setEffect("immortal");
  }
  return [0, null];
};

const SandAttack = (damage) => {
  // TODO: implement proper skill
  return [damage, null];
};

const KarateChop = (damage) => {
  // TODO: implement proper skill
  damage = 50 - Math.floor(Math.random() * 4) * 10;
  return [damage, null];
};

const Submission = (damage, setDamage) => {
  setDamage(20);
  return [damage, null];
};
