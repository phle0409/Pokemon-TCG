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
  const promise = await axios("https://api.pokemontcg.io/v2/cards?q=set.id:base1", {
    "X-Api-Key": PKMN_API_KEY,
  })
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
  console.log(`connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
