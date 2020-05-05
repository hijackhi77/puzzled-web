import React, { Component } from "react"
import Header from "../components/Header"
import Game from "../components/Game"
import Footer from "../components/Footer"

class EightQueens extends Component {
  render() {
    return (
      <>
        <Header />
        <Game boardType="eightQueens" />
        <Footer />
      </>
    )
  }
}

export default EightQueens
