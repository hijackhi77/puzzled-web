import React, { Component } from "react"
import PropTypes from "prop-types"
import "./PuzzlePiece.css"

class PuzzlePiece extends Component {
  render() {
    return (
      <div
        className="puzzle-piece"
        style={this.props.tileStyle}
        id={this.props.id}
        onClick={() => {
          this.props.handleClick(this.props.pos)
        }}
        draggable="true"
        onDragStart={(e) => {
          this.props.handleDragStart(e.target)
        }}
        onDragEnd={(e) => {
          this.props.handleDragEnd()
        }}
      >
        {this.props.displayText}
      </div>
    )
  }
}

PuzzlePiece.propTypes = {
  tileId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pos: PropTypes.object.isRequired,
  displayText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tileStyle: PropTypes.object,
  handleClick: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
}

export default PuzzlePiece
