import React from "react";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="d-flex align-items-center justify-content-center h-100">
      <Button href="/play">Play</Button>
      <Button href="/how-to-play" variant="outline-secondary">How to Play</Button>
    </Container>
  );
}
