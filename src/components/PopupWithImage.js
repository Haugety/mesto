import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (name, link) => {
    this._image = this._popupSelector.querySelector('.popup__image');
    super.open();
    this._popupSelector.querySelector('.popup__caption').textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }

}
