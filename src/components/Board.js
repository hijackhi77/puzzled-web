import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Board.css";
import PuzzlePiece from "./PuzzlePiece";
import { deepcopy, getRandomInt } from "../lib/utils.js";

class Board extends Component {
  tileStyles = {};
  goalState = [];

  constructor(props) {
    super(props);
    this.state = {
      solved: false,
      board: []
    };
  }

  componentDidMount = () => {
    this.init();
  };

  init = () => {
    const { width, height } = this.props;
    let board = [];
    this.tileStyles = {};
    this.goalState = [];

    let id = 1;
    for (let i = 0; i < height; ++i) {
      let row = [];
      for (let j = 0; j < width; ++j, ++id) {
        if (i === height - 1 && j === width - 1) {
          row.push(0);
          this.tileStyles[0] = {
            background: "white",
            cursor: "default"
          };
        } else {
          row.push(id);
          let weight = 100 / (width - 1);
          let x = j * weight;
          let y = i * weight;
          this.tileStyles[id] = {
            width: 580 / width,
            height: 580 / width,
            backgroundPosition: x + "% " + y + "%",
            backgroundSize: width * 100 + "%"
          };
        }
      }
      board.push(row);
    }
    this.goalState = deepcopy(board);
    this.setState({ board: board });
  };

  getMovables = () => {
    const whiteTilePos = this.getTileById(0);
    const { width, height } = this.props;
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
  };

  isMovable = pos => {
    let movables = this.getMovables();
    return movables.some(e => {
      return e.row === pos.row && e.col === pos.col;
    });
  };

  swapTiles = (pos1, pos2) => {
    let board = deepcopy(this.state.board);
    let temp = board[pos1.row][pos1.col];
    board[pos1.row][pos1.col] = board[pos2.row][pos2.col];
    board[pos2.row][pos2.col] = temp;
    this.setState({ board });
  };

  getTileById = id => {
    const { board } = this.state;
    const { width, height } = this.props;
    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        if (board[i][j] === id) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  };

  moveTile = async id => {
    if (id === 0) return;
    let pos = this.getTileById(id);
    if (!this.isMovable(pos)) return;
    await this.swapTiles(pos, this.getTileById(0));
    this.setState({ solved: this.isGoalState() });
  };

  shuffle = () => {
    const { width, height } = this.props;
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
  };

  isGoalState = () => {
    const { board } = this.state;
    const { width, height } = this.props;
    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        if (this.goalState[i][j] !== board[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  render() {
    const { board, solved } = this.state;
    let rows = board.map((cells, i) => {
      let row = cells.map((cell, j) => {
        return (
          <td key={j}>
            <PuzzlePiece
              id={board[i][j]}
              tileStyle={this.tileStyles[board[i][j]]}
              moveTile={this.moveTile}
            />
          </td>
        );
      });
      return <tr key={i}>{row}</tr>;
    });

    let successScreen = "";
    if (solved) {
      successScreen = (
        <div>
          <h2>Puzzle Solved</h2>
        </div>
      );
    }

    return (
      <div className="board">
        <table>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <button
          onClick={() => {
            this.shuffle();
          }}
        >
          Reset Puzzle
        </button>
        {successScreen}
      </div>
    );
  }
}

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Board;
