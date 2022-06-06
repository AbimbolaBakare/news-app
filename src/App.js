import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Article } from "./pages/Article";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/article" exact component={Article} />
      </Switch>
    </Router>
  );
}

export default App;
