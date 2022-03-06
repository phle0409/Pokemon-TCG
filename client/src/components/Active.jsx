import React from 'react';
import { handToDiscard } from '../utils/changeZones';
import EffectStatus from './EffectStatus';
import EnergyCost from './EnergyCost';

export default function Active({
  hand,
  setHand,
  active,
  setActive,
  bench,
  deck,
  prizes,
  discard,
  setDiscard,
  selected,
  setSelected,
  selectedIndex,
  setSelectedIndex,
  forcedAction,
  setShow,
  setUsesTargeting,
  yourName,
  setHeal,
  socket,
}) {
  const handleClick = (e) => {
    const [name, set, zone, index] = e.target.id.split('-');

    if (forcedAction === 'switch') return;

    if (!selected) {
      setSelected(active);
      setSelectedIndex(null);
      setShow(true);
      setUsesTargeting(false);
      return;
    }

    if (selected?.supertype.includes('Energy')) {
      active.effects.energy.push(selected.name.replace(' Energy', ''));
      let newActive = active;
      hand.splice(selectedIndex, 1);
      setSelected(null);
      setSelectedIndex(null);
      setUsesTargeting(false);
      socket.emit(
        'toast',
        `${yourName} attached ${selected.name} to ${active.name}`
      );
      socket.emit('played-card', {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
    } else if (
      selected?.subtypes?.includes('Stage 1') ||
      selected?.subtypes?.includes('Stage 2')
    ) {
      if (selected.evolvesFrom === active.name) {
        socket.emit(
          'toast',
          `${yourName} evolved ${active.name} into ${selected.name}!`
        );
        let newActive = selected;
        selected.effects.attachments = active.effects.attachments;
        active.effects.attachments = [];
        selected.effects.energy = active.effects.energy;
        active.effects.energy = [];
        selected.effects.attachments.push(active);
        setActive(newActive);
        hand.splice(selectedIndex, 1);
        setSelected(null);
        setSelectedIndex(null);
        setUsesTargeting(false);
        socket.emit('played-card', {
          deck,
          hand,
          active: newActive,
          bench,
          prizes,
          discard,
        });
      }
    } else if (selected?.supertype.includes('Trainer')) {
      if (selected.name === 'Potion') {
        socket.emit(
          'toast',
          `${yourName} used ${selected.name} on ${active.name}`
        );
        setHeal(20);
        handToDiscard([selectedIndex], hand, setHand, discard, setDiscard);
        // let newActive = active;
        // let currentDamage = parseInt(active.effects.damage) - 20;
        // if (currentDamage < 0) currentDamage = 0;
        // newActive.effects.damage = currentDamage;
        // setActive(newActive);
        // hand.splice(selectedIndex, 1);
        // let newDiscard = [...discard, hand[selectedIndex]];
        // setDiscard(newDiscard);
        socket.emit('played-card', {
          deck,
          hand,
          active,
          bench,
          prizes,
          discard,
        });
      }

      setSelected(null);
      setSelectedIndex(null);
      setUsesTargeting(false);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center">
      {active ? (
        <div
          className="d-flex flex-row border rounded"
          style={{ width: 'auto', height: '6.125rem' }}
        >
          <img
            className="pkmn-card table-card"
            src={active.image}
            id={`${active.name}-${active.set.name}-active`}
            onClick={handleClick}
          />
          <div className="d-flex flex-column" style={{ width: '7rem' }}>
            <div className="d-flex justify-content-center">{`${
              active.hp - active.effects.damage
            }/${active.hp} HP`}</div>
            <EnergyCost energies={active.effects.energy} />
            <EffectStatus status={active.effects.statusConditions} />
          </div>
        </div>
      ) : (
        <div className="pkmn-card"></div>
      )}
    </div>
  );
}
