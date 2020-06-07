const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationOptions = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const editPopup = document.querySelector('#editPopup');
const newItemPopup = document.querySelector('#newItemPopup');
const imagePopup = document.querySelector('#imagePopup');

const editFormElement = editPopup.querySelector('.popup__container');
const newItemFormElement = newItemPopup.querySelector('.popup__container');

const editButton = document.querySelector('.edit-button');
const newItemButton = document.querySelector('.add-button');

const closeButtonEditPopup = editPopup.querySelector('.popup__close-button');
const closeButtonNewItemPopup = newItemPopup.querySelector('.popup__close-button');
const closeButtonImagePopup = imagePopup.querySelector('.popup__close-button');

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__input_text_name');
const descriptionInput = document.querySelector('.popup__input_text_description');

const cardsList = document.querySelector('.cards');
const templateCardsElement = document.querySelector('#cardsElement').content;

const formReset = (popupElement) => {
  if (popupElement.id === 'newItemPopup') {
    popupElement.querySelector('.popup__container').reset();
  }
};

const closeKeyHandler = (evt, popupElement) => {
  if (evt.key === 'Escape') {
    popupClose(popupElement);
  }
};

const popupCloseIfClickOnOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    popupClose(evt.target);
  }
};

const popupOpen = (popupElement) => {
  popupElement.classList.add('popup_opened');
  enableValidation(validationOptions);

  document.addEventListener('keydown', (evt) => {
    closeKeyHandler(evt, popupElement);
  });
  popupElement.addEventListener('mousedown', popupCloseIfClickOnOverlay);
};

const popupClose = (popupElement) => {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', (evt) => {
    closeKeyHandler(evt, popupElement);
  });
  popupElement.removeEventListener('mousedown', popupCloseIfClickOnOverlay);
  formReset(popupElement);
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  popupClose(editPopup);
};

const likeOnCard = () => {
  event.target.classList.toggle('like-button_active');
};

const deleteCard = () => {
  event.target.parentElement.remove();
};

const openImagePopup = (name, link) => {
  const imagePopupElement = document.querySelector('.popup__image');
  const imagePopupCaption = document.querySelector('.popup__caption');

  popupOpen(imagePopup);
  imagePopupElement.src = link;
  imagePopupCaption.textContent = name;
};

const createCard = (name, link) => {
  const userCardsElement = templateCardsElement.cloneNode(true);
  const likeButton = userCardsElement.querySelector('.like-button');
  const trashButton = userCardsElement.querySelector('.trash-button');
  const cardImage = userCardsElement.querySelector('.cards__image');
  const cardTitle = userCardsElement.querySelector('.cards__title');

  cardImage.src = link;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', likeOnCard);
  trashButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => { openImagePopup(name, link); });

  return userCardsElement;
};

const addCard = (name, link) => {
  const callbackOfCreateCard = createCard(name, link);

  cardsList.prepend(callbackOfCreateCard);
};

const renderDefaultCards = (cardsObject) => {
  cardsObject.forEach(function (item) {
    addCard(item.name, item.link);
  });
};

const newItemFormSubmitHandler = (evt) => {
  const placeInput = document.querySelector('.popup__input_text_place');
  const linkInput = document.querySelector('.popup__input_text_link');

  evt.preventDefault();

  addCard(placeInput.value, linkInput.value);
  popupClose(newItemPopup);
};


renderDefaultCards(initialCards);


editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  popupOpen(editPopup);
});
newItemButton.addEventListener('click', () => {
  popupOpen(newItemPopup);
});

closeButtonEditPopup.addEventListener('click', () => { popupClose(editPopup); });
closeButtonNewItemPopup.addEventListener('click', () => {
  popupClose(newItemPopup);
});
closeButtonImagePopup.addEventListener('click', () => { popupClose(imagePopup); });

editFormElement.addEventListener('submit', editFormSubmitHandler);
newItemFormElement.addEventListener('submit', newItemFormSubmitHandler);
