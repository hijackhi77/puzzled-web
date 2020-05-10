import React from "react"
import Header from "../components/Header"
import Game from "../components/Game"
import Footer from "../components/Footer"

const Homepage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Game boardType="puzzle" />
      <Footer />
    </>
  )
}

export default Homepage
