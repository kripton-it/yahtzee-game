import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    words: ["one", "two", "three", "four", "five", "six"],
    val: 6
  };

  handleClick = () => {
    const { handleClick, idx } = this.props;
    handleClick(idx);
  };

  render() {
    const { locked, val, words, rolling } = this.props;
    const className = `Die fas fa-dice-${words[val - 1]} fa-5x${
      locked ? " Die-locked" : rolling ? " Die-rolling" : ""
    }`;
    return (
      <i
        className={className}
        onClick={this.handleClick}
      />
    );
  }
}

export default Die;
