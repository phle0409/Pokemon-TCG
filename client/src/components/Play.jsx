import React from "react";
import { io } from "socket.io-client";
import { Container } from "react-bootstrap";
import { fetchDeck } from "../utils/createDeck.js";
import { decklist_brushfire } from "../utils/precons.js";
import Hand from "./Hand.jsx";
import Bench from "./Bench.jsx";
import Active from "./Active.jsx";
import OpponentActive from "./OpponentActive.jsx";
import OpponentBench from "./OpponentBench.jsx";
import AttackModal from "./AttackModal.jsx";

export default function Play() {
  const [socket, setSocket] = React.useState(null);
  const [yourName, setYourName] = React.useState("");
  const [deck, setDeck] = React.useState([]);
  const [hand, setHand] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [bench, setBench] = React.useState([]);
  const [prizes, setPrizes] = React.useState([]);
  const [discard, setDiscard] = React.useState([]);
  const [opponentName, setOpponentName] = React.useState(
    "[Waiting on an opponent...]"
  );
  const [opponentDeck, setOpponentDeck] = React.useState([]);
  const [opponentActive, setOpponentActive] = React.useState(null);
  const [opponentHand, setOpponentHand] = React.useState([]);
  const [opponentBench, setOpponentBench] = React.useState([]);
  const [opponentPrizes, setOpponentPrizes] = React.useState([]);
  const [opponentDiscard, setOpponentDiscard] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [show, setShow] = React.useState(false);

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
    socket.on("connect", (id) => setYourName(socket.id));
    socket.on("player-joined", (id) => setOpponentName(id));
    socket.on("player-already-here", id => console.log(id));
    socket.on("opponent-played-to-active", (selectedPkmn) =>
      setOpponentActive(selectedPkmn)
    );
    socket.on("opponent-played-to-bench", (selectedPkmn) => {
      setOpponentBench([...selectedPkmn]);
    });
    socket.on("player-left", (id) => {
      setOpponentName("[Player left]");
      setOpponentActive(null);
      setOpponentBench([]);
    });
  }, [socket]);

  const preGameSetup = (deck) => {
    let openingHandBasic = false;

    while (!openingHandBasic) {
      deck.shuffle();
      const hand = deck.draw(7);
      setHand(hand);

      for (const card of hand) {
        if (
          card.supertype.includes("Pokémon") &&
          card.subtypes.includes("Basic")
        ) {
          openingHandBasic = true;
          break;
        }
      }

      if (!openingHandBasic) {
        deck.putBack(hand);
        console.log("Reshuffling...");
      }
    }
    const prizes = deck.draw(6);
    setPrizes(prizes);
    setDeck(deck);
  };

  return (
    <Container fluid className="bg-dark d-flex flex-row h-100 w-100 p-2">
      <AttackModal show={show} handleClose={handleClose} selected={selected} />
      <div className="bg-dark d-flex flex-column w-25 h-100">
        <div className="bg-light d-flex flex-column m-2 p-2 h-25 border border-secondary border-2 rounded">
          <span></span>
          <span>
            <strong>{yourName}</strong>
          </span>
          <span>Cards in deck: {deck.cards?.length}</span>
          <span>Prize cards: {prizes.length}</span>
          <span>Cards in hand: {hand.length}</span>
          <span>Cards in discard: {discard.length}</span>
        </div>
        <div className="bg-light d-flex flex-column m-2 p-2 h-25 border border-secondary border-2 rounded">
          <span>
            <strong>{opponentName}</strong>
          </span>
          <span>Cards in deck: {opponentDeck.cards?.length}</span>
          <span>Prize cards: {opponentPrizes.length}</span>
          <span>Cards in hand: {opponentHand.length}</span>
          <span>Cards in discard: {opponentDiscard.length}</span>
        </div>
        <div className="bg-light d-flex flex-column m-2 p-2 h-50 border border-secondary border-2 rounded"></div>
      </div>
      <Container fluid className="bg-dark py-2 d-flex flex-column h-100 w-100">
        <div className="bg-light d-flex flex-column p-2 justify-content-between h-100 w-100 border border-secondary border-3 rounded">
          <OpponentBench opponentBench={opponentBench} />
          <OpponentActive opponentActive={opponentActive} />
          <Active active={active} setSelected={setSelected} setShow={setShow} />
          <Bench bench={bench} setSelected={setSelected} />
        </div>
        <div className="d-flex flex-row mt-2 bg-primary border border-2 rounded w-100">
          <Hand
            hand={hand}
            active={active}
            setActive={setActive}
            bench={bench}
            setBench={setBench}
            socket={socket}
          />
        </div>
      </Container>
    </Container>
  );
}
