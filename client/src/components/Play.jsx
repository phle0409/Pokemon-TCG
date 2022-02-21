import React from "react";
import { io } from "socket.io-client";
import { Button, Container } from "react-bootstrap";
import { fetchDeck } from "../utils/createDeck.js";
import { decklist_brushfire } from "../utils/precons.js";
import Hand from "./Hand.jsx";
import Bench from "./Bench.jsx";
import Active from "./Active.jsx";
import AttackModal from "./AttackModal.jsx";

export default function Play() {
  const [socket, setSocket] = React.useState(null);
  const [deck, setDeck] = React.useState(null);
  const [hand, setHand] = React.useState([]);
  const [bench, setBench] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [opponentBench, setOpponentBench] = React.useState([]);
  const [opponentActive, setOpponentActive] = React.useState(null);
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
    socket.on("connect", () => console.log(socket.id));
    socket.on("player-joined", (id) => alert(`${id} has joined`));
    socket.on("opponent-played-to-active", (selectedPkmn) =>
      setOpponentActive(selectedPkmn)
    );
    socket.on("opponent-played-to-bench", (selectedPkmn) => {
      setOpponentBench([...selectedPkmn]);
    });
    socket.on("player-left", (id) => {
      alert(`${id} has left`);
      setOpponentActive(null);
      setOpponentBench([]);
    });
  }, [socket]);

  const preGameSetup = (deck) => {
    let openingHandBasic = false;

    while (!openingHandBasic) {
      deck.shuffle();
      const hand = deck.draw(10);
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
    setDeck(deck);
  };

  return (
    <Container fluid className="bg-dark h-100 w-100 p-0">
      <Button
        className="position-absolute top-0 left-0 m-4"
        href="/"
        variant="danger"
      >
        Forfeit
      </Button>
      <AttackModal show={show} handleClose={handleClose} selected={selected} />
      <Container
        fluid
        className="bg-dark d-flex flex-column align-items-center h-100 w-100"
      >
        <div className="bg-light m-2 p-2 d-flex flex-column justify-content-between h-100 w-100 border border-dark rounded">
          <Bench bench={opponentBench} yourCard={false} />
          <Active active={opponentActive} yourCard={false} />
          <Active
            active={active}
            setSelected={setSelected}
            setShow={setShow}
            yourCard={true}
          />
          <Bench bench={bench} setSelected={setSelected} yourCard={true} />
        </div>
        <div className="mb-2 bg-primary rounded w-100">
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
