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

const players = [null, null];

io.on("connection", (socket) => {
  let player = -1;

  for (const i in players)
    if (players[i] === null) {
      player = i;
      break;
    }

  if (player === -1) return;

  players[player] = socket;
  console.log(`connected: player ${parseInt(player) + 1} ${socket.id}`);
  socket.on("player-joined", (id) => {
    socket.broadcast.emit("player-name", id);
  });

  socket.on("other-player-name", id => socket.broadcast.emit("other-player-name", id));

  socket.on("played-card", board => {
    socket.broadcast.emit("opponent-played-card", board);
  });

  socket.on("attack", damage => {
    socket.broadcast.emit("opponent-attacked-me", damage);
  })

  socket.on("disconnect", () => {
    console.log(`disconnected: player ${parseInt(player) + 1} ${socket.id}`);
    players[player] = null;
    socket.broadcast.emit("player-left", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
