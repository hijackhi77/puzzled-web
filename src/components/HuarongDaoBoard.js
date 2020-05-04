import React, { Component } from "react"
import PuzzlePiece from "./PuzzlePiece"
import { deepcopy } from "../lib/utils.js"
import Posn from "../lib/Posn.js"
// TODO: import PropTypes from "prop-types";

class HuarongDaoBoard extends Component {
  tileStylesTracker = []
  candidatesTracker = []

  constructor(props) {
    super(props)
    this.state = {
      // Height and width are both fixed
      height: 5,
      width: 4,
      solved: false,
      board: [],
      tileStyles: [],
      candidates: [],
      candidatesFor: null,
    }
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    const { height, width } = this.state
    // Initialize title styles
    this.tileStylesTracker = []
    const baseTileStyle = {}
    for (let i = 0; i < height; ++i) {
      let rowStyles = []
      for (let j = 0; j < width; ++j) {
        rowStyles[j] = baseTileStyle
      }
      this.tileStylesTracker.push(rowStyles)
    }

    // Clear all previous candidates infomation
    this.clearCandidates()

    // Initialize starting board config
    // TODO: add custom board configs
    const baseBoard = [
      [2, 1, 1, 3],
      [2, 1, 1, 3],
      [4, 6, 6, 5],
      [4, 7, 7, 5],
      [7, 0, 0, 7],
    ]

    this.setState({
      tileStyles: this.tileStylesTracker,
      board: baseBoard,
    })
  }

  // Return the positions of the tiles that have the same id as the
  // id at pos
  getTilesByPos = (pos) => {
    const { height, width, board } = this.state
    let id = board[pos.row][pos.col]
    let tiles, upLeft
    let found = false
    for (let i = 0; i < height; ++i) {
      if (found) break
      for (let j = 0; j < width; ++j) {
        if (found) break
        if (board[i][j] === id) {
          upLeft = new Posn(i, j)
          found = true
          break
        }
      }
    }

    if (id === 1) {
      tiles = [
        upLeft,
        new Posn(upLeft.row, upLeft.col + 1),
        new Posn(upLeft.row + 1, upLeft.col),
        new Posn(upLeft.row + 1, upLeft.col + 1),
      ]
    } else if (id === 2 || id === 3 || id === 4 || id === 5) {
      tiles = [upLeft, new Posn(upLeft.row + 1, upLeft.col)]
    } else if (id === 6) {
      tiles = [upLeft, new Posn(upLeft.row, upLeft.col + 1)]
    } else if (id === 7 || id === 0) {
      tiles = [pos]
    }
    return tiles
  }

  // Return true if pos is a valid position in current board,
  // otherwise return false
  isInBound = (pos) => {
    const { height, width } = this.state
    return 0 <= pos.row && pos.row < height && 0 <= pos.col && pos.col < width
  }

  // Return a Posn object that is resulted from moving pos to the
  // direction by one. If the resulting position is not valid, return
  // false
  getNeighbour = (pos, direction) => {
    let neighbour = pos.go(direction)
    if (this.isInBound(neighbour)) return neighbour
    return null
  }

  // Return the adjecent neighbours of the piece that owns pos, by
  // four arrays: left, up, right, and down
  getNeighbours = (pos) => {
    const { board } = this.state
    let id = board[pos.row][pos.col]
    let tiles = this.getTilesByPos(pos)
    let neighbours = {}
    if (id === 1) {
      let upLeft = tiles[0]
      let upRight = tiles[1]
      let downLeft = tiles[2]
      let downRight = tiles[3]
      neighbours = {
        left: [
          this.getNeighbour(upLeft, "left"),
          this.getNeighbour(downLeft, "left"),
        ],
        up: [this.getNeighbour(upLeft, "up"), this.getNeighbour(upRight, "up")],
        right: [
          this.getNeighbour(upRight, "right"),
          this.getNeighbour(downRight, "right"),
        ],
        down: [
          this.getNeighbour(downLeft, "down"),
          this.getNeighbour(downRight, "down"),
        ],
      }
    } else if (id === 2 || id === 3 || id === 4 || id === 5) {
      let up = tiles[0]
      let down = tiles[1]
      neighbours = {
        left: [this.getNeighbour(up, "left"), this.getNeighbour(down, "left")],
        up: [this.getNeighbour(up, "up")],
        right: [
          this.getNeighbour(up, "right"),
          this.getNeighbour(down, "right"),
        ],
        down: [this.getNeighbour(down, "down")],
      }
    } else if (id === 6) {
      let left = tiles[0]
      let right = tiles[1]
      neighbours = {
        left: [this.getNeighbour(left, "left")],
        up: [this.getNeighbour(left, "up"), this.getNeighbour(right, "up")],
        right: [this.getNeighbour(right, "right")],
        down: [
          this.getNeighbour(left, "down"),
          this.getNeighbour(right, "down"),
        ],
      }
    } else if (id === 7 || id === 0) {
      neighbours = {
        left: [this.getNeighbour(tiles[0], "left")],
        up: [this.getNeighbour(tiles[0], "up")],
        right: [this.getNeighbour(tiles[0], "right")],
        down: [this.getNeighbour(tiles[0], "down")],
      }
    }
    return neighbours
  }

  // Check to which directions that the piece (which owns pos) can
  // move to, return as an array of direcitons, e.g. ["left", "up"]
  getMoveOptions = (pos) => {
    const { board } = this.state
    const options = ["left", "up", "right", "down"]
    let neighbours = this.getNeighbours(pos)
    let result = []
    for (let option of options) {
      let numPass = 0
      for (let pos of neighbours[option]) {
        if (pos !== null && board[pos.row][pos.col] === 0) ++numPass
      }
      if (numPass === neighbours[option].length) result.push(option)
    }
    return result
  }

