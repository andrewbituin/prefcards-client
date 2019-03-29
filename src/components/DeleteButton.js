import React from "react";
import ApiService from "../services/api-service";
import CardsContext from "../context/CardsContext";
import jwt from 'jsonwebtoken';
import TokenService from '../services/token-service';

export default class DeleteButton extends React.Component {
  static contextType = CardsContext;
  handleDelete = () => {
    const id = parseInt(this.props.url.split("/").slice(2));
    ApiService.deleteCard(id).then(() => {
      this.props.history.push("/all");
      this.context.deleteCardFromList(id);
      
    });
  };
  generateDeleteButton = () => {
    const loggedUser = jwt.decode(TokenService.getAuthToken());
    const id = parseInt(this.props.url.split("/").slice(2));
    const cardById = this.context.cardsList.find(card => card.id === id);
    if (loggedUser.full_name === cardById.surgeon || loggedUser.full_name === "Kate Nurr") {
      return (
        <button type="click" onClick={this.handleDelete}>
          Delete Card
        </button>
      );
    } else {
      return <></>;
    }
  };
  render() {
    return <>{this.generateDeleteButton()}</>;
  }
}
