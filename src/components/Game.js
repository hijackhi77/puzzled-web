import React, { Component } from "react";
import Board from "./Board.js";

class Game extends Component {
  state = {
    board: {
      width: 3,
      height: 3
    }
  };

  render() {
    const { width, height } = this.state.board;
    return (
      <div className="game">
        <Board
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default Game;
