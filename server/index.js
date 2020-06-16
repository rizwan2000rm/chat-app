// DEPENDENCIES
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const router = require("./router");

const { addUser, removeUser, getUser, getUserInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

// INITIALIZATION
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("NEW CONNECTION");

  socket.on("login", ({ name, room }, callback) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECT");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT ${PORT}`));
