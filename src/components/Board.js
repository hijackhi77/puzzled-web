import React, { Component } from "react"
import PropTypes from "prop-types"
import "./Board.css"
import PuzzlePiece from "./PuzzlePiece"
import { deepcopy, getRandomInt, sleep, flatten } from "../lib/utils.js"
import axios from "axios"
import bgImg from "../assets/puzzle-image1.jpg"

class Board extends Component {
  tileStyles = []

  constructor(props) {
    super(props)
    this.state = {
      solved: false,
      board: [],
      readyToShuffle: true,
      readyToSolve: true,
      isEditable: false
    }
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    const { boardSize } = this.props
    let board = []

    let id = 1
    for (let i = 0; i < boardSize; ++i) {
      let row = []
      for (let j = 0; j < boardSize; ++j, ++id) {
        let tileId = id
        if (i === boardSize - 1 && j === boardSize - 1) {
          tileId = 0
          this.tileStyles[tileId] = {
            background: "white",
            cursor: "default"
          }
        } else {
          let weight = 100 / (boardSize - 1)
          let x = j * weight
          let y = i * weight
          this.tileStyles[id] = {
            background: "url(" + bgImg + ")",
            backgroundPosition: x + "% " + y + "%",
            backgroundSize: boardSize * 100 + "%"
          }
        }
        row.push(tileId)
      }
      board.push(row)
    }
    this.setState({ board: board })
  }

  getTileById = id => {
    const { board } = this.state
    const { boardSize } = this.props
    for (let i = 0; i < boardSize; ++i) {
      for (let j = 0; j < boardSize; ++j) {
        if (board[i][j] === id) {
          return { row: i, col: j }
        }
      }
    }
    return null
  }

  getMovables = () => {
    const whiteTilePos = this.getTileById(0)
    const { boardSize } = this.props
    let movables = []
    if (whiteTilePos.row > 0) {
      movables.push({ row: whiteTilePos.row - 1, col: whiteTilePos.col })
    }
    if (whiteTilePos.row < boardSize - 1) {
      movables.push({ row: whiteTilePos.row + 1, col: whiteTilePos.col })
    }
    if (whiteTilePos.col > 0) {
      movables.push({ row: whiteTilePos.row, col: whiteTilePos.col - 1 })
    }
    if (whiteTilePos.col < boardSize - 1) {
      movables.push({ row: whiteTilePos.row, col: whiteTilePos.col + 1 })
    }
    return movables
  }

  isMovable = pos => {
    const { board } = this.state
    if (board[pos.row][pos.col] === 0) return false
    let movables = this.getMovables()
    return movables.some(e => {
      return e.row === pos.row && e.col === pos.col
    })
  }

  swapTiles = (pos1, pos2) => {
    let board = deepcopy(this.state.board)
    let temp = board[pos1.row][pos1.col]
    board[pos1.row][pos1.col] = board[pos2.row][pos2.col]
    board[pos2.row][pos2.col] = temp
    this.setState({ board })
  }

  moveTile = async pos => {
    console.log(pos)
    // if (id === 0) return;
    // let pos = this.getTileById(id);
    if (!this.isMovable(pos)) return
    await this.swapTiles(pos, this.getTileById(0))
    this.setState({ solved: this.isGoalState() })
  }

  shuffle = () => {
    this.setState({ readyToShuffle: false })
    const { boardSize } = this.props
    let boardCopy = deepcopy(this.state.board)
    do {
      for (let row = 0; row < boardSize; ++row) {
        for (let col = 0; col < boardSize; ++col) {
          let row2 = getRandomInt(boardSize)
          let col2 = getRandomInt(boardSize)
          let temp = boardCopy[row][col]
          boardCopy[row][col] = boardCopy[row2][col2]
          boardCopy[row2][col2] = temp
        }
      }
      console.log(boardCopy)
    } while (!this.isSovable(boardCopy))
    this.setState({ board: boardCopy, readyToShuffle: true })
  }

  isGoalState = () => {
    const { board } = this.state
    const { boardSize } = this.props
    for (let i = 0, id = 1; i < boardSize; ++i) {
      for (let j = 0; j < boardSize; ++j, ++id) {
        if (i === boardSize - 1 && j === boardSize - 1) {
          if (board[i][j] !== 0) return false
        } else {
          if (board[i][j] !== id) return false
        }
      }
    }
    return true
  }

