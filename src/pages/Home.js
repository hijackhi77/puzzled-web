import React, { Component } from "react";
import Header from "../components/Header";
import Game from "../components/Game";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Game />
      </>
    );
  }
}

export default Home;
