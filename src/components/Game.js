import React, { Component } from "react";
import Board from "./Board.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 3
    };
  }

  setBoardSize = async e => {
    await this.setState({ boardSize: parseInt(e.target.value) });
    await this.refs.child.init();
  };

  render() {
    const { boardSize } = this.state;
    return (
      <div className="game">
        Size:{" "}
        <input
          type="range"
          name="points"
          min="3"
          max="6"
          value={boardSize}
          onChange={this.setBoardSize}
        />
        <span>{boardSize}</span>
        <Board ref="child" width={boardSize} height={boardSize} />
      </div>
    );
  }
}

export default Game;
