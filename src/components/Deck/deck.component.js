import React, { Component } from "react";
import "./deck.styles.scss";
import axios from "axios";
import Card from "../Card/card.component";
import PlayerScoreField from "../Player score field/player-score-field.component";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: [],
      player1Score: 0,
      player2Score: 0,
      currentScore: 0,
    };

    this.getCard = this.getCard.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  async componentDidMount() {
    // set keypress event handlers
    document.addEventListener("keydown", this.handleKeyPress);

    // get deck data from API
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    // get card from deck in API using deck ID
    let deckId = this.state.deck.deck_id;

    try {
      let cardUrl = `${API_BASE_URL}/${deckId}/draw`;
      let cardResponse = await axios.get(cardUrl);

      // when cards are depleted, throw an error and end game.
      if (!cardResponse.data.success) {
        throw new Error("No cards remaining.");
      }

      let card = cardResponse.data.cards[0];

      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
        currentScore: (st.currentScore += 1),
      }));
      console.log(this.state.drawn.length);
    } catch (error) {
      console.log(error);
    }
  }

  handleKeyPress(event) {
    if (event.keyCode === 65) {
      console.log("player 1 key pressed");

      // add to player 1 score
      this.setState((st) => ({
        player1Score: (st.player1Score += st.currentScore),
      }));

      // reset currentScore in state
      this.setState({ currentScore: 0 });

      // display updated score in player 1 score field

      // clear deck display
    } else if (event.keyCode === 76) {
      console.log("player 2 key pressed");

      // add to player 2 score
      this.setState((st) => ({
        player2Score: (st.player2Score += st.currentScore),
      }));

      // reset currentScore in state
      this.setState({ currentScore: 0 });

      // display updated score in player 2 score field

      // clear deck display
    } else {
      console.log("those cards don't match!");
      return;
    }
  }

  render() {
    let cards = this.state.drawn.map((card) => {
      return (
        <Card
          key={card.id}
          imageUrl={card.image}
          name={card.name}
          handleEvent={this.addToPlayerScore}
        />
      );
    });

    return (
      <div>
        <h1 className="deck-title">Let's play Snap!</h1>
        <h2 className="subtitle">A React Card Game</h2>
        <PlayerScoreField playerNum={1} score={this.state.player1Score} />
        <PlayerScoreField playerNum={2} score={this.state.player2Score} />
        <p className="subtitle">Player 1 button = 'A'</p>
        <p className="subtitle">Player 2 button = 'L'</p>
        <button className="deck-btn" onClick={this.getCard}>
          Get a Card!
        </button>
        <div className="deck-container">{cards}</div>
      </div>
    );
  }
}

export default Deck;
