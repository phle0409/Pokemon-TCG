import React from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Container } from 'react-bootstrap';
import { fetchDeck } from '../utils/createDeck.js';
import { decklist_brushfire } from '../utils/precons.js';
import Hand from './Hand.jsx';
import Bench from './Bench.jsx';
import Active from './Active.jsx';
import OpponentActive from './OpponentActive.jsx';
import OpponentBench from './OpponentBench.jsx';
import InfoPanel from './InfoPanel.jsx';
import AttackModal from './AttackModal.jsx';
import { useNavigate } from 'react-router-dom';

export default function Play() {
  let navigate = useNavigate();
  const [socket, setSocket] = React.useState(null);
  const [yourName, setYourName] = React.useState('You');
  const [deck, setDeck] = React.useState([]);
  const [hand, setHand] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [bench, setBench] = React.useState([]);
  const [prizes, setPrizes] = React.useState([]);
  const [discard, setDiscard] = React.useState([]);
  const [opponentName, setOpponentName] = React.useState(null);
  const [opponentDeck, setOpponentDeck] = React.useState([]);
  const [opponentActive, setOpponentActive] = React.useState(null);
  const [opponentHand, setOpponentHand] = React.useState([]);
  const [opponentBench, setOpponentBench] = React.useState([]);
  const [opponentPrizes, setOpponentPrizes] = React.useState([]);
  const [opponentDiscard, setOpponentDiscard] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [usesTargeting, setUsesTargeting] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const { state } = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    (async () => {
      const deck = await fetchDeck(decklist_brushfire);
      preGameSetup(deck);
      const newSocket = await io(`http://localhost:8080`);
      setSocket(newSocket);
    })();
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    let username = state.name;
    let roomID = state.roomID;
    socket.emit('userJoinRoom', { username, roomID });

    socket.on('message', (msg) => {
      if (msg === 'full') {
        navigate('/room-full');
      } else {
        console.log(msg);
      }
    });

    // socket.on('player-name', (id) => {
    //   setOpponentName(id.substring(0, 5));
    //   socket.emit('other-player-name', socket.id);
    // });
    // socket.on('other-player-name', (id) => setOpponentName(id.substring(0, 5)));

    // socket.on('opponent-played-card', (board) => {
    //   const { deck, hand, active, bench, prizes, discard } = board;
    //   setOpponentDeck(deck);
    //   setOpponentHand(hand);
    //   setOpponentActive(active);
    //   setOpponentBench(bench);
    //   setOpponentPrizes(prizes);
    //   setOpponentDiscard(discard);
    // });

    // socket.on('player-left', (id) => {
    //   setOpponentActive(null);
    //   setOpponentBench([]);
    // });

    socket.on('leaveRoom');
  }, [socket]);

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
      <AttackModal show={show} handleClose={handleClose} selected={selected} />
      <div className="bg-dark d-flex flex-column w-25 h-100">
        <div className="bg-light d-flex flex-column m-1 p-1 h-25 border border-secondary border-2 rounded">
          <span>
            <strong>{yourName}</strong>
          </span>
          <span>Cards in deck: {deck.cards?.length}</span>
          <span>Prize cards: {prizes.length}</span>
          <span>Cards in hand: {hand.length}</span>
          <span>Cards in discard: {discard.length}</span>
        </div>
        <div className="bg-light d-flex flex-column m-1 p-2 h-25 border border-secondary border-2 rounded">
          <span>
            <strong>{opponentName || 'Waiting on opponent...'}</strong>
          </span>
          <span>Cards in deck: {opponentDeck.cards?.length}</span>
          <span>Prize cards: {opponentPrizes.length}</span>
          <span>Cards in hand: {opponentHand.length}</span>
          <span>Cards in discard: {opponentDiscard.length}</span>
        </div>
        <div className="bg-light d-flex flex-column m-1 p-2 h-50 border border-secondary border-2 rounded">
          <InfoPanel
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            usesTargeting={usesTargeting}
            setUsesTargeting={setUsesTargeting}
            deck={deck}
            hand={hand}
            active={active}
            setActive={setActive}
            bench={bench}
            setBench={setBench}
            prizes={prizes}
            discard={discard}
            socket={socket}
          />
        </div>
      </div>
      <Container
        fluid
        className="bg-dark py-1 d-flex flex-column h-100 w-100"
        style={{ zIndex: 1 }}
      >
        <div className="bg-light p-2 d-flex flex-column justify-content-between h-100 w-100 border border-secondary border-3 rounded">
          <OpponentBench opponentBench={opponentBench} />
          <OpponentActive opponentActive={opponentActive} />
          <hr className="m-0" />
          <Active
            hand={hand}
            active={active}
            setActive={setActive}
            bench={bench}
            deck={deck}
            prizes={prizes}
            discard={discard}
            selected={selected}
            setSelected={setSelected}
            setSelectedIndex={setSelectedIndex}
            setShow={setShow}
            setUsesTargeting={setUsesTargeting}
            socket
          />
          <Bench
            hand={hand}
            active={active}
            bench={bench}
            deck={deck}
            prizes={prizes}
            discard={discard}
            setBench={setBench}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setUsesTargeting={setUsesTargeting}
            socket
          />
        </div>
        <div className="mt-2 bg-primary border border-2 rounded h-25 w-100">
          <Hand
            hand={hand}
            setSelected={setSelected}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
      </Container>
    </Container>
  );
}
