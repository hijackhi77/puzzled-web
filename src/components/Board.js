import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Board.css"
import PuzzlePiece from "./PuzzlePiece";
import { deepcopy, getRandomInt } from "../lib/utils.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      solved: false,
      board: [],
      // whiteTilePos: {
      //   row: props.height - 1,
      //   col: props.width - 1
      // }
    };

    const { width, height } = this.state;
    let id = 1;
    for (let i = 0; i < height; ++i) {
      let row = [];
      for (let j = 0; j < width; ++j) {
        row.push(i === height - 1 && j === width - 1 ? 0 : id++);
      }
      this.state.board.push(row);
    }
  }

  getMovables = () => {
    const whiteTilePos = this.getTileById(0);
    const { width, height } = this.state;
    let movables = [];
    if (whiteTilePos.row > 0) {
      movables.push({ row: whiteTilePos.row - 1, col: whiteTilePos.col });
    }
    if (whiteTilePos.row < height - 1) {
      movables.push({ row: whiteTilePos.row + 1, col: whiteTilePos.col });
    }
    if (whiteTilePos.col > 0) {
      movables.push({ row: whiteTilePos.row, col: whiteTilePos.col - 1 });
    }
    if (whiteTilePos.col < width - 1) {
      movables.push({ row: whiteTilePos.row, col: whiteTilePos.col + 1 });
    }
    return movables;
  }

  isMovable = (pos) => {
    let movables = this.getMovables();
    return movables.some((e) => {
      return e.row === pos.row && e.col === pos.col
    });
  }

  swapTiles = (pos1, pos2) => {
    let board = deepcopy(this.state.board);
    let temp = board[pos1.row][pos1.col];
    board[pos1.row][pos1.col] = board[pos2.row][pos2.col];
    board[pos2.row][pos2.col] = temp;
    this.setState({ board });
  }

  getTileById = (id) => {
    const { width, height, board } = this.state;
    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        if (board[i][j] === id) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  }

  moveTile = (id) => {
    if (id === 0) return;
    let pos = this.getTileById(id);
    if (!this.isMovable(pos)) return;
    this.swapTiles(pos, this.getTileById(0));
  }

  shuffle = () => {
    const { width, height } = this.state;
    let boardCopy = deepcopy(this.state.board);
    for (let row = 0; row < height; ++row) {
      for (let col = 0; col < width; ++col) {
        let row2 = getRandomInt(height);
        let col2 = getRandomInt(width);
        let temp = boardCopy[row][col];
        boardCopy[row][col] = boardCopy[row2][col2];
        boardCopy[row2][col2] = temp;
      }
    }
    this.setState({ board: boardCopy });
  }

  isGoalState = () => {
    // TODO: Add success screen
  }

  render() {
    console.log("Board::render called");

    let rows = this.state.board.map((cells, i) => {
      let row = cells.map((cell, j) => {
        return (
          <td key={j}>
            <PuzzlePiece
              id={this.state.board[i][j]}
              moveTile={this.moveTile}
            />
          </td>
        );
      });
      return (<tr key={i}>{row}</tr>);
    });

    return (
      <div className="board" >
        <table>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <button onClick={() => { this.shuffle() }}>Reset Puzzle</button>
      </div>
    );
  }
}

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Board;
