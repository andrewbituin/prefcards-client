import React from "react";
import { Link } from "react-router-dom";
import CardsCondensedList from "./CardsCondensedList";
import LogoutButton from "./LogoutButton";
import "./CardsList.css";

export default class CardsList extends React.Component {
  render() {
    return (
      <div>
        <nav className="cards-list-navigation">
          <header className="cards-list-header">
            <h1 className="cards-list-title">prefcards</h1>
          </header>
          <Link to="/create-card">
            <button type="click">New Card</button>
          </Link>
          <LogoutButton />
        </nav>
        <ul className="cards-list">
          <CardsCondensedList {...this.props} />
        </ul>
      </div>
    );
  }
}
