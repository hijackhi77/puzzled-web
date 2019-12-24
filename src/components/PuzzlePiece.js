import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PuzzlePiece.css"

class PuzzlePiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: props.picUrl
    };
  }

  render() {
    console.log("PuzzlePiece::render called");
    return (
      <div className="puzzle-piece"
        style={this.props.tileStyle}
        id={this.props.id}
        onClick={() => { this.props.moveTile(this.props.id) }}
      >
      </div>
    );
  }
}

PuzzlePiece.propTypes = {
  id: PropTypes.number.isRequired,
  picUrl: PropTypes.object
};

export default PuzzlePiece;