  // Move the piece that owns pos to direction by one. Note this
  // function does not check for movability or board bounds
  moveTiles = async (pos, direction) => {
    const { board } = this.state
    let id = board[pos.row][pos.col]
    let newBoard = deepcopy(board)
    let tiles = this.getTilesByPos(pos)
    // Move all tiles into their new position
    let newTile = null
    for (let tile of tiles) {
      if (direction === "left") {
        newTile = { row: tile.row, col: tile.col - 1 }
      } else if (direction === "right") {
        newTile = { row: tile.row, col: tile.col + 1 }
      } else if (direction === "up") {
        newTile = { row: tile.row - 1, col: tile.col }
      } else if (direction === "down") {
        newTile = { row: tile.row + 1, col: tile.col }
      }
      newBoard[newTile.row][newTile.col] = id
    }
    if (id === 1) {
      let upLeft = tiles[0]
      let upRight = tiles[1]
      let downLeft = tiles[2]
      let downRight = tiles[3]
      if (direction === "left") {
        newBoard[upRight.row][upRight.col] = 0
        newBoard[downRight.row][downRight.col] = 0
      } else if (direction === "right") {
        newBoard[upLeft.row][upLeft.col] = 0
        newBoard[downLeft.row][downLeft.col] = 0
      } else if (direction === "up") {
        newBoard[downLeft.row][downLeft.col] = 0
        newBoard[downRight.row][downRight.col] = 0
      } else if (direction === "down") {
        newBoard[upLeft.row][upLeft.col] = 0
        newBoard[upRight.row][upRight.col] = 0
      }
    } else if (id === 2 || id === 3 || id === 4 || id === 5) {
      let up = tiles[0]
      let down = tiles[1]
      if (direction === "left") {
        newBoard[up.row][up.col] = 0
        newBoard[down.row][down.col] = 0
      } else if (direction === "right") {
        newBoard[up.row][up.col] = 0
        newBoard[down.row][down.col] = 0
      } else if (direction === "up") {
        newBoard[down.row][down.col] = 0
      } else if (direction === "down") {
        newBoard[up.row][up.col] = 0
      }
    } else if (id === 6) {
      let left = tiles[0]
      let right = tiles[1]
      if (direction === "left") {
        newBoard[right.row][right.col] = 0
      } else if (direction === "right") {
        newBoard[left.row][left.col] = 0
      } else if (direction === "up") {
        newBoard[right.row][right.col] = 0
        newBoard[left.row][left.col] = 0
      } else if (direction === "down") {
        newBoard[right.row][right.col] = 0
        newBoard[left.row][left.col] = 0
      }
    } else if (id === 7 || id === 0) {
      let up = tiles[0]
      newBoard[up.row][up.col] = 0
    }
    this.setState({ board: newBoard })
  }

  // Highlight pos of board
  highlightTile = (pos) => {
    this.tileStylesTracker[pos.row][pos.col] = { background: "gray" }
    this.setState({ tileStyles: this.tileStylesTracker })
  }

  // Unhighlight pos of board
  unhighlightTile = (pos) => {
    this.tileStylesTracker[pos.row][pos.col] = { background: "white" }
    this.setState({ tileStyles: this.tileStylesTracker })
  }

  // When the game enters moving option selecting state (resulting
  // from having more than one possible movable direcitons), put all
  // movable pos'es (0's) into candiates tracker and highlight them
  setCandidates = (candidates, candidatesFor) => {
    for (let pos of candidates) {
      this.highlightTile(pos)
      this.candidatesTracker.push(pos)
    }
    this.setState({
      candidates: this.candidatesTracker,
      candidatesFor,
    })
  }

  // Unhighlight candidate pos'es and remove them from candidates
  // tracker
  clearCandidates = () => {
    for (let candidate of this.candidatesTracker) {
      this.unhighlightTile(candidate)
    }
    this.candidatesTracker = []
    this.setState({
      candidates: this.candidatesTracker,
      candidatesFor: null,
    })
  }

  // When a pos is clicked by user, move this piece base on
  // coresponding state of the pos
  moveTile = async (pos) => {
    const { candidates, candidatesFor } = this.state
    pos = new Posn(pos.row, pos.col)

    if (Posn.includes(pos, candidates)) {
      let direction = Posn.getRelativeDir(candidatesFor, pos)
      this.moveTiles(candidatesFor, direction)
      this.clearCandidates()
    } else {
      this.clearCandidates()
      let options = this.getMoveOptions(pos)
      if (options.length > 0) {
        if (options.length === 1) {
          this.moveTiles(pos, options[0])
        } else {
          await this.setCandidates(
            options.map((opt) => pos.go(opt)),
            pos
          )
        }
      }
    }
  }

  render() {
    const { board, tileStyles } = this.state
    let rows = board.map((cells, i) => {
      let row = cells.map((cell, j) => {
        return (
          <td style={{ width: 100, height: 100 }} key={j}>
            <PuzzlePiece
              tileId={i + "-" + j}
              pos={{ row: i, col: j }}
              tileStyle={tileStyles[i][j]}
              displayText={board[i][j]}
              handleClick={this.moveTile}
              handleDragStart={() => {}}
              handleDragEnd={() => {}}
            />
          </td>
        )
      })
      return <tr key={i}>{row}</tr>
    })

    let successScreen = ""

    return (
      <div className="board">
        <table border="true">
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

export default HuarongDaoBoard
