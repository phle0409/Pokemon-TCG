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
  getAllUsersByRoom,
  flipCoin,
  getIdOpponentInRoom,
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
      socket.emit("message", "join");

      if (isRoomFull(roomID)) {
        let users = getAllUsersByRoom(roomID);
        let firstTurn = true;
        if (users) {
          let activeId = users[0].id;
          if (!flipCoin()) {
            activeId = users[1].id;
          }
          io.to(roomID).emit("active-user", {
            activeId,
            firstTurn,
          });
        }
      }
    }

    socket.on("end-phrase", (id) => {
      let activeId = getIdOpponentInRoom(id);
      let firstTurn = false;
      io.to(getUserByID(socket.id).roomID).emit("active-user", {
        activeId,
        firstTurn,
      });
    });

    socket.on("player-joined", (id) => {
      const user = getUserByID(socket.id);
      if (user) {
        socket.broadcast.to(user.roomID).emit("player-name", id);
      }
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

    socket.on("attack", ({ actualDamage, effectSkill }) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)

        .emit("opponent-attacked", { actualDamage, effectSkill });
    });

    socket.on("lass", () => {
      io.to(getUserByID(socket.id).roomID).emit("lass");
    });

    socket.on("reveal-hand", (hand) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("reveal-hand", hand);
    });

    socket.on("forced-energy-discard-active", (indices) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("forced-energy-discard-active", indices);
    });

    socket.on("forced-energy-discard-bench", (indices, benchIndex) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("forced-energy-discard-bench", indices, benchIndex);
    });

    socket.on("forced-retreat", (index) => {
      socket.broadcast
        .to(getUserByID(socket.id).roomID)
        .emit("forced-retreat", index);
    });

    socket.on("knockout", () => {
      socket.broadcast.to(getUserByID(socket.id).roomID).emit("knockout");
    });
  });

  socket.on("disconnect", () => {
    const user = userLeaveRoom(socket.id);
    if (user) {
      io.to(user.roomID).emit("player-left", {
        username: user.username,
        id: user.id,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
