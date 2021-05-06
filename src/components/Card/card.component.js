import React, { Component } from "react";
import "./card.styles.scss";

export class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }

  render() {
    return (
      <div className="card">
        <img
          className="card"
          src={this.props.imageUrl}
          alt={this.props.name}
          style={{ transform: this._transform }}
        />
      </div>
    );
  }
}

export default Card;
