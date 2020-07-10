import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, validationOptions } from '../utils/data.js';



const editPopup = document.querySelector('#editPopup');
const newItemPopup = document.querySelector('#newItemPopup');
const imagePopup = document.querySelector('#imagePopup');
const editFormElement = editPopup.querySelector('.popup__container');
const newItemFormElement = newItemPopup.querySelector('.popup__container');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');



const editPopupClass = new PopupWithForm(editPopup, editFormSubmitHandler);
const newItemPopupClass = new PopupWithForm(newItemPopup, newItemFormSubmitHandler);
const imagePopupClass = new PopupWithImage(imagePopup);
editPopupClass.setEventListeners();
newItemPopupClass.setEventListeners();
imagePopupClass.setEventListeners();



const userInfo = new UserInfo({
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__subtitle')
});



const editFormValidation = new FormValidator(validationOptions, editFormElement);
const newItemFormValidation = new FormValidator(validationOptions, newItemFormElement);
editFormValidation.enableValidation();
newItemFormValidation.enableValidation();



const cardSheet = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      return new Card(item, '#cardsElement', imagePopupClass.open).returnCard();
    }
  },
  document.querySelector('.cards')
);
cardSheet.renderItems(initialCards);

function createCard({ name, link }, cardSelector) {
  const card = new Card({ name, link }, cardSelector, imagePopupClass.open);
  return card.returnCard();
}



function editFormSubmitHandler({ nameInput: name, descriptionInput: description  }) {
  userInfo.setUserInfo({ name, description });
}

function newItemFormSubmitHandler({ placeInput: name, linkInput: link }) {
  cardSheet.addItem(
    createCard(
      { name, link },
      '#cardsElement'
    )
  );
}



editButton.addEventListener('click', () => {
  editFormValidation.resetErrors();
  editPopupClass.open();
  editPopup.querySelector('.popup__input_text_name').value = userInfo.getUserInfo().name;
  editPopup.querySelector('.popup__input_text_description').value = userInfo.getUserInfo().description;
});
addButton.addEventListener('click', () => {
  newItemFormValidation.resetErrors();
  newItemPopupClass.open();
});
