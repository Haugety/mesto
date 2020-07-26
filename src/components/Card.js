export class Card {

  constructor(data, userId, cardSelector, { handleCardClick, handleTrashButtonClick, setHandleSubmit, removeCard, putLike, removeLike }) {
    this._cardSelector = cardSelector;
    this._data = data;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._setHandleSubmit = setHandleSubmit;
    this._removeCard = removeCard;
    this._putLike = putLike;
    this._removeLike = removeLike;
    this._isLiked = this._isLikedCheck();
  }

  _createCard() {
    this._cardTemplate = document.querySelector(`${this._cardSelector}`).content;
    this._card = this._cardTemplate.querySelector('.cards__element').cloneNode(true);
    this._trashButton = this._card.querySelector('.trash-button');
    this._image = this._card.querySelector('.cards__image');
    this._likesAmountSpan = this._card.querySelector('.like-button__amount');

    if (this._ownerId !== this._userId) {
      this._trashButton.setAttribute('disabled', '');
      this._trashButton.classList.add('trash-button_inactive');
    }

    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesAmountSpan.textContent = this._likes.length;
    this._likesStyle();


    this._card.querySelector('.cards__title').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.like-button').addEventListener('click', () => this._likeOnCard());
    this._card.querySelector('.trash-button').addEventListener('click', () => {
      this._handleTrashButtonClick();
      this._setHandleSubmit(this._deleteCard);
    });
    this._card.querySelector('.cards__image').addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _likeOnCard() {
    this._likeButton = this._card.querySelector('.like-button');
    this._likesAmountSpan = this._card.querySelector('.like-button__amount');
    if (!this._isLiked) {
      this._putLike(this._cardId)
      .then((res) => {
        this._likesAmountSpan.textContent = res.likes.length;
        this._likeButton.classList.add('like-button_active');
        this._isLiked = true;
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this._removeLike(this._cardId)
      .then((res) => {
        this._likesAmountSpan.textContent = res.likes.length;
        this._likeButton.classList.remove('like-button_active');
        this._isLiked = false;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  _isLikedCheck() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  _likesStyle() {
    if (this._isLiked) {
      this._card.querySelector('.like-button').classList.add('like-button_active');
    }
  }

  _deleteCard = () => {
    this._removeCard(this._cardId)
    .then(() => {
      this._card.remove();
      this._card = null;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  returnCard() {
    return this._createCard();
  }

}
