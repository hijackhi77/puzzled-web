import React, { Component } from "react"
import Board from "../components/Board"
import HuarongDaoBoard from "../components/HuarongDaoBoard"
import EightQueensBoard from "./EightQueensBoard"

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    if (this.props.boardType === "puzzle") {
      this.state.boardSize = 3
      this.setBoardSize = async (e) => {
        await this.setState({ boardSize: parseInt(e.target.value) })
        await this.refs.child.init()
      }
    } else if (this.props.boardType === "huarongDao") {
      // let children = <HuarongDaoBoard />;
      // this.state.children = children;
    } else if (this.props.boardType === "eightQueens") {
      // let children = <EightQueensBoard />;
      // this.state.children = children;
    }
  }

  render() {
    let children = null
    if (this.props.boardType === "puzzle") {
      children = (
        <div>
          <div style={{ margin: 10 }}>
            Size:
            <input
              style={{ marginLeft: 10 }}
              type="range"
              name="points"
              min="3"
              max="6"
              value={this.state.boardSize}
              onChange={this.setBoardSize}
            />
            <span style={{ marginLeft: 10 }}>{this.state.boardSize}</span>
          </div>
          <Board ref="child" boardSize={this.state.boardSize} />
        </div>
      )
    } else if (this.props.boardType === "huarongDao") {
      children = <HuarongDaoBoard />
    } else if (this.props.boardType === "eightQueens") {
      children = <EightQueensBoard />
    }

    return <div className="game">{children}</div>
  }
}

export default Game
