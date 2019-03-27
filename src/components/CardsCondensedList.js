import React from 'react';
import ApiService from '../services/api-service';
import CardsContext  from '../context/CardsContext';
import './CardsCondensedList.css';

export default class CardsCondensedList extends React.Component {
    static contextType = CardsContext
    componentDidMount(){
        ApiService.getAllCards()
            .then(list => this.context.setCardsList(list))
        ApiService.getAllUsers()
            .then(list => this.context.setUsersList(list))
    }
    handleCardClick = (e) => {
        this.props.history.push(`/card/${e.target.getAttribute('id')}`)
    }
    displayCondensedCards = () => {
        return this.context.cardsList.map(card => {
            return (
                <li key={card.id} id={card.id} className="card-condensed">
                    <h2 className="card-condensed-title">{card.surgeon}</h2>
                    <p className="card-condensed-procedure">{card.procedure}</p>
                    <button type="click" id={card.id} className="card-condensed-button" onClick={this.handleCardClick}>Expand</button>
                </li>
            )
        })
    }
    render(){
        return(
            <>
               {this.displayCondensedCards()}
            </>
        )
    }
}