export class FormValidator {

  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._fieldSet = this._formElement.querySelector(this._options.fieldsetSelector);
    this._inputList = Array.from(this._fieldSet.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._fieldSet.querySelector(this._options.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._options.inputErrorClass);
    this._errorElement.classList.add(this._options.errorClassActive);
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._options.inputErrorClass);
    this._errorElement.classList.remove(this._options.errorClassActive);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetErrors() {
    this._errorList = Array.from(this._formElement.querySelectorAll(this._options.errorSelector));
    this._errorList.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._options.inputErrorClass);
    });
    this._buttonElement.classList.add(this._options.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

}
