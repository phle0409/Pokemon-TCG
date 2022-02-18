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
  const [deck, setDeck] = React.useState(null);
  const [hand, setHand] = React.useState([]);
  const [bench, setBench] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [opponentBench, setOpponentBench] = React.useState([]);
  const [opponentActive, setOpponentActive] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(async () => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => console.log(socket.id));
    const deck = await fetchDeck(decklist_brushfire);
    deck.shuffle();
    setDeck(deck);
    const hand = deck.draw(10);
    setHand(hand);
  }, []);

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
          <Bench bench={opponentBench} />
          <Active />
          <Active active={active} setSelected={setSelected} setShow={setShow} />
          <Bench bench={bench} />
        </div>
        <div className="mb-2 bg-primary rounded w-100">
          <Hand
            hand={hand}
            active={active}
            setActive={setActive}
            bench={bench}
            setBench={setBench}
          />
        </div>
      </Container>
    </Container>
  );
}
