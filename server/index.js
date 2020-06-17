// DEPENDENCIES
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

// INITIALIZATION
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

// Socket.io
io.on("connect", (socket) => {
  // console.log("NEW CONNECTION");

  // Joining a room
  socket.on("login", ({ name, room }, callback) => {
    // console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // Welcome Message for the joined user
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, Welcome to the room ${user.room}`,
    });

    // Inform joined user to everyone else
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined the room`,
    });

    console.log(user, user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Messages from other users
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    // console.log("DISCONNECT");
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT ${PORT}`));
