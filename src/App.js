import React from "react";
import Home from "./pages/Home";
import HuarongDao from "./pages/HuarongDao";
import EightQueens from "./pages/EightQueens";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/hua-rong-dao" component={HuarongDao} />
          <Route path="/eight-queens-puzzle" component={EightQueens} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
