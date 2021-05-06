import React, { Component } from "react";
import "./player-score-field.styles.scss";

export class PlayerScoreField extends Component {
  render() {
    return (
      <div>
        <h1 className="scoreField">
          Player {this.props.playerNum} Score: {this.props.score}
        </h1>
      </div>
    );
  }
}

export default PlayerScoreField;
