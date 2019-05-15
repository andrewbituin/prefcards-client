import React from "react";
import ApiService from "../services/api-service";
import CardsContext from "../context/CardsContext";
import "./CardsCondensedList.css";

export default class CardsCondensedList extends React.Component {
  static contextType = CardsContext;
  state = {
    filter: false,
    currentSurgeon: ""
  };
  componentDidMount() {
    ApiService.getAllCards().then(list => this.context.setCardsList(list));
    ApiService.getAllUsers().then(list => this.context.setUsersList(list));
  }
  handleCardClick = e => {
    this.props.history.push(`/card/${e.target.getAttribute("id")}`);
  };
  displayCondensedCards = () => {
    if (!this.state.filter || this.state.currentSurgeon === "All Cards") {
      return this.context.cardsList.map(card => {
        return (
          <li
            key={card.id}
            id={card.id}
            className="card-condensed"
            onClick={this.handleCardClick}
          >
            <h2 className="card-condensed-title" id={card.id}>{card.surgeon} </h2>
            <p className="card-condensed-procedure" id={card.id}>{card.procedure}</p>
            {/* <button type="click" id={card.id} className="card-condensed-button" onClick={this.handleCardClick}>+</button> */}
          </li>
        );
      });
    }
    if (this.state.filter) {
      return this.context.cardsList
        .filter(card => card.surgeon === this.state.currentSurgeon)
        .map(card => {
          return (
            <li
              key={card.id}
              id={card.id}
              className="card-condensed"
              onClick={this.handleCardClick}
            >
              <h2 className="card-condensed-title" id={card.id}>{card.surgeon}</h2>
              <p className="card-condensed-procedure" id={card.id}>{card.procedure}</p>
              {/* <button type="click" id={card.id} className="card-condensed-button" onClick={this.handleCardClick}>+</button> */}
            </li>
          );
        });
    }
  };
  generateOptions = () => {
    const surgeons = this.context.usersList.filter(
      user => user.position === "doctor"
    );
    return surgeons.map(surgeon => {
      return (
        <option key={surgeon.id} value={surgeon.full_name}>
          {surgeon.full_name}
        </option>
      );
    });
  };
  handleSelectChange = e => {
    this.setState({ filter: true });
    this.setState({ currentSurgeon: e.target.value });
  };
  render() {
    return (
      <>
        <div className="dropdown-container">
          <select
            className="cards-condensed-dropdown"
            name="surgeon"
            onChange={e => this.handleSelectChange(e)}
          >
            <option value="All Cards">All Cards</option>
            {this.generateOptions()}
          </select>
        </div>
        <div className="cards-condensed-container">
          {this.displayCondensedCards()}
        </div>
      </>
    );
  }
}
