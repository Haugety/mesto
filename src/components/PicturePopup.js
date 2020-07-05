import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (name, link) => {
    super.open();
    this._popupSelector.querySelector('.popup__caption').textContent = name;
    this._popupSelector.querySelector('.popup__image').src = link;
  }

}
