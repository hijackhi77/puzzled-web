import React, { Component } from "react";
// TODO: import PropTypes from "prop-types";

class HuarongDaoBoard extends Component {
  static baseProps = {
    width: 4,
    height: 5
  };

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
    this.setState({ board: [[2,1,1,3], [2,1,1,3],[4,6,6,5],[4,7,7,5],[7,0,0,7]] });
  }

  render() {
    const { board } = this.state;
    let rows = board.map((cells, i) => {
      let row = cells.map((cell, j) => {
        return (
          <td key={j}>
            {/* <PuzzlePiece
              id={board[i][j].id}
              tileStyle={board[i][j].style}
              moveTile={this.moveTile}
            /> */}
      <span>{board[i][j]}</span>
          </td>
        );
      });
      return <tr key={i}>{row}</tr>;
    });
    
    let successScreen = "";

    return (
      <div className="board">
      <table border>
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

export default HuarongDaoBoard;