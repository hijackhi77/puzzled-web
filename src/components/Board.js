import React, { Component } from "react";
import PropTypes from "prop-types";
import PuzzlePiece from "./PuzzlePiece";
import "./Board.css"

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      solved: false,
      pieces: []
    };
  }

  render() {
    let height = this.state.height;
    let width = this.state.width;
    let id = 1;
    let rows = [];

    for (let i = 0; i < height; ++i) {
      rows.push([]);
      for (let j = 0; j < width; ++j) {
        rows[i].push(id);
        ++id;
        if (i === height - 1 && j === width - 1) {
          rows[i][j] = 0;
        }
      }
    }
    console.log(rows);

    let rowsRender = rows.map((col, i) => {
      let entry = col.map((item, j) => {
        // Arrow function preserves current this context
        return (
          <td key={j}>
            <PuzzlePiece id={item} />
          </td>
        );
      });
      return <tr key={i}>{entry}</tr>;
    });

    return (
      <div className="board">
        <table >
          <tbody>{rowsRender}</tbody>
        </table>
      </div>
    );
  }
}

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Board;
