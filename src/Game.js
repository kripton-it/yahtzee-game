import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
  }

  roll = (evt) => {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1
    }));
  }

  toggleLocked = (idx) => {
    // toggle whether idx is in locked or not
    this.setState(({ locked }) => ({
      /*locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ]*/
      locked: locked.map((item, index) => index === idx ? !item : item),
    }));
  }

  doScore = (rulename, ruleFn) => {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  render() {
    const { dice, locked, scores, rollsLeft } = this.state;
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={locked.every(x => x)}
                onClick={this.roll}
              >
                {rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}

export default Game;
