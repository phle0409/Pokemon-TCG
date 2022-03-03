import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function PkmnToast({ show, setShow, text }) {
  return (
    <ToastContainer className="position-absolute p-4" position="middle-end">
      <Toast
        bg="light"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg="info"
      >
        <Toast.Body className="center-text">{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
