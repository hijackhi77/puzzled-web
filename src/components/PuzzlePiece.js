import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PuzzlePiece.css"

class PuzzlePiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      picUrl: props.picUrl
    };
  }

  move = (e) => {
    // alert('yes');
    console.log('YES');
  }

  render() {
    return (
      <div className="puzzle-piece" value={this.props.id} onClick={(e) => this.move(e)}>
        <span>{this.props.id}</span>
      </div>
    );
  }
}

PuzzlePiece.propTypes = {
  id: PropTypes.number.isRequired,
  picUrl: PropTypes.object
};

export default PuzzlePiece;
