import { popupOpen } from './utils.js';


class Card {

  constructor(name, link, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
  }

  _createCard() {
    this._cardTemplate = document.querySelector(`#${this._cardSelector}`).content;
    this._card = this._cardTemplate.querySelector('.cards__element').cloneNode(true);

    this._card.querySelector('.cards__image').src = this._link;
    this._card.querySelector('.cards__title').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.like-button').addEventListener('click', () => this._likeOnCard());
    this._card.querySelector('.trash-button').addEventListener('click', () => this._deleteCard());
    this._card.querySelector('.cards__image').addEventListener('click', () => this._openImagePopup());
  }

  _likeOnCard() {
    this._card.querySelector('.like-button').classList.toggle('like-button_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = '';
  }

  _openImagePopup() {
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__caption').textContent = this._name;
    popupOpen(document.querySelector('#imagePopup'));
  }

  returnCard() {
    return this._createCard();
  }

}


export { Card };
