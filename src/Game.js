import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

const initialState = {
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
  },
  rolling: false
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  componentDidMount = () => {
    this.animateRoll();
  };

  animateRoll = () => {
    this.setState(
      {
        rolling: true
      },
      () => {
        setTimeout(this.roll, 1000);
      }
    );
  };

  roll = evt => {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }));
  };

  toggleLocked = idx => {
    // toggle whether idx is in locked or not
    const { rolling, rollsLeft } = this.state;
    !rolling &&
      rollsLeft > 0 &&
      this.setState(({ locked }) => ({
        /*locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ]*/
        locked: locked.map((item, index) => (index === idx ? !item : item))
      }));
  };

  doScore = (ruleName, ruleFn) => {
    // evaluate this ruleFn with the dice and score this rulename
    const { rolling } = this.state;
    !rolling &&
      this.setState(st => ({
        scores: { ...st.scores, [ruleName]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false)
      }));
    this.animateRoll();
  };

  displayRollInfo = () => {
    const { rollsLeft } = this.state;
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round..."
    ];
    return messages[rollsLeft];
  };

  restart = () => {
    this.setState(initialState);
    this.animateRoll();
  }

  render() {
    const { dice, locked, scores, rolling } = this.state;
    const score = [...Object.values(scores)].reduce(
      (acc, item) => (item ? acc + item : acc),
      0
    );
    const isFinished = [...Object.values(scores)].every(
      score => score !== undefined
    );
    const diceSection = !isFinished ? (
      <section className="Game-dice-section">
        <Dice
          dice={dice}
          locked={locked}
          handleClick={this.toggleLocked}
          rolling={rolling}
        />
        <div className="Game-button-wrapper">
          <button
            className="Game-reroll"
            disabled={locked.every(x => x) || rolling}
            onClick={this.animateRoll}
          >
            {this.displayRollInfo()}
          </button>
        </div>
      </section>
    ) : null;

    const scoreTable = !isFinished ? <ScoreTable doScore={this.doScore} scores={scores} /> : <button className="Game-restart " onClick={this.restart}>Restart</button>;

    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">{`Yahtzee!  ${score}`}</h1>
          {diceSection}
        </header>
        {scoreTable}
      </div>
    );
  }
}

export default Game;
