import React, { Component } from "react"
import Header from "../components/Header"
import Game from "../components/Game"
import Footer from "../components/Footer"

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Game boardType="puzzle" />
        <Footer />
      </>
    )
  }
}

export default Home
