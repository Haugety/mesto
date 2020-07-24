import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__container');
  }

  setHandleSubmit = (foo) => {
    this._handleSubmit = foo;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      super.close();
    });
  }

  open = () => {
    super.open();
  }

}
