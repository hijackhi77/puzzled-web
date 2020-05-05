import React, { Component } from "react"
import PuzzlePiece from "./PuzzlePiece"
import { deepcopy } from "../lib/utils.js"
import Posn from "../lib/Posn.js"
import queenImg from "../assets/queen.png"

const queenTileStyle = {
  background: "url(" + queenImg + ")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
}

type EightQueensBoardState = {
  size: number
  queens: Posn[]
  solved: boolean
}

class EightQueensBoard extends Component<any, EightQueensBoardState> {
  constructor(props: any) {
    super(props)
    this.state = {
      size: 4,
      queens: [],
      solved: false,
    }
  }

  init = () => {
    this.setState({
      queens: [],
      solved: false,
    })
  }

  isAQueen = (pos: Posn) => {
    return Posn.includes(pos, this.state.queens)
  }

  setQueen = (pos: Posn) => {
    if (this.isAQueen(pos)) return
    const { queens } = this.state
    let newQueens = deepcopy(queens)
    newQueens.push(pos)
    this.setState({ queens: newQueens })
  }

  unsetQueen = (pos: Posn) => {
    if (!this.isAQueen(pos)) return
    const { queens } = this.state
    let newQueens = []
    for (let queen of queens) {
      if (!Posn.isEqual(queen, pos)) newQueens.push(queen)
    }
    this.setState({ queens: newQueens })
  }

  toggleQueen = (pos: Posn) => {
    if (this.isAQueen(pos)) {
      this.unsetQueen(pos)
    } else {
      this.setQueen(pos)
    }
    console.log(this.state.queens)
  }

  isSolved = () => {
    const { size, queens } = this.state
    if (queens.length !== 4) return false
    let rowSeen = new Set()
    let colSeen = new Set()
    for (let queen of queens) {
      rowSeen.add(queen.row)
      colSeen.add(queen.col)
    }
    return rowSeen.size === size && colSeen.size === size
  }

  render() {
    const { size } = this.state
    let rows = []
    for (let i = 0; i < size; ++i) {
      let tableDatas = []
      for (let j = 0; j < size; ++j) {
        let tileStyle = this.isAQueen(new Posn(i, j)) ? queenTileStyle : {}
        tableDatas.push(
          <td
            style={{
              width: 100,
              height: 100,
              background: (i + j) % 2 === 0 ? "#d18b47" : "#ffce9e",
            }}
            key={j}
          >
            <PuzzlePiece
              tileId={i + "-" + j}
              pos={new Posn(i, j)}
              tileStyle={tileStyle}
              handleClick={this.toggleQueen}
              handleDragStart={() => {}}
              handleDragEnd={() => {}}
            />
          </td>
        )
      }
      let row = <tr key={i}>{tableDatas}</tr>
      rows.push(row)
    }

    let successScreen = this.isSolved() ? "Solved!" : ""

    return (
      <div className="board">
        <table>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <div className="buttons">
          <button
            onClick={() => {
              this.init()
            }}
          >
            Reset Puzzle
          </button>
        </div>
        <div>{successScreen}</div>
      </div>
    )
  }
}

export default EightQueensBoard
