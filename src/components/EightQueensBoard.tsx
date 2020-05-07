import React, { Component } from "react"
import PuzzlePiece from "./PuzzlePiece"
import { deepcopy } from "../lib/utils.js"
import Posn from "../lib/Posn.js"
import queenImg from "../assets/queen.png"

const queenTileStyle: React.CSSProperties = {
  background: "url(" + queenImg + ")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
}

type EightQueensBoardProps = {
  size: number
}

type EightQueensBoardState = {
  queens: Posn[]
  tileStyles: React.CSSProperties[][]
}

class EightQueensBoard extends Component<
  EightQueensBoardProps,
  EightQueensBoardState
> {
  tileStylesTracker: React.CSSProperties[][] = []

  constructor(props: EightQueensBoardProps) {
    super(props)
    const { size } = this.props
    for (let i = 0; i < size; ++i) {
      let rowStyles: React.CSSProperties[] = []
      for (let j = 0; j < size; ++j) rowStyles.push({})
      this.tileStylesTracker.push(rowStyles)
    }
    this.state = {
      queens: [],
      tileStyles: this.tileStylesTracker,
    }
  }

  init = (): void => {
    const { size } = this.props
    this.tileStylesTracker = []
    for (let i = 0; i < size; ++i) {
      let rowStyles: React.CSSProperties[] = []
      for (let j = 0; j < size; ++j) rowStyles.push({})
      this.tileStylesTracker.push(rowStyles)
    }

    this.setState({
      queens: [],
      tileStyles: this.tileStylesTracker,
    })
  }

  isAQueen = (pos: Posn): boolean => {
    return Posn.includes(pos, this.state.queens)
  }

  setQueen = (pos: Posn): void => {
    if (this.isAQueen(pos)) return
    const { queens } = this.state
    let newQueens = deepcopy(queens)
    newQueens.push(pos)
    this.tileStylesTracker[pos.row][pos.col] = queenTileStyle
    this.setState({
      queens: newQueens,
      tileStyles: this.tileStylesTracker,
    })
  }

  unsetQueen = (pos: Posn): void => {
    if (!this.isAQueen(pos)) return
    const { queens } = this.state
    let newQueens = []
    for (let queen of queens) {
      if (!Posn.isEqual(queen, pos)) newQueens.push(queen)
    }
    this.tileStylesTracker[pos.row][pos.col] = {}
    this.setState({
      queens: newQueens,
      tileStyles: this.tileStylesTracker,
    })
  }

  getCol = (pos: Posn): Posn[] => {
    const { size } = this.props
    let posArray: Posn[] = []
    for (let i = 0; i < size; ++i) {
      posArray.push(new Posn(pos.col, i))
    }
    return posArray
  }

  getRow = (pos: Posn): Posn[] => {
    const { size } = this.props
    let posArray: Posn[] = []
    for (let i = 0; i < size; ++i) {
      posArray.push(new Posn(i, pos.row))
    }
    return posArray
  }

  getDiagonal = (pos: Posn): Posn[] => {
    const { size } = this.props
    let posArray: Posn[] = []
    let i = pos.row
    let j = pos.col
    while (i > 0 && j > 0) {
      --i
      --j
    }
    while (i < size && j < size) posArray.push(new Posn(i++, j++))
    return posArray
  }

  isSolved = () => {
    const { queens } = this.state
    const { size } = this.props
    // Check number of queens
    if (queens.length !== size) return false
    // Check row, col, and diagonal conflict
    let rowSeen = new Set()
    let colSeen = new Set()
    let diagonals = []
    for (let queen of queens) {
      rowSeen.add(queen.row)
      colSeen.add(queen.col)
      diagonals.push(this.getDiagonal(queen))
      for (let diagnal of diagonals.slice(0, -1)) {
        for (let pos of diagnal) {
          if (Posn.isEqual(pos, queen)) return false
        }
      }
    }
    return rowSeen.size === size && colSeen.size === size
  }

  // TODO: highlightTile = (pos: Posn) => {}

  // TODO: unhighlightTile = (pos: Posn) => {}

  toggleQueen = (pos: Posn) => {
    if (this.isAQueen(pos)) {
      this.unsetQueen(pos)
    } else {
      this.setQueen(pos)
    }
  }

  render() {
    const { size } = this.props
    const { tileStyles } = this.state
    let rows = []
    for (let i = 0; i < size; ++i) {
      let tableDatas = []
      for (let j = 0; j < size; ++j) {
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
              tileStyle={tileStyles[i][j]}
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
