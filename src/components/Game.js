import React, { Component } from "react";
import Board from "../components/Board";
import HuarongDaoBoard from "../components/HuarongDaoBoard";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    if (this.props.boardType === "puzzle") {
      this.state.boardSize = 3;
      this.setBoardSize = async e => {
        await this.setState({ boardSize: parseInt(e.target.value) });
        await this.refs.child.init();
      };
      
    } else if (this.props.boardType === "huarongDao") {
      // let children = <HuarongDaoBoard />;
      // this.state.children = children;
    }
  }
  
  render() {
    let children = null;
    if (this.props.boardType === "puzzle") {
      children = (
        <div>
        <div>Size:
        <input
        type="range"
        name="points"
        min="3"
        max="6"
        value={this.state.boardSize}
        onChange={this.setBoardSize}
        />
        <span>{this.state.boardSize}</span>
        </div>
        <Board ref="child" boardSize={this.state.boardSize} />
        </div>
        );
        
      } else if (this.props.boardType === "huarongDao") {
        children = <HuarongDaoBoard />;
      }
      
      return (
        <div className="game">{ children }</div>
        );
      }
    }
    
    export default Game;
