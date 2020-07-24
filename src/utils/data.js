export const validationOptions = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__set',
  inputSelector: '.popup__input',
  errorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active'
};

export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '2cf602a9-f630-4a8e-9437-bb139a960cac',
    'Content-Type': 'application/json'
  }
}
