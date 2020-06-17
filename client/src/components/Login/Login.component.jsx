import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.styles.scss";

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="container text-center">
      <h2>Login</h2>

      <input
        type="text"
        className="form-control my-3"
        /* eslint-disable-next-line no-restricted-globals */
        onChange={() => setName(event.target.value)}
        placeholder="Name"
      />

      <input
        type="text"
        className="form-control my-3"
        /* eslint-disable-next-line no-restricted-globals */
        onChange={() => setRoom(event.target.value)}
        placeholder="Room"
      />

      <Link
        to={`/chat?name=${name}&room=${room}`}
        onClick={(event) => (!name || !room ? event.preventDefault() : null)}
      >
        <button className="btn btn btn-outline-primary" type="submit">
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default Login;
