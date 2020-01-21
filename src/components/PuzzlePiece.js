import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PuzzlePiece.css";

class PuzzlePiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: props.picUrl
    };
  }

  render() {
    return (
      <div
        className="puzzle-piece"
        style={this.props.tileStyle}
        id={this.props.id}
        onClick={() => {
          this.props.moveTile(this.props.id);
        }}
        draggable="true"
        onDragStart={(e) => {
          if (!this.props.isEditable) return;
          this.props.setInHand(e.target);
          e.target.classList.add("in-hand");
        }}
        onDragEnd={(e) => {
          if (!this.props.isEditable) return;
          this.props.unsetInHand();
          e.target.classList.remove("in-hand");
        }}
      ></div>
    );
  }
}

PuzzlePiece.propTypes = {
  id: PropTypes.number.isRequired,
  picUrl: PropTypes.object
};

export default PuzzlePiece;
