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
    return (
      <div className="game">
        <Board
          width={this.state.board.width}
          height={this.state.board.height}
        />
      </div>
    );
  }
}

export default Game;
