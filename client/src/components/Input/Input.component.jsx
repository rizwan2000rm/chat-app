import React from "react";

import "./Input.styles.scss";

const Input = ({ message, setMessage, sendMsg }) => (
  <form className="form">
    <input
      type="text"
      className="form-control"
      placeholder="Type a message"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMsg(event) : null)}
    />
    <button
      className="btn btn-outline-primary"
      onClick={(event) => sendMsg(event)}
    >
      Send
    </button>
  </form>
);

export default Input;
