import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__container');
    this._saveButton = this._form.querySelector('.popup__save-button');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._saveButton.textContent = 'Сохранение...';
      this._formSubmit(this._getInputValues(), this._saveButton);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}
