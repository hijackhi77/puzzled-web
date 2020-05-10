import React from "react"
import Header from "../components/Header"
import Game from "../components/Game"
import Footer from "../components/Footer"

const HuarongDaoPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Game boardType="huarongDao" />
      <Footer />
    </>
  )
}

export default HuarongDaoPage
