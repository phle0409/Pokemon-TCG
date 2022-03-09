import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PrePage = () => {
  const [isMissing, setIsMissing] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  let navigate = useNavigate();
  let selectedDeck = "";

  const handleClick = (deckName) => {
    selectedDeck = deckName;
    const desk = document.querySelector(`#pre-deck-${deckName}`);
    const preDesksBackground = document.querySelectorAll(".pre-deck");

    preDesksBackground.forEach((desk) => {
      desk.style.backgroundColor = "#ffffff";
    });
    desk.style.backgroundColor = "#a6f2ff";
  };

  const handleMouseEnter = (deckName) => {
    const desk = document.querySelector(`#pre-deck-${deckName}`);
    if (desk.style.backgroundColor !== "rgb(166, 242, 255)") {
      desk.style.backgroundColor = "#f2d2bd";
    }
  };
  const handleMouseLeave = (deckName) => {
    const desk = document.querySelector(`#pre-deck-${deckName}`);
    if (desk.style.backgroundColor !== "rgb(166, 242, 255)") {
      desk.style.backgroundColor = "#ffffff";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username");
    const room = document.querySelector("#roomID").value;
    if (
      !selectedDeck ||
      !username ||
      username.value === "" ||
      room === "Choose Room"
    ) {
      setIsMissing(true);
      const preDesksBackground = document.querySelectorAll(".pre-deck");

      preDesksBackground.forEach((desk) => {
        desk.style.backgroundColor = "#ffffff";
      });
      if (selectedDeck) {
        setWarningMessage("Please provide username and room name");
      } else if (username && room !== "Choose Room") {
        setWarningMessage("Please select deck again");
      } else {
        setWarningMessage("Please select deck");
      }
    } else {
      setIsMissing(false);
      console.log(selectedDeck);
      navigate("/play", {
        state: { decklist: selectedDeck, name: username.value, roomID: room },
      });
    }
  };

  return (
    <Container
      fluid
      className="main-content d-flex flex-column align-items-center h-100 w-100 justify-content-center bg-light"
    >
      <Container className="d-flex flex-column justify-content-around border border-2 border-secondary rounded bg-light text-center">
        <div className="my-2">
          <h1 className="text-center text-info">
            <img
              className="img-fluid"
              src={require("../images/how_to_play/Snorlax.ico")}
              width="60px"
              alt="dragon"
            />
            Pokémon TCG
            <img
              className="img-fluid"
              src={require("../images/how_to_play/Leafeon.ico")}
              width="60px"
              alt="dragon"
            />
          </h1>
        </div>
        <h3 className="text-center">Select Deck</h3>
        <Container className="d-flex flex-row justify-content-center bg-light border border-secondary p-0 rounded">
          <div
            onClick={(e) => handleClick("brush")}
            onMouseEnter={(e) => handleMouseEnter("brush")}
            onMouseLeave={(e) => handleMouseLeave("brush")}
            className="d-flex align-items-center justify-content-center pre-deck"
            id="pre-deck-brush"
          >
            <img
              className="pre-deck m-2"
              src={require("../images/how_to_play/brushfire.png")}
              alt="Brushfire_Deck"
            />
          </div>
          <div
            onClick={(e) => handleClick("black")}
            onMouseEnter={(e) => handleMouseEnter("black")}
            onMouseLeave={(e) => handleMouseLeave("black")}
            className="d-flex align-items-center justify-content-center pre-deck"
            id="pre-deck-black"
          >
            <img
              className="pre-deck m-2"
              src={require("../images/how_to_play/blackout.png")}
              alt="Brushfire_Deck"
            />
          </div>
          <div
            onClick={(e) => handleClick("overgrowth")}
            onMouseEnter={(e) => handleMouseEnter("overgrowth")}
            onMouseLeave={(e) => handleMouseLeave("overgrowth")}
            className="d-flex align-items-center justify-content-center pre-deck"
            id="pre-deck-overgrowth"
          >
            <img
              className="pre-deck m-2"
              src={require("../images/how_to_play/overgrowth.png")}
              alt="Brushfire_Deck"
            />
          </div>
          <div
            onClick={(e) => handleClick("zap")}
            onMouseEnter={(e) => handleMouseEnter("zap")}
            onMouseLeave={(e) => handleMouseLeave("zap")}
            className="d-flex align-items-center justify-content-center rounded pre-deck"
            id="pre-deck-zap"
          >
            <img
              className="pre-deck m-2"
              src={require("../images/how_to_play/zap.png")}
              alt="Brushfire_Deck"
            />
          </div>
        </Container>
        <Container className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit} className="form-container">
            <Form.Group className="my-2" controlId="username">
              <Form.Label>
                <strong>Username</strong>
              </Form.Label>
              <Form.Control type="text" placeholder="e.g. Doug" />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>
                <strong>Room</strong>
              </Form.Label>
              <Form.Select aria-label="Default select example" id="roomID">
                <option>Select room</option>
                <option value="1">Red</option>
                <option value="2">Lucas</option>
                <option value="3">Ethan</option>
                <option value="4">Grant</option>
                <option value="5">Viola</option>
                <option value="6">Korrina</option>
                <option value="7">Ramos</option>
              </Form.Select>
            </Form.Group>
            <div className="my-3">
              <Button className="w-50" variant="primary" type="submit">
                Submit
              </Button>
              <Button
                className="w-50"
                href="/how-to-play"
                variant="outline-secondary"
              >
                How to Play
              </Button>
            </div>
            {isMissing && (
              <div className="text-danger text-center mb-2">
                {warningMessage}
              </div>
            )}
          </Form>
        </Container>
      </Container>
    </Container>
  );
};

export default PrePage;
