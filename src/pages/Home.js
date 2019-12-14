import React, { Component } from "react";
import Header from "../components/Header";
import Game from "../components/Game";
import Footer from "../components/Footer";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Game />
        <Footer />
      </>
    );
  }
}

export default Home;
