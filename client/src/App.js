import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/Login.component";
import Chat from "./components/Chat/Chat.component";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
};

export default App;
