import React from 'react';
import { io } from "socket.io-client";
import { Button, Container } from "react-bootstrap";

export default function Play() {
  React.useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => console.log(socket.id));
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center h-100">
        <Button href="/">Back</Button>
    </Container>
  )
}
