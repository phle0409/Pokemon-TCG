import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Container } from 'react-bootstrap';
import { fetchDeck } from '../utils/createDeck.js';
import Hand from './Hand.jsx';
import Bench from './Bench.jsx';
import Active from './Active.jsx';
import OpponentActive from './OpponentActive.jsx';
import OpponentBench from './OpponentBench.jsx';
import InfoPanel from './InfoPanel.jsx';
import AttackModal from './AttackModal.jsx';
import ZoneModal from './ZoneModal.jsx';
import PkmnToast from './PkmnToast.jsx';

export default function Play() {
  let navigate = useNavigate();
  const [socket, setSocket] = React.useState(null);
  const [gameStatus, setGameStatus] = React.useState({
    gameStarted: false,
    playerTurn: '',
  });
  const [yourName, setYourName] = React.useState('You');
  const [opponentName, setOpponentName] = React.useState(
    'Waiting on opponent...'
  );
  const [deck, setDeck] = React.useState([]);
  const [hand, setHand] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [bench, setBench] = React.useState([]);
  const [prizes, setPrizes] = React.useState([]);
  const [discard, setDiscard] = React.useState([]);
  const [opponentDeck, setOpponentDeck] = React.useState([]);
  const [opponentActive, setOpponentActive] = React.useState(null);
  const [opponentHand, setOpponentHand] = React.useState([]);
  const [opponentBench, setOpponentBench] = React.useState([]);
  const [opponentPrizes, setOpponentPrizes] = React.useState([]);
  const [opponentDiscard, setOpponentDiscard] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [multiSelect, setMultiSelect] = React.useState([]);
  const [secondaryAction, setSecondaryAction] = React.useState('');
  const [damage, setDamage] = React.useState(0);
  const [heal, setHeal] = React.useState(0);
  const [effect, setEffect] = React.useState('');
  const [forcedAction, setForcedAction] = React.useState('');
  const [usesTargeting, setUsesTargeting] = React.useState(false);
  const [showAttackModal, setShowAttackModal] = React.useState(false);
  const [zoneModal, setZoneModal] = React.useState({
    cards: [],
    zone: '',
    show: false,
    numTargets: 0,
    action: null,
  });
  const [toast, setToast] = React.useState({
    text: '',
    show: false,
  });
  const { state } = useLocation();

  const handleCloseAttackModal = () => {
    setShowAttackModal(false);
    setSelected(null);
  };

  const handleShowAttackModal = () => setShowAttackModal(true);
  const handleCloseZoneModal = () => setZoneModal({ show: false });
  const handleShowZoneModal = () => setZoneModal({ show: true });

  const handleCloseToast = () => {
    setToast({
      show: false,
    });
  };

  React.useEffect(() => {
    let decklist = state.decklist;
    setToast({
      text: 'Shuffling deck...',
      show: true,
    });
    (async () => {
      const deck = await fetchDeck(decklist);
      preGameSetup(deck);
      const newSocket = await io(`http://localhost:8080`);
      setSocket(newSocket);
    })();
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    let username = state.name;
    let roomID = state.roomID;

    socket.on('connect', (id) => {
      setYourName(username);
      socket.emit('userJoinRoom', { username, roomID });
    });

    socket.on('message', (msg) => {
      if (msg === 'full') {
        navigate('/room-full');
      } else {
        socket.emit('player-joined', username);
      }
    });

    socket.on('player-name', (oppname) => {
      setOpponentName(oppname);
      socket.emit('other-player-name', username);
      socket.emit('played-card', {
        deck,
        hand,
        active,
        bench,
        prizes,
        discard,
      });
    });
    socket.on('other-player-name', (oppname) => {
      setOpponentName(oppname);
      socket.emit('played-card', {
        deck,
        hand,
        active,
        bench,
        prizes,
        discard,
      });
    });

    socket.on('opponent-played-card', (board) => {
      const { deck, hand, active, bench, prizes, discard } = board;
      setOpponentDeck(deck);
      setOpponentHand(hand);
      setOpponentActive(active);
      setOpponentBench(bench);
      setOpponentPrizes(prizes);
      setOpponentDiscard(discard);
    });

    socket.on('opponent-attacked', ({ damage, effectSkill }) => {
      console.log(`damage ${damage}, effect: ${effectSkill}`);
      if (damage) damage = 0;
      setDamage(damage);
      if (effectSkill) {
        setEffect(effectSkill);
      }
    });

    socket.on('knockout', () => {
      let newHand = [...hand, prizes.pop()];
      setHand(newHand);
      socket.emit('played-card', {
        deck,
        hand: newHand,
        active,
        bench,
        prizes,
        discard,
      });
    });

    socket.on('reveal-hand', () => {
      setZoneModal({
        show: true,
        text: "Your opponent's hand",
        numTargets: 0,
        zone: opponentHand,
      });
    });

    socket.on('forced-retreat', (index) => {
      let newActive = bench[index];
      setActive(newActive);
      bench.splice(index, 1);
      let newBench;
      if (active) newBench = [...bench, active];
      else newBench = [...bench];
      setBench(newBench);
      socket.emit('played-card', {
        deck,
        hand,
        active: newActive,
        bench: newBench,
        prizes,
        discard,
      });
    });

    socket.on('toast', (message) => {
      setToast({
        text: message,
        show: true,
      });
    });

    socket.on('player-left', ({ username, id }) => {
      setOpponentActive(null);
      setOpponentBench([]);
    });
  }, [socket]);

  React.useEffect(() => {
    if (damage === 0) return;
    let newActive = active;
    // Check if pokemon has immortal effect.
    if (newActive.effects.statusConditions.immortal === true) {
      newActive.effects.statusConditions.immortal = false;
      setActive(newActive);
      return;
    }

    newActive.effects.damage += parseInt(damage);

    if (parseInt(newActive.effects.damage) >= parseInt(newActive.hp)) {
      socket.emit('toast', `${yourName}'s ${newActive.name} was knocked out!`);
      socket.emit('knockout');
      setDiscard([...discard, newActive]);
      newActive = null;
      setActive(newActive);
      socket.emit('played-card', {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
      if (bench.length > 0) setForcedAction('switch');
      else
        socket.emit(
          'toast',
          `${yourName} has no more benched Pokemon. ${opponentName} wins!`
        );
    } else {
      setActive(newActive);
      socket.emit('played-card', {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
    }

    setDamage(0);
  }, [damage]);

  React.useEffect(() => {
    if (heal === 0) return;
    let newActive = active;
    if (newActive.effects.damage - heal < 0) newActive.effects.damage = 0;
    else newActive.effects.damage -= heal;
    setActive(newActive);
    socket.emit('played-card', {
      deck,
      hand,
      active: newActive,
      bench,
      prizes,
      discard,
    });
    setHeal(0);
  }, [heal]);

  React.useEffect(() => {
    if (effect === '') return;
    let newActive = active;
    console.log('damage in effect', damage);
    switch (effect) {
      case 'posion':
        newActive.effects.statusConditions.poisoned = true;
        newActive.effects.statusConditions.posionedDamage = damage;
        break;
      case 'paralyzed':
        newActive.effects.statusConditions.paralyzed = true;
        newActive.effects.statusConditions.paralyzedDamage = damage;
        break;
      case 'confused':
        newActive.effects.statusConditions.confused = true;
        break;
      default:
        newActive.effects.statusConditions.asleep = true;
    }
    console.log(newActive);
    setActive(newActive);
    setEffect('');
  }, [effect]);

  function handleAttackChange(damage) {
    setDamage(damage);
  }

  function handleHealChange(heal) {
    setHeal(heal);
  }

  React.useEffect(() => {
    if (gameStatus.gameStarted && deck.cards.length === 0)
      socket.emit(
        `${yourName} has no more cards in their deck. ${opponentName} wins!`
      );

    if (gameStatus.gameStarted && prizes.length === 0)
      socket.emit(
        `${yourName} has drawn all their prize cards. ${yourName} wins!`
      );
  }, [deck, prizes]);

  React.useEffect(() => {
    if (secondaryAction === '') return;
    else if (secondaryAction === 'search deck') {
      setZoneModal({
        show: true,
        zone: 'Select 1 card from your deck to put into your hand',
        numTargets: 1,
        cards: deck.cards,
        action: 'search deck',
      });
    }
    setSecondaryAction('');
  }, [secondaryAction]);

  const preGameSetup = (deck) => {
    let openingHandBasic = false;

    while (!openingHandBasic) {
      deck.shuffle();
      const hand = deck.draw(11);
      setHand(hand);

      for (const card of hand) {
        if (
          card.supertype.includes('Pokémon') &&
          card.subtypes.includes('Basic')
        ) {
          openingHandBasic = true;
          break;
        }
      }

      if (!openingHandBasic) {
        deck.putBack(hand);
        console.log('Reshuffling...');
      }
    }
    const prizes = deck.draw(6);
    setPrizes(prizes);
    setDeck(deck);
  };

  return (
    <Container
      fluid
      className="bg-dark d-flex flex-row h-100 w-100 p-1"
      style={{ overflow: 'hidden' }}
    >
      <AttackModal
        show={showAttackModal}
        handleClose={handleCloseAttackModal}
        selected={selected}
        setSelected={setSelected}
        handleAttackChange={handleAttackChange}
        handleHealChange={handleHealChange}
        socket={socket}
      />
      <ZoneModal
        show={zoneModal.show}
        handleClose={handleCloseZoneModal}
        numTargets={zoneModal.numTargets}
        zone={zoneModal.zone}
        cards={zoneModal.cards}
        action={zoneModal.action}
        multiSelect={multiSelect}
        setMultiSelect={setMultiSelect}
        setSecondaryAction={setSecondaryAction}
        deck={deck}
        setDeck={setDeck}
        hand={hand}
        setHand={setHand}
        discard={discard}
        setDiscard={setDiscard}
      />
      <div className="bg-dark d-flex flex-column w-25 h-100">
        <div
          className={`${
            gameStatus.playerTurn === yourName
              ? `border border-success`
              : `border border-secondary`
          }
        bg-light d-flex flex-column m-1 p-1 h-25 border-2 rounded`}
        >
          <span>
            <strong>{yourName}</strong>
          </span>
          <span>Cards in deck: {deck.cards?.length}</span>
          <span>Prize cards: {prizes.length}</span>
          <span>Cards in hand: {hand.length}</span>
          <button
            onClick={() => {
              setZoneModal({
                show: true,
                zone: 'Your discard pile',
                numTargets: 0,
                cards: discard,
              });
            }}
          >
            Cards in discard: {discard.length}
          </button>
        </div>
        <div className="bg-light d-flex flex-column m-1 p-2 h-25 border border-secondary border-2 rounded">
          <span>
            <strong>{opponentName}</strong>
          </span>
          <span>Cards in deck: {opponentDeck.cards?.length}</span>
          <span>Prize cards: {opponentPrizes.length}</span>
          <span>Cards in hand: {opponentHand.length}</span>
          <button
            onClick={() =>
              setZoneModal({
                show: true,
                zone: "Your opponent's discard pile",
                numTargets: 0,
                cards: opponentDiscard,
              })
            }
          >
            Cards in discard: {opponentDiscard.length}
          </button>
        </div>
        <div className="bg-light d-flex flex-column m-1 p-2 h-50 border border-secondary border-2 rounded">
          <InfoPanel
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            usesTargeting={usesTargeting}
            setUsesTargeting={setUsesTargeting}
            forcedAction={forcedAction}
            setForcedAction={setForcedAction}
            deck={deck}
            setDeck={setDeck}
            hand={hand}
            setHand={setHand}
            opponentHand={opponentHand}
            setOpponentHand={setOpponentHand}
            active={active}
            setActive={setActive}
            bench={bench}
            setBench={setBench}
            prizes={prizes}
            discard={discard}
            setDiscard={setDiscard}
            yourName={yourName}
            setZoneModal={setZoneModal}
            socket={socket}
          />
        </div>
      </div>
      <Container
        fluid
        className="bg-dark py-1 d-flex flex-column h-100 w-100"
        style={{ zIndex: 1 }}
      >
        <PkmnToast
          show={toast.show}
          setShow={handleCloseToast}
          text={toast.text}
        />
        <div className="bg-light p-2 d-flex flex-column justify-content-between h-100 w-100 border border-secondary border-2 rounded">
          <OpponentBench
            opponentBench={opponentBench}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            deck={deck}
            hand={hand}
            setHand={setHand}
            active={active}
            discard={discard}
            setDiscard={setDiscard}
            prizes={prizes}
            yourName={yourName}
            socket={socket}
          />
          <OpponentActive opponentActive={opponentActive} />
          <hr className="m-0" />
          <Active
            hand={hand}
            setHand={setHand}
            active={active}
            setActive={setActive}
            bench={bench}
            deck={deck}
            prizes={prizes}
            discard={discard}
            setDiscard={setDiscard}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setShow={setShowAttackModal}
            setUsesTargeting={setUsesTargeting}
            setToast={setToast}
            forcedAction={forcedAction}
            setForcedAction={setForcedAction}
            yourName={yourName}
            setHeal={setHeal}
            socket={socket}
          />
          <Bench
            hand={hand}
            setHand={setHand}
            active={active}
            setActive={setActive}
            bench={bench}
            setBench={setBench}
            deck={deck}
            prizes={prizes}
            discard={discard}
            setDiscard={setDiscard}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setUsesTargeting={setUsesTargeting}
            setToast={setToast}
            forcedAction={forcedAction}
            setForcedAction={setForcedAction}
            yourName={yourName}
            socket={socket}
          />
        </div>
        <div className="mt-2 bg-primary border border-2 rounded h-25 w-100">
          <Hand
            hand={hand}
            setHand={setHand}
            setSelected={setSelected}
            setSelectedIndex={setSelectedIndex}
            forcedAction={forcedAction}
            setForcedAction={setForcedAction}
            setToast={setToast}
          />
        </div>
      </Container>
    </Container>
  );
}
