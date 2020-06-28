import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationOptions } from './data.js';
import { popupClose, popupOpen } from './utils.js';


const editPopup = document.querySelector('#editPopup');
const newItemPopup = document.querySelector('#newItemPopup');

const editFormElement = editPopup.querySelector('.popup__container');
const newItemFormElement = newItemPopup.querySelector('.popup__container');

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__subtitle');

const nameInput = editPopup.querySelector('.popup__input_text_name');
const descriptionInput = editPopup.querySelector('.popup__input_text_description');

const editFormValidation = new FormValidator(validationOptions, editFormElement);
const newItemFormValidation = new FormValidator(validationOptions, newItemFormElement);
editFormValidation.enableValidation();
newItemFormValidation.enableValidation();


function addCard(name, link) {
  const card = new Card(name, link, 'cardsElement');
  const cardsList = document.querySelector('.cards');

  cardsList.prepend(card.returnCard());
}

function renderDefaultCards(cardsObject) {
  cardsObject.forEach(function (item) {
    const card = new Card(cardsObject.name, cardsObject.link, 'cardsElement');
    addCard(item.name, item.link);
  });
}

function newItemFormSubmitHandler(evt) {
  const placeInput = document.querySelector('.popup__input_text_place');
  const linkInput = document.querySelector('.popup__input_text_link');

  evt.preventDefault();

  addCard(placeInput.value, linkInput.value);
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
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  popupOpen(editPopup);
});
document.querySelector('.add-button').addEventListener('click', () => {
  popupOpen(newItemPopup);
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
newItemFormElement.addEventListener('submit', newItemFormSubmitHandler);
