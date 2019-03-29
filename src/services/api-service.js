import TokenService from "./token-service";
import config from "../config";
import jwt from 'jsonwebtoken';

const ApiService = {
  getAllCards() {
    console.log(jwt.decode(TokenService.getAuthToken()))
    return fetch(`${config.API_ENDPOINT}/all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postCard(newCard) {
    return fetch(`${config.API_ENDPOINT}/create-card`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: newCard
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateCard(id, newCard) {
    return fetch(`${config.API_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: newCard
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getAllUsers() {
    return fetch(`${config.API_ENDPOINT}/auth/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  deleteCard(id) {
    return fetch(`${config.API_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    });
  },
  getCardById(id) {
    return fetch(`${config.API_ENDPOINT}/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json());
  }
};
export default ApiService;
