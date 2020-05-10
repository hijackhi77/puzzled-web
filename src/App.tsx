import React from "react"
import Homepage from "./pages/Homepage"
import HuarongDaoPage from "./pages/HuarongDaoPage"
import EightQueensPage from "./pages/EightQueensPage"
import "./App.css"
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/huarong-dao" component={HuarongDaoPage} />
          <Route path="/eight-queens-puzzle" component={EightQueensPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
