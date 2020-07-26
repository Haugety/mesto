import './index.css';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationOptions, options } from '../utils/data.js';



const api = new Api(options);


const avatarPopup = document.querySelector('#avatarPopup');
const editPopup = document.querySelector('#editPopup');
const newItemPopup = document.querySelector('#newItemPopup');
const imagePopup = document.querySelector('#imagePopup');
const trashPopup = document.querySelector('#trashPopup');
const avatarFormElement = avatarPopup.querySelector('.popup__container');
const editFormElement = editPopup.querySelector('.popup__container');
const newItemFormElement = newItemPopup.querySelector('.popup__container');
const editAvatarButton = document.querySelector('.profile__edit-avatar');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');


const imagePopupClass = new PopupWithImage(imagePopup);
const trashPopupClass = new PopupDeleteCard(trashPopup);
imagePopupClass.setEventListeners();
trashPopupClass.setEventListeners();


const avatarFormValidation = new FormValidator(validationOptions, avatarFormElement);
const editFormValidation = new FormValidator(validationOptions, editFormElement);
const newItemFormValidation = new FormValidator(validationOptions, newItemFormElement);
avatarFormValidation.enableValidation();
editFormValidation.enableValidation();
newItemFormValidation.enableValidation();



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((data) => {
    const [info, cards] = data;

    const userInfo = new UserInfo(info);
    userInfo.setUserInfo(info);
    userInfo.setAvatar(info);

    const userId = info._id;


    const cardSheet = new Section(
      {
        renderer: (item) => {
          return createCard(item);
        }
      },
      document.querySelector('.cards')
    );

    cardSheet.renderItems(cards);


    const avatarPopupClass = new PopupWithForm(avatarPopup, avatarFormSubmitHandler);
    const editPopupClass = new PopupWithForm(editPopup, editFormSubmitHandler);
    const newItemPopupClass = new PopupWithForm(newItemPopup, newItemFormSubmitHandler);
    avatarPopupClass.setEventListeners();
    editPopupClass.setEventListeners();
    newItemPopupClass.setEventListeners();


    function createCard(data) {
      return new Card(
        data,
        userId,
        '#cardsElement',
        {
          handleCardClick: imagePopupClass.open,
          handleTrashButtonClick: trashPopupClass.open,
          setHandleSubmit: trashPopupClass.setHandleSubmit,
          removeCard: api.removeCard,
          putLike: api.putLike,
          removeLike: api.removeLike
        }
      )
      .returnCard();
    }


    function avatarFormSubmitHandler({ avatarInput: avatar }, saveButton) {
      api.setUserAvatar({ avatar })
      .then((data) => {
        userInfo.setAvatar(data);
      })
      .then(() => {
        saveButton.textContent = 'Сохранить';
        avatarPopupClass.close();
      })
      .catch((err) => {
        console.log(err);
      });
    }


    function editFormSubmitHandler({ nameInput: name, descriptionInput: about }, saveButton) {
      api.setUserInfo({ name, about })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        saveButton.textContent = 'Сохранить';
        editPopupClass.close();
      })
      .catch((err) => {
        console.log(err);
      });
    }


    function newItemFormSubmitHandler({ placeInput: name, linkInput: link }, saveButton) {
      api.setCard({ name, link })
      .then((data) => {
        cardSheet.addItem(createCard(data));
      })
      .then(() => {
        saveButton.textContent = 'Создать';
        newItemPopupClass.close();
      })
      .catch((err) => {
        console.log(err);
      });
    }


    editAvatarButton.addEventListener('click', () => {
      avatarFormValidation.resetErrors();
      avatarPopupClass.open();
    });
    editButton.addEventListener('click', () => {
      editFormValidation.resetErrors();
      editPopupClass.open();
      editPopup.querySelector('.popup__input_text_name').value = document.querySelector('.profile__title').textContent;
      editPopup.querySelector('.popup__input_text_description').value = document.querySelector('.profile__subtitle').textContent;
    });
    addButton.addEventListener('click', () => {
      newItemFormValidation.resetErrors();
      newItemPopupClass.open();
    });


  })
  .catch((err) => {
    console.log(err);
  });