  getNumInversions = puzzle => {
    let flatPuzzle = flatten(puzzle)
    let numInv = 0
    for (let i = 0; i < flatPuzzle.length; ++i) {
      for (let j = i + 1; j < flatPuzzle.length; ++j) {
        if (flatPuzzle[j] && flatPuzzle[i] && flatPuzzle[i] > flatPuzzle[j]) {
          ++numInv
        }
      }
    }
    return numInv
  }

  isSovable = puzzle => {
    // Reference: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
    let size = puzzle.length
    let numInv = this.getNumInversions(puzzle)
    if (size % 2 === 1) {
      return numInv % 2 === 0
    } else {
      let xPos = this.getTileById(0)
      if (!xPos) return false
      let xRowR = size - xPos.row
      return (xRowR % 2) + (numInv % 2) === 1
    }
  }

  solve = async () => {
    await this.setState({
      readyToShuffle: false,
      readyToSolve: false,
      isEditable: false
    })
    const { board } = this.state
    const { boardSize } = this.props

    // TODO: create .env file to hold api endpoints
    let url = "http://localhost:5000/sliding-puzzle/solve"
    let data = {
      method: "astar",
      puzzle: JSON.stringify(board),
      size: boardSize
    }
    try {
      let res = await axios.post(url, data)
      res = JSON.parse(res.request.response)
      console.log(res)
      if (res["able_to_solve"]) {
        for (let i = res["steps"].length - 1; i >= 0; --i) {
          await this.setState({ board: res["steps"][i] })
          await sleep(80)
        }
      } else {
        alert("Current puzzle is not solvable")
      }
    } catch (e) {
      // TODO: exception handling
      console.log(e)
    }
    await this.setState({ readyToShuffle: true, readyToSolve: true })
  }

  inHand = null

  setInHand = element => {
    if (element.nodeName !== "DIV") return
    this.inHand = element
  }

  unsetInHand = () => {
    this.inHand = null
  }

  setEditable = isEditable => {
    this.setState({
      readyToShuffle: !isEditable,
      readyToSolve: !isEditable,
      isEditable
    })
  }

  render() {
    const { boardSize } = this.props
    const { board, solved } = this.state

    let rows = board.map((cells, i) => {
      let row = cells.map((cell, j) => {
        return (
          <td
            style={{ width: 580 / boardSize, height: 580 / boardSize }}
            key={j}
            onDrop={e => {
              if (!this.state.isEditable) return
              e.target.classList.remove("hovered")
              if (e.target === this.inHand) return
              let sourId = parseInt(this.inHand.id)
              let destId = parseInt(e.target.id)
              this.swapTiles(this.getTileById(sourId), this.getTileById(destId))
            }}
            onDragEnter={e => {
              if (!this.state.isEditable) return
              e.target.classList.add("hovered")
            }}
            onDragOver={e => {
              if (!this.state.isEditable) return
              e.preventDefault()
            }}
            onDragLeave={e => {
              if (!this.state.isEditable) return
              e.target.classList.remove("hovered")
            }}
          >
            <PuzzlePiece
              id={board[i][j]}
              pos={{ row: i, col: j }}
              tileStyle={this.tileStyles[board[i][j]]}
              handleClick={this.moveTile}
              handleDragStart={this.setInHand}
              handleDragEnd={this.unsetInHand}
            />
          </td>
        )
      })
      return <tr key={i}>{row}</tr>
    })

    let successScreen = ""
    if (solved) {
      successScreen = (
        <div>
          <h2>Puzzle Solved</h2>
        </div>
      )
    }

    let editButtonText = this.state.isEditable ? "Finish Edit" : "Edit Puzzle"

    return (
      <div className="board">
        <table>
          <tbody>{rows}</tbody>
        </table>
        <br />

        <div className="buttons">
          <button
            onClick={() => {
              this.setEditable(!this.state.isEditable)
            }}
          >
            {editButtonText}
          </button>

          <button
            onClick={() => {
              this.shuffle()
            }}
            disabled={!this.state.readyToShuffle}
          >
            Shuffle Puzzle
          </button>

          <button
            style={{}}
            onClick={() => {
              this.solve()
            }}
            disabled={!this.state.readyToSolve}
          >
            Sovle Puzzle
          </button>
        </div>
        <div>{successScreen}</div>
      </div>
    )
  }
}

Board.propTypes = {
  boardSize: PropTypes.number.isRequired
}

export default Board
