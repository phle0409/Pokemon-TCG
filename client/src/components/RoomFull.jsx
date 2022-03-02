import { Container, Modal, Button } from 'react-bootstrap';

const RoomFull = () => {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Room Full</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          The room is full. Please go back to home page and choose another room.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <div>
          <a href="/" className="btn btn-primary">
            Back To Home
          </a>
        </div>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default RoomFull;
