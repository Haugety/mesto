import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationOptions } from './data.js';

const popupsList = Array.from(document.querySelectorAll('.popup'));
const editPopup = document.querySelector('#editPopup');
const newItemPopup = document.querySelector('#newItemPopup');

const editFormElement = editPopup.querySelector('.popup__container');
const newItemFormElement = newItemPopup.querySelector('.popup__container');

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__subtitle');

const cardsList = document.querySelector('.cards');
const popupsCloseButtonList = Array.from(document.querySelectorAll('.popup__close-button'));

const nameInput = editPopup.querySelector('.popup__input_text_name');
const descriptionInput = editPopup.querySelector('.popup__input_text_description');

const placeInput = newItemPopup.querySelector('.popup__input_text_place');
const linkInput = newItemPopup.querySelector('.popup__input_text_link');

const editFormValidation = new FormValidator(validationOptions, editFormElement);
const newItemFormValidation = new FormValidator(validationOptions, newItemFormElement);
editFormValidation.enableValidation();
newItemFormValidation.enableValidation();


function formReset(formElement, formValidator) {
  formValidator.resetErrors();
  formElement.reset();
}

function popupCloseIfClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    popupClose(evt.target);
  }
}

function closeKeyHandler(evt) {
  if (evt.key === 'Escape') {
    popupClose(document.querySelector('.popup_opened'));
  }
}

function popupClose(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeyHandler);
}

function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeyHandler);
}

function createCard(name, link, cardSelector) {
  const card = new Card(name, link, cardSelector, popupOpen);
  return card.returnCard();
}

function addCardInDom(name, link) {
  cardsList.prepend(createCard(name, link, 'cardsElement'));
}

function renderDefaultCards(cardsObject) {
  cardsObject.forEach(function (item) {
    cardsList.append(createCard(item.name, item.link, 'cardsElement'));
  });
}

function newItemFormSubmitHandler(evt) {
  evt.preventDefault();

  addCardInDom(placeInput.value, linkInput.value);
  popupClose(newItemPopup);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  popupClose(editPopup);
}


renderDefaultCards(initialCards);


document.querySelector('.edit-button').addEventListener('click', () => {
  formReset(editFormElement, editFormValidation);
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  popupOpen(editPopup);
});
document.querySelector('.add-button').addEventListener('click', () => {
  formReset(newItemFormElement, newItemFormValidation);
  popupOpen(newItemPopup);
});

popupsList.forEach((popup) => {
  popup.addEventListener('mousedown', popupCloseIfClickOnOverlay);
});
popupsCloseButtonList.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    popupClose(closeButton.closest('.popup'));
  });
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
newItemFormElement.addEventListener('submit', newItemFormSubmitHandler);
