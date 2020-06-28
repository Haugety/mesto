import { FormValidator } from './FormValidator.js';
import { validationOptions } from './data.js';


function formReset(formElement) {
  const formValidator = new FormValidator(validationOptions, formElement);
  formValidator.resetErrors();
  formElement.reset();
}

function popupsSetEventListeners(popupElement) {
  const closeButton = popupElement.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closeEventOnButton);
  document.addEventListener('keydown', closeKeyHandler);
  popupElement.addEventListener('mousedown', popupCloseIfClickOnOverlay);
}

function popupsRemoveEventListeners(popupElement) {
  const closeButton = popupElement.querySelector('.popup__close-button');
  closeButton.removeEventListener('click', closeEventOnButton);
  document.removeEventListener('keydown', closeKeyHandler);
  popupElement.removeEventListener('mousedown', popupCloseIfClickOnOverlay);
}

function popupClose(popupElement) {
  popupElement.classList.remove('popup_opened');
  if(popupElement.id !== 'imagePopup') {
    formReset(popupElement.querySelector('.popup__container'));
  }
  popupsRemoveEventListeners(popupElement);
}

function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  popupsSetEventListeners(popupElement);
}

function closeEventOnButton(evt) {
  popupClose(evt.target.closest('.popup'));
}

function closeKeyHandler(evt) {
  if (evt.key === 'Escape') {
    popupClose(document.querySelector('.popup_opened'));
  }
}

function popupCloseIfClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    popupClose(evt.target);
  }
}


export { popupClose, popupOpen };
