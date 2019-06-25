import React, { Component } from 'react';
import Die from './Die';
import './Dice.css';

class Dice extends Component {
  render() {
    const { handleClick, locked, dice, rolling } = this.props;
    return <div className="Dice">
      {dice.map((d, idx) =>
        <Die handleClick={handleClick}
          val={d}
          rolling={rolling && !locked[idx]}
          locked={locked[idx]}
          idx={idx}
          key={idx} />
      )}
    </div>
  }
}

export default Dice;