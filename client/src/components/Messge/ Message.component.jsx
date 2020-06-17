import React from "react";

import "./Message.styles.scss";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer">
      <p>{name}</p>
      <div className="messageBox alert alert-primary ml-2">{text}</div>
    </div>
  ) : (
    <div className="messageContainer justify-content-start">
      <div className="messageBox alert alert-success">{text}</div>
      <p className="sentText pl-2 text-capitalize">{user}</p>
    </div>
  );
};

export default Message;
