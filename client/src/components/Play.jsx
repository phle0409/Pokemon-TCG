import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { ButtonGroup, Button, Container } from "react-bootstrap";
import { fetchDeck } from "../utils/createDeck.js";
import {
  activeToDiscard,
  benchToActive,
  discardEnergyFromActive,
  discardEnergyFromBench,
} from "../utils/changeZones.js";
import Hand from "./Hand.jsx";
import Bench from "./Bench.jsx";
import Active from "./Active.jsx";
import OpponentActive from "./OpponentActive.jsx";
import OpponentBench from "./OpponentBench.jsx";
import InfoPanel from "./InfoPanel.jsx";
import AttackModal from "./AttackModal.jsx";
import ZoneModal from "./ZoneModal.jsx";
import PkmnToast from "./PkmnToast.jsx";

export default function Play() {
  const [socket, setSocket] = React.useState(null);
  const [gameStatus, setGameStatus] = React.useState({
    gameStarted: false,
    playerTurn: "",
  });
  const [yourName, setYourName] = React.useState("You");
  const [opponentName, setOpponentName] = React.useState(
    "Waiting on opponent..."
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
  const [secondaryAction, setSecondaryAction] = React.useState("");
  const [damage, setDamage] = React.useState(0);
  const [heal, setHeal] = React.useState(0);
  const [effect, setEffect] = React.useState("");
  const [activePlayer, setActivePlayer] = React.useState(false);
  const [playedEnergy, setPlayedEnergy] = React.useState(false);
  const [endPhrase, setEndPhrase] = React.useState(false);
  const [disableAttack, setDisableAttack] = React.useState(true);
  const [disablePlayer, setDisablePlayer] = React.useState(true);
  const [disablePass, setDisablePass] = React.useState(true);

  const [damageBenched, setDamageBenched] = React.useState({
    index: null,
    damage: 0,
  });
  const [healBenched, setHealBenched] = React.useState({
    index: null,
    heal: 0,
  });
  const [retreat, setRetreat] = React.useState(false);
  const [forcedAction, setForcedAction] = React.useState({
    action: "",
    targetIndex: null,
    targetIndices: [],
  });
  const [usesTargeting, setUsesTargeting] = React.useState(false);
  const [showAttackModal, setShowAttackModal] = React.useState(false);
  const [zoneModal, setZoneModal] = React.useState({
    cards: [],
    zone: "",
    show: false,
    numTargets: 0,
    action: null,
    index: null,
  });
  const [toast, setToast] = React.useState({
    text: "",
    show: false,
  });
  let navigate = useNavigate();
  const { state } = useLocation();

  const handleCloseAttackModal = () => {
    setShowAttackModal(false);
    setSelected(null);
  };

  const handleShowAttackModal = () => setShowAttackModal(true);
  const handleCloseZoneModal = () => setZoneModal({ show: false });

  const handleCloseToast = () => {
    setToast({
      show: false,
    });
  };

  React.useEffect(() => {
    let decklist = state.decklist;
    setToast({
      text: "Shuffling deck...",
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

    socket.on("connect", (id) => {
      setYourName(username);
      socket.emit("userJoinRoom", { username, roomID });
    });

    socket.on("message", (msg) => {
      if (msg === "full") {
        navigate("/room-full");
      } else {
        socket.emit("player-joined", username);
      }
    });

    socket.on("player-name", (oppname) => {
      setOpponentName(oppname);
      socket.emit("other-player-name", username);
      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench,
        prizes,
        discard,
      });
    });
    socket.on("other-player-name", (oppname) => {
      setOpponentName(oppname);
      socket.emit("played-card", {
        deck,
        hand,
        active,
        bench,
        prizes,
        discard,
      });
    });

    socket.on("opponent-played-card", (board) => {
      const { deck, hand, active, bench, prizes, discard } = board;
      if (deck) setOpponentDeck(deck);
      if (hand) setOpponentHand(hand);
      if (active) setOpponentActive(active);
      if (bench) setOpponentBench(bench);
      if (prizes) setOpponentPrizes(prizes);
      if (discard) setOpponentDiscard(discard);
    });

    socket.on("active-user", ({ activeId, firstTurn }) => {
      // If active user
      if (socket.id === activeId) {
        setToast({ show: true, text: "It's your turn." });

        // set active user
        setToast({
          show: true,
          text: "Your turn",
        });
        setActivePlayer(true);
        setPlayedEnergy(false);
        if (!firstTurn) setDisableAttack(false);

        setDisablePass(false);
        setDisablePlayer(false);

        // TODO: Check effect
      } else {
        if (firstTurn) {
          setDisablePlayer(false);
        }
        setDisablePass(true);
        setActivePlayer(false);
      }
    });

    socket.on("opponent-attacked", ({ actualDamage, effectSkill }) => {
      console.log(`opponent damage ${actualDamage} effect ${effectSkill}`);
      if (!actualDamage) actualDamage = 0;

      setDamage(actualDamage);
      if (effectSkill) {
        setEffect(effectSkill);
      }
    });

    socket.on("knockout", () => {
      let newPrizes = prizes;
      let prize = newPrizes.pop();
      let newHand = [...hand, prize];
      setHand(newHand);
      setPrizes(newPrizes);

      socket.emit("played-card", {
        deck,
        hand: newHand,
        active,
        bench,
        prizes: newPrizes,
        discard,
      });
    });

    socket.on("lass", () => {
      let trainers = [];
      let indices = [];
      hand.forEach((card, i) => {
        if (card.supertype === "Trainer") {
          trainers.push(card);
          indices.push(i);
        }
      });

      let newHand = hand;
      indices.sort().reverse();
      for (let i = 0; i < indices.length; i++) {
        newHand.splice(indices[i], 1);
      }
      setHand(newHand);
      deck.putBack(trainers);
      deck.shuffle();
      //TODO it's not emitting the new board state

      socket.emit("reveal-hand", hand);
    });

    socket.on("reveal-hand", (hand) => {
      setZoneModal({
        show: true,
        zone: "Your opponent's hand",
        numTargets: 0,
        cards: hand,
      });
    });

    socket.on("forced-retreat", (index) => {
      setForcedAction({
        action: "forced-retreat",
        targetIndex: index,
      });
    });

    socket.on("forced-energy-discard-active", (multiSelect) => {
      setForcedAction({
        action: "forced-energy-discard-active",
        indices: multiSelect,
      });
    });

    socket.on("forced-energy-discard-bench", (multiSelect, benchIndex) => {
      setForcedAction({
        action: "forced-energy-discard-bench",
        targetIndex: benchIndex,
        indices: multiSelect,
      });
    });

    socket.on("toast", (message) => {
      setToast({
        text: message,
        show: true,
      });
    });

    socket.on("player-left", ({ username, id }) => {
      setOpponentActive(null);
      setOpponentBench([]);
    });
  }, [socket]);

  React.useEffect(() => {
    if (activePlayer) {
      document.querySelector(".current-player-border").style.backgroundColor =
        "#89c499";
      document.querySelector(".opponent-player-border").style.backgroundColor =
        "#ffffff";
    } else {
      document.querySelector(".opponent-player-border").style.backgroundColor =
        "#89c499";
      document.querySelector(".current-player-border").style.backgroundColor =
        "#ffffff";
    }
  }, [activePlayer]);

  React.useEffect(() => {
    if (forcedAction.action === "") return;
    else if (forcedAction.action === "forced-retreat") {
      const [newActive, newBench] = benchToActive(
        bench,
        forcedAction.targetIndex,
        setBench,
        active,
        setActive
      );

      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench: newBench,
        prizes,
        discard,
      });
    } else if (forcedAction.action === "forced-energy-discard-active") {
      const [newActive, newDiscard] = discardEnergyFromActive(
        forcedAction.indices,
        active,
        setActive,
        discard,
        setDiscard
      );
      socket.emit({
        deck,
        hand,
        active: newActive,
        bench,
        discard: newDiscard,
        prizes,
      });
    } else if (forcedAction.action === "forced-energy-discard-bench") {
      const [newBench, newDiscard] = discardEnergyFromBench(
        forcedAction.indices,
        bench,
        forcedAction.targetIndex,
        setBench,
        discard,
        setDiscard
      );
      socket.emit({
        deck,
        hand,
        active,
        bench: newBench,
        discard: newDiscard,
        prizes,
      });
    }
    setForcedAction({
      action: "",
      targetIndex: null,
      indices: [],
    });
  }, [forcedAction.action]);

  React.useEffect(() => {
    if (!endPhrase) return;

    socket.emit("end-phrase", socket.id);
    setDisablePlayer(true);

    setEndPhrase(false);
  }, [endPhrase]);

  React.useEffect(() => {
    if (deck === undefined || deck.cards?.length === 0) return;

    if (activePlayer) {
      const card = deck.draw(1);
      setHand([...hand, ...card]);
    }
  }, [activePlayer, setActivePlayer]);

  React.useEffect(() => {
    if (damage === 0) return;
    let newActive = active;
    // Check if pokemon has immortal effect.
    if (newActive.effects.statusConditions.immortal === true) {
      socket.emit("toast", `${newActive.name} was unaffected`);
      newActive.effects.statusConditions.immortal = false;
      setActive(newActive);
      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard,
      });
      setDamage(0);
      return;
    }
    newActive.effects.damage += parseInt(damage);

    if (parseInt(newActive.effects.damage) >= parseInt(newActive.hp)) {
      socket.emit("toast", `${yourName}'s ${active.name} was knocked out!`);
      socket.emit("knockout");
      const [newActive, newDiscard] = activeToDiscard(
        active,
        setActive,
        discard,
        setDiscard
      );
      if (bench.length > 0) setRetreat(true);
      else
        socket.emit(
          "toast",
          `${yourName} has no more benched Pokemon. ${opponentName} wins!`
        );

      socket.emit("played-card", {
        deck,
        hand,
        active: newActive,
        bench,
        prizes,
        discard: newDiscard,
      });
    } else {
      setActive(newActive);
      socket.emit("played-card", {
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
    socket.emit("played-card", {
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
    if (effect === "" || !active) return;
    let newActive = active;

    let damageEffect = damage;
    if (!damageEffect) damageEffect = 0;

    switch (effect) {
      case "posion":
        newActive.effects.statusConditions.poisoned = true;
        newActive.effects.statusConditions.posionedDamage = damageEffect;
        break;
      case "paralyzed":
        newActive.effects.statusConditions.paralyzed = true;
        newActive.effects.statusConditions.paralyzedDamage = damageEffect;
        break;
      case "confused":
        newActive.effects.statusConditions.confused = true;
        break;
      case "immortal":
        newActive.effects.statusConditions.immortal = true;
        break;
      default:
        newActive.effects.statusConditions.asleep = true;
    }

    setActive(newActive);

    socket.emit("played-card", {
      deck,
      hand,
      active: newActive,
      bench,
      prizes,
      discard,
    });

    setEffect("");
  }, [effect]);

  React.useEffect(() => {
    if (healBenched.heal === 0 || healBenched.index === null) return;
    let benched = bench[healBenched.index];
    if (benched.effects.damage - healBenched.heal < 0)
      benched.effects.damage = 0;
    else benched.effects.damage -= healBenched.heal;
    let newBench = bench;
    newBench.splice(healBenched.index, 1);
    setBench([...newBench, benched]);

    socket.emit("played-card", {
      deck,
      hand,
      active,
      bench: newBench,
      prizes,
      discard,
    });
    setHealBenched({ index: null, heal: 0 });
  }, [healBenched]);

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
    if (secondaryAction === "") return;
    else if (secondaryAction === "search deck") {
      setZoneModal({
        show: true,
        zone: "Select 1 card from your deck to put into your hand",
        numTargets: 1,
        cards: deck.cards,
        action: "search deck",
      });
    }

    setSecondaryAction("");
  }, [secondaryAction]);

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
    <Container
      fluid
      className="bg-dark d-flex flex-row h-100 w-100 p-1"
      style={{ overflow: "hidden" }}
    >
      <AttackModal
        show={showAttackModal}
        handleClose={handleCloseAttackModal}
        selected={selected}
        setSelected={setSelected}
        setDamage={setDamage}
        setRetreat={setRetreat}
        setSelectedIndex={setSelectedIndex}
        setUsesTargeting={setUsesTargeting}
        setHeal={setHeal}
        setEffect={setEffect}
        socket={socket}
        setToast={setToast}
        setZoneModal={setZoneModal}
        setEndPhrase={setEndPhrase}
        disableAttack={disableAttack}
        disablePass={disablePass}
        opponentActive={opponentActive}
      />
      <ZoneModal
        show={zoneModal.show}
        handleClose={handleCloseZoneModal}
        numTargets={zoneModal.numTargets}
        zone={zoneModal.zone}
        cards={zoneModal.cards}
        action={zoneModal.action}
        index={zoneModal.index}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setSelected={setSelected}
        setUsesTargeting={setUsesTargeting}
        multiSelect={multiSelect}
        setMultiSelect={setMultiSelect}
        setSecondaryAction={setSecondaryAction}
        deck={deck}
        setDeck={setDeck}
        hand={hand}
        setHand={setHand}
        active={active}
        setActive={setActive}
        bench={bench}
        setBench={setBench}
        discard={discard}
        setDiscard={setDiscard}
        prizes={prizes}
        socket={socket}
      />
      <div className="side-panel bg-dark d-flex flex-column h-100">
        <div
          className={`
         d-flex flex-column justify-content-between m-1 p-2 border border-2 border-secondary rounded current-player-border`}
        >
          <span className="mb-2">
            <strong>{yourName}</strong>
          </span>
          <ButtonGroup size="sm">
            <Button>
              <i className="bi bi-box"></i> {deck?.cards?.length}
            </Button>
            <Button>
              <i className="bi bi-square"></i> {hand?.length}
            </Button>
            <Button
              onClick={() => {
                setZoneModal({
                  show: true,
                  zone: "Your discard pile",
                  numTargets: 0,
                  cards: discard,
                });
              }}
            >
              <i className="bi bi-arrow-down-circle"></i> {discard?.length}
            </Button>
            <Button>
              <i className="bi bi-star"></i> {prizes?.length}
            </Button>
          </ButtonGroup>
        </div>
        <div className="d-flex flex-column justify-content-between m-1 p-2 border border-secondary border-2 rounded  opponent-player-border">
          <span className="mb-2">
            <strong>{opponentName}</strong>
          </span>
          <ButtonGroup size="sm" variant="dark">
            <Button>
              <i className="bi bi-box"></i> {opponentDeck?.cards?.length || "0"}
            </Button>
            <Button>
              <i className="bi bi-square"></i> {opponentHand?.length}
            </Button>
            <Button
              onClick={() => {
                setZoneModal({
                  show: true,
                  zone: "Your opponent's discard pile",
                  numTargets: 0,
                  cards: opponentDiscard,
                });
              }}
            >
              <i className="bi bi-arrow-down-circle"></i>{" "}
              {opponentDiscard?.length}
            </Button>
            <Button>
              <i className="bi bi-star"></i> {opponentPrizes?.length}
            </Button>
          </ButtonGroup>
        </div>
        <div className="bg-light d-flex flex-column flex-grow-1 m-1 p-2 border border-secondary border-2 rounded">
          <InfoPanel
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            usesTargeting={usesTargeting}
            setUsesTargeting={setUsesTargeting}
            retreat={retreat}
            setRetreat={setRetreat}
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
            setToast={setToast}
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
            opponentActive={opponentActive}
            opponentBench={opponentBench}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setUsesTargeting={setUsesTargeting}
            deck={deck}
            hand={hand}
            setHand={setHand}
            active={active}
            discard={discard}
            setDiscard={setDiscard}
            prizes={prizes}
            yourName={yourName}
            setToast={setToast}
            setZoneModal={setZoneModal}
            socket={socket}
          />
          <OpponentActive
            opponentActive={opponentActive}
            deck={deck}
            hand={hand}
            setHand={setHand}
            active={active}
            bench={bench}
            discard={discard}
            setDiscard={setDiscard}
            prizes={prizes}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setUsesTargeting={setUsesTargeting}
            setZoneModal={setZoneModal}
            setToast={setToast}
            yourName={yourName}
            socket={socket}
          />
          <hr className="m-0" />
          <Active
            deck={deck}
            setDeck={setDeck}
            hand={hand}
            setHand={setHand}
            active={active}
            setActive={setActive}
            bench={bench}
            setBench={setBench}
            discard={discard}
            setDiscard={setDiscard}
            prizes={prizes}
            setPrizes={setPrizes}
            selected={selected}
            setSelected={setSelected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setShow={setShowAttackModal}
            setUsesTargeting={setUsesTargeting}
            setToast={setToast}
            retreat={retreat}
            yourName={yourName}
            setHeal={setHeal}
            setZoneModal={setZoneModal}
            socket={socket}
            disablePlayer={disablePlayer}
            playedEnergy={playedEnergy}
            setPlayedEnergy={setPlayedEnergy}
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
            setHealBenched={setHealBenched}
            setToast={setToast}
            retreat={retreat}
            setRetreat={setRetreat}
            yourName={yourName}
            setZoneModal={setZoneModal}
            socket={socket}
            disablePlayer={disablePlayer}
            playedEnergy={playedEnergy}
            setPlayedEnergy={setPlayedEnergy}
          />
        </div>
        <div className="d-flex justify-content-center mt-2 bg-primary border border-2 rounded h-25 w-100">
          <Hand
            hand={hand}
            setHand={setHand}
            setSelected={setSelected}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            retreat={retreat}
            setRetreat={setRetreat}
            setToast={setToast}
            disablePlayer={disablePlayer}
          />
        </div>
      </Container>
    </Container>
  );
}
