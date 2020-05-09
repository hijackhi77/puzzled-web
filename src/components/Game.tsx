import React, { Component } from "react"
import "./Game.css"
import Board from "./Board"
import HuarongDaoBoard from "./HuarongDaoBoard"
import EightQueensBoard from "./EightQueensBoard"

type GameProps = {
  boardType: string
}

class Game extends Component<GameProps, any> {
  constructor(props: GameProps) {
    super(props)
    this.state = {}
    if (this.props.boardType === "puzzle") {
      this.state = {
        size: 3,
      }
    } else if (this.props.boardType === "huarongDao") {
      // Temporarily empty
    } else if (this.props.boardType === "eightQueens") {
      this.state = {
        size: 4,
      }
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.props.boardType === "puzzle") {
      this.setState({ size: event.target.value })
    } else if (this.props.boardType === "huarongDao") {
      // Temporarily empty
    } else if (this.props.boardType === "eightQueens") {
      console.log("Game setSize", event.target.value)
      this.setState({ size: event.target.value })
    }
  }

  renderPuzzle = (): JSX.Element => {
    return (
      <>
        <div style={{ margin: 10 }}>
          Size:
          <input
            style={{ marginLeft: 10 }}
            type="range"
            name="points"
            min="3"
            max="6"
            value={this.state.size}
            onChange={this.handleChange}
          />
          <span style={{ marginLeft: 10 }}>{this.state.size}</span>
        </div>
        <Board boardSize={this.state.size} />
      </>
    )
  }

  renderHuarongDaoBoard = (): JSX.Element => {
    return <HuarongDaoBoard />
  }

  renderEightQueensBoard = (): JSX.Element => {
    return (
      <>
        <div className="game-buttons">
          Size:
          <input
            style={{ marginLeft: 10 }}
            type="radio"
            id="4 Queens"
            name="size"
            value={4}
            onChange={this.handleChange}
            checked={parseInt(this.state.size) === 4}
          />
          <label htmlFor="4 Queens">4 Queens</label>
          <input
            type="radio"
            id="8 Queens"
            name="size"
            value={8}
            onChange={this.handleChange}
            checked={parseInt(this.state.size) === 8}
          />
          <label htmlFor="8 Queens">8 Queens</label>
        </div>
        <EightQueensBoard size={this.state.size} />
      </>
    )
  }

  render(): JSX.Element {
    let children = null
    if (this.props.boardType === "puzzle") {
      children = this.renderPuzzle()
    } else if (this.props.boardType === "huarongDao") {
      children = this.renderHuarongDaoBoard()
    } else if (this.props.boardType === "eightQueens") {
      children = this.renderEightQueensBoard()
    }
    return <div className="game">{children}</div>
  }
}

export default Game
