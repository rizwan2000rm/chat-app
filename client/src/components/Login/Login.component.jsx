import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.styles.scss";

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="login">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          className="input"
          /* eslint-disable-next-line no-restricted-globals */
          onChange={() => setName(event.target.value)}
          placeholder=""
        />
      </div>
      <div>
        <input
          type="text"
          className="input"
          /* eslint-disable-next-line no-restricted-globals */
          onChange={() => setRoom(event.target.value)}
          placeholder=""
        />
      </div>
      <Link
        to={`/chat?name=${name}&room=${room}`}
        onClick={(event) => (!name || !room ? event.preventDefault() : null)}
      >
        <button className="btn" type="submit">
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default Login;
