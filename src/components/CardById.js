import React from "react";
import { Link } from "react-router-dom";
import CardsContext from "../context/CardsContext";
import LogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";
import "./CardById.css";
import jwt from 'jsonwebtoken';
import TokenService from '../services/token-service';

export default class CardById extends React.Component {
  static contextType = CardsContext;
  allCardsButton = () => {
    return (
      <Link to="/all">
        <button type="click">All Cards</button>
      </Link>
    );
  };
  findById = () => {
    const id = parseInt(this.props.match.url.split("/").slice(2));
    const cardById = this.context.cardsList.find(card => card.id === id);
    return this.generateCard(cardById);
  };
  generateCard = card => {
    if (!card) {
      return <></>;
    } else {
      return (
        <div id={card.id}>
          <header className="card-container-header">
            <h2>{card.surgeon} </h2>
            {card.procedure.length > 0 && <h3>Procedure: {card.procedure} </h3>}
          </header>
          <section className="section-one">
            {card.position.length > 0 && <p>Position: {card.position} </p>}
            <p>Glove Size: {card.glove_size} </p>
            <p>Glove Type: {card.glove_type} </p>
            <p>Domninant Hand: {card.dominant_hand} </p>
          </section>
          <section className="section-two">
            {card.equipment.length > 0 && <p>Equipment: {card.equipment} </p>}
            {card.supplies.length > 0 && <p>Supplies: {card.supplies} </p>}
            {card.instrumentation.length > 0 && (
              <p>Instrumentation: {card.instrumentation} </p>
            )}
            {card.suture_and_usage.length > 0 && (
              <p>Suture and Usage: {card.suture_and_usage} </p>
            )}
            {card.dressings.length > 0 && <p>Dressings: {card.dressings} </p>}
            {card.skin_prep.length > 0 && <p>Skin Prep: {card.skin_prep} </p>}
            {card.medications.length > 0 && (
              <p>Medication: {card.medications} </p>
            )}
          </section>
        </div>
      );
    }
  };
  editButton = () => {
    const loggedUser = jwt.decode(TokenService.getAuthToken())
    console.log(loggedUser)
    const id = parseInt(this.props.match.url.split("/").slice(2));
    const cardById = this.context.cardsList.find(card => card.id === id);
    const nursesList = this.context.usersList.filter(user => user.position === "nurse")
    console.log(nursesList);
    if(nursesList.find(nurse => nurse.full_name === loggedUser.full_name || loggedUser.full_name === cardById.surgeon)){
      return (
        <Link to={`/edit/${id}`}>
          <button type="click">Edit Card</button>
        </Link>
      );
    } else{
      return <></>
    }

  };
  render() {
    return (
      <div>
        <nav className="card-id-navigation">
          <header className="card-id-header">
            <h1 className="card-id-title">prefcards</h1>
          </header>
          {this.allCardsButton()}
          <LogoutButton />
        </nav>
        <div className="card-id-container">
          {this.findById()}
          <div className="card-id-buttons">
            {this.editButton()}
            <DeleteButton {...this.props} url={this.props.match.url} />
          </div>
        </div>
      </div>
    );
  }
}
