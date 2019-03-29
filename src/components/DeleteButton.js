import React from "react";
import ApiService from "../services/api-service";
import CardsContext from "../context/CardsContext";

export default class DeleteButton extends React.Component {
  static contextType = CardsContext;
  handleDelete = () => {
    const id = parseInt(this.props.url.split("/").slice(2));
    ApiService.deleteCard(id)
      .then(() => {
        this.context.deleteCardFromList(id);
        this.props.history.push("/all");
      })

  };
  render() {
    return (
      <button type="click" onClick={this.handleDelete}>
        Delete Card
      </button>
    );
  }
}
