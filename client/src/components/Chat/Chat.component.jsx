import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.styles.scss";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  // SERVER ENDPOINT
  const END_POINT = "localhost:5000";

  useEffect(() => {
    // Getting name and room from url
    const { name, room } = queryString.parse(location.search);

    socket = io(END_POINT);

    setName(name);
    setRoom(room);

    socket.emit("login", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [END_POINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
