import React from "react"
import Header from "../components/Header"
import Game from "../components/Game"
import Footer from "../components/Footer"

const EightQueensPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Game boardType="eightQueens" />
      <Footer />
    </>
  )
}

export default EightQueensPage
