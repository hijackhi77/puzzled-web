import React, { Component } from "react";
import Header from "../components/Header";
import Game from "../components/Game";
import Footer from "../components/Footer";
import "./HuarongDao.css";

class HuarongDao extends Component {
  render() {
    return (
      <>
        <Header />
        <Game boardType="huarongDao" />
        <Footer />
      </>
    );
  }
}

export default HuarongDao;
