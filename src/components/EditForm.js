import React from "react";
import LogoutButton from "./LogoutButton";
import CardsContext from "../context/CardsContext";
import ApiService from "../services/api-service";
import "./EditForm.css";
import uuid from 'uuid';

export default class EditForm extends React.Component {
  static contextType = CardsContext;

  componentDidMount() {
    const id = parseInt(this.props.match.url.split("/").slice(2));
    ApiService.getCardById(id).then(res => this.context.addToEditCard(res));
  }

  findCardById = () => {
    const id = parseInt(this.props.match.url.split("/").slice(2));
    const cardById = this.context.cardsList.find(card => card.id === id);
    return this.generateForm(cardById);
  };
  handleSubmit = e => {
    e.preventDefault();
    // Grabbing all inputs from the form
    const obj = {};
    const form = new FormData(e.target);
    form.forEach((val, key) => (obj[key] = val));

    // Getting id off of url and finding the user based on context usersList
    const id = parseInt(this.props.match.url.split("/").slice(2));
    const user = this.context.usersList.find(
      user => user.full_name === obj.surgeon
    );
    // Assigning user_id to obj from form based on usersList in context
    obj.user_id = user.id;
    obj.id = id;
    ApiService.updateCard(obj.id, JSON.stringify(obj))
      .then(this.context.updateCard(id, obj))
      .then(() => {
        this.props.history.push(`/card/${id}`);
      });
  };
  generateOptions = () => {
    const surgeons = this.context.usersList.filter(
      user => user.position === "doctor"
    );
    return surgeons.map(surgeon => {
      return <option key={surgeon.id}>{surgeon.full_name}</option>;
    });
  };
  generateAccessOptions = () => {
    const users = this.context.usersList.filter(
      user => user.position === "nurse"
    );
    return users.map(user => {
      return <option key={uuid()}>{user.full_name}</option>;
    });
  };
  generateForm = card => {
    return (
      <form className="edit-card-form" onSubmit={e => this.handleSubmit(e)}>
        <section className="edit-card-section-one">
        Surgeon:
          <select
            className="surgeon"
            name="surgeon"
            defaultValue={card.surgeon}
          >
            {this.generateOptions()}
          </select>
          <br />
          Edit Access:
          <select className="access" name="access">
            {this.generateAccessOptions()}
          </select>
          <br />
          Procedure:
          <br />
          <textarea
            rows="4"
            cols="50"
            className="procedure"
            name="procedure"
            defaultValue={card.procedure}
          />
          <br />
          Position:
          <br />
          <textarea
            rows="4"
            cols="50"
            className="position"
            name="position"
            defaultValue={card.position}
          />
          <br />
          Glove Size:
          <select
            className="gloveSize"
            name="glove_size"
            defaultValue={card.glove_size}
          >
            <option>6</option>
            <option>6.5</option>
            <option>7</option>
            <option>7.5</option>
            <option>8</option>
            <option>8.5</option>
          </select>
          <br />
          <label>
            Glove Type: <s />
            <label htmlFor="small">Small</label>
            {card.glove_type === "small" ? (
              <input
                type="radio"
                id="small"
                className="gloveType"
                value="small"
                name="glove_type"
                defaultChecked
              />
            ) : (
              <input
                type="radio"
                id="small"
                className="gloveType"
                value="small"
                name="glove_type"
              />
            )}
            <label htmlFor="medium">Medium</label>
            {card.glove_type === "medium" ? (
              <input
                type="radio"
                id="medium"
                className="gloveType"
                name="glove_type"
                value="medium"
                defaultChecked
              />
            ) : (
              <input
                type="radio"
                id="medium"
                className="gloveType"
                name="glove_type"
                value="medium"
              />
            )}
            <label htmlFor="large">Large</label>
            {card.glove_type === "large" ? (
              <input
                type="radio"
                id="large"
                className="gloveType"
                name="glove_type"
                value="large"
                defaultChecked
              />
            ) : (
              <input
                type="radio"
                id="large"
                className="gloveType"
                name="glove_type"
                value="large"
              />
            )}
            <br />
          </label>
          <label>
            Dominant Hand: <s />
            <label htmlFor="right">Right</label>
            {card.dominant_hand === "right" ? (
              <input
                type="radio"
                id="right"
                className="dominantHand"
                name="dominant_hand"
                value="right"
                defaultChecked
              />
            ) : (
              <input
                type="radio"
                id="right"
                className="dominantHand"
                name="dominant_hand"
                value="right"
              />
            )}
            <label htmlFor="left">Left</label>
            {card.dominant_hand === "left" ? (
              <input
                type="radio"
                id="left"
                className="dominantHand"
                name="dominant_hand"
                value="left"
                defaultChecked
              />
            ) : (
              <input
                type="radio"
                id="left"
                className="dominantHand"
                name="dominant_hand"
                value="left"
              />
            )}
            <br />
          </label>
        </section>
        <section className="edit-card-section-two">
          Equipment:
          <br />
          <textarea
            rows="4"
            cols="50"
            className="equipment"
            name="equipment"
            defaultValue={card.equipment}
          />
          <br />
          Supplies:
          <br />
          <textarea
            rows="4"
            cols="50"
            className="supplies"
            name="supplies"
            defaultValue={card.supplies}
          />
          <br />
          Instrumentation:
          <br />
          <textarea
            rows="4"
            cols="50"
            className="instrumentation"
            name="instrumentation"
            defaultValue={card.instrumentation}
          />
          <br />
          Suture and usage:
          <br />
          <textarea
            rows="4"
            cols="50"
            className="sutureAndUsage"
            name="suture_and_usage"
            defaultValue={card.suture_and_usage}
          />
          <br />
        </section>
        Dressings:
        <br />
        <textarea
          rows="4"
          cols="50"
          className="dressings"
          name="dressings"
          defaultValue={card.dressings}
        />
        <br />
        Skin Prep:
        <br />
        <textarea
          rows="4"
          cols="50"
          className="skinPrep"
          name="skin_prep"
          defaultValue={card.skin_prep}
        />
        <br />
        Medication:
        <br />
        <textarea
          rows="4"
          cols="50"
          className="medications"
          name="medications"
          defaultValue={card.medications}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };
  handleCancelButton = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <nav className="edit-card-navigation">
          <header className="edit-card-header">
            <h1 className="edit-card-title">prefcards</h1>
          </header>
          <button type="click" onClick={this.handleCancelButton}>
            Cancel
          </button>
          <LogoutButton />
        </nav>
        {this.findCardById()}
      </div>
    );
  }
}
