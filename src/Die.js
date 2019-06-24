import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  handleClick = () => {
    const { handleClick, idx } = this.props;
    handleClick(idx);
  }
  
  render() {
    const { isDisabled, locked } = this.props;
    const bgColor = locked ? "grey" : "black";
    return (
      <button
        className="Die"
        disabled={isDisabled}
        style={{ backgroundColor: bgColor }}
        onClick={this.handleClick}
      >
        {this.props.val}
      </button>
    );
  }
}

export default Die;
