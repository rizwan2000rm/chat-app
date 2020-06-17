import React, { useState, useEffect } from "react";
// For extracting naem and room from URL
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.styles.scss";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // SERVER ENDPOINT
  const END_POINT = "localhost:5000";

  // ComponentDidMount ComponentDidUpdate equivalent from hooks
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

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages({ ...messages, message });
    });
  });

  // SENDING MSG
  const sendMsg = (event) => {
    event.preventDefault();

    if (messages) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="container">
      <div className="inner-container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMsg(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
