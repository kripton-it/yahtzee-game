import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    words: ['one', 'two', 'three', 'four', 'five', 'six'],
  };

  handleClick = () => {
    const { handleClick, idx } = this.props;
    handleClick(idx);
  }
  
  render() {
    const { isDisabled, locked, val, words } = this.props;
    return (
      <i className={`Die fas fa-dice-${words[val - 1]} fa-5x${locked ? ' Die-locked' : ''}`} onClick={this.handleClick} disabled={isDisabled}></i>
    );
  }
}

export default Die;
