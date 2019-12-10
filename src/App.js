import React from "react";
import Home from "./pages/Home";
import HuaRongDao from "./pages/HuaRongDao";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/hua-rong-dao" component={HuaRongDao} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
