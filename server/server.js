const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const PKMN_API_KEY = process.env.PKMN_API_KEY;

// user
const {
  isRoomFull,
  userJoinRoom,
  userLeaveRoom,
  getUserByID,
} = require("./users/users");

app.use(cors());

app.get("/cards", async (req, res) => {
  const promise = await axios(
    "https://api.pokemontcg.io/v2/cards?q=set.id:base1",
    {
      "X-Api-Key": PKMN_API_KEY,
    }
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send(promise);
});

const io = socketio(server, {
  cors: true,
  origins: ["http://localhost:3000"],
});

io.on("connection", (socket) => {
  let roomID = null;
  socket.on("userJoinRoom", ({ username, roomID }) => {
    if (isRoomFull(roomID)) {
      socket.emit("message", "full");
    } else {
      const user = userJoinRoom(socket.id, username, roomID);
      // join room
      socket.join(user.roomID);
      socket.emit(
        "message",
        `Welcome to room: ${roomID}\nusername: ${username}`
      );
    }

    socket.on("player-joined", (id) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("player-name", id);
    });

    socket.on("other-player-name", (id) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("other-player-name", id);
    });

    socket.on("played-card", (board) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("opponent-played-card", board);
    });

    socket.on("toast", (message) => {
      io.to(getUserByID(socket.id).roomID).emit("toast", message);
    });

    socket.on("attack", (attack) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("opponent-attacked", attack);
    });

    socket.on("knockout", () => {
      socket.broadcast.to(getUserByID(socket.id).roomID).emit("knockout");
    })
  });

  socket.on("disconnect", () => {
    const user = userLeaveRoom(socket.id);
    io.to(user.roomID).emit("player-left", {
      username: user.username,
      id: user.id,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
