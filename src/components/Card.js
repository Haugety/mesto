export class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    this._cardTemplate = document.querySelector(`${this._cardSelector}`).content;
    this._card = this._cardTemplate.querySelector('.cards__element').cloneNode(true);

    this._card.querySelector('.cards__image').src = this._link;
    this._card.querySelector('.cards__title').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.like-button').addEventListener('click', () => this._likeOnCard());
    this._card.querySelector('.trash-button').addEventListener('click', () => this._deleteCard());
    this._card.querySelector('.cards__image').addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _likeOnCard() {
    this._card.querySelector('.like-button').classList.toggle('like-button_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  returnCard() {
    return this._createCard();
  }

}
