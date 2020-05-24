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
const placeInput = document.querySelector('.popup__input_text_place');
const linkInput = document.querySelector('.popup__input_text_link');

const cardsList = document.querySelector('.cards');
const templateCardsElement = document.querySelector('#cardsElement').content;

const imagePopupElement = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');

function editPopupOpenClose() {
  if (!editPopup.classList.contains('popup_opened')) {
    editPopup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
  }
  else {
    editPopup.classList.remove('popup_opened');
  }
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  if (nameInput.value !== '' && descriptionInput.value !== '') {
    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    editPopup.classList.remove('popup_opened');
  } else {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
  }
}

function newItemPopupOpenClose() {
  if (!newItemPopup.classList.contains('popup_opened')) {
    newItemPopup.classList.add('popup_opened');
  }
  else {
    newItemPopup.classList.remove('popup_opened');
  }
}

function newItemFormSubmitHandler (evt) {
  evt.preventDefault();

  if (placeInput.value !== '' && linkInput.value !== '') {
    addCard(placeInput.value, linkInput.value);
    newItemPopup.classList.remove('popup_opened');
  }

  placeInput.value = '';
  linkInput.value = '';
}

function imagePopupOpenClose() {
  if (!imagePopup.classList.contains('popup_opened')) {
    imagePopup.classList.add('popup_opened');
  }
  else {
    imagePopup.classList.remove('popup_opened');
  }
}

function createCard(name, link) {
  const userCardsElement = templateCardsElement.cloneNode(true);
  const likeButton = userCardsElement.querySelector('.like-button');
  const trashButton = userCardsElement.querySelector('.trash-button');
  const cardImage = userCardsElement.querySelector('.cards__image');
  const cardTitle = userCardsElement.querySelector('.cards__title');

  cardImage.src = link;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', function () {
    console.log(likeButton);
    likeButton.classList.toggle('like-button_active');
  });

  trashButton.addEventListener('click', function () {
    trashButton.parentElement.remove();
  });

  userCardsElement.querySelector('.cards__image').addEventListener('click', function () {
    imagePopupOpenClose();
    imagePopupElement.src = cardImage.src;
    imagePopupCaption.textContent = cardTitle.textContent;
  });

  return userCardsElement;
}

function addCard(name, link) {
  const resultOfCreateCard = createCard(name, link);
  cardsList.prepend(resultOfCreateCard);
}

function renderDefaultCards() {
  initialCards.forEach(function (item) {
    addCard(item.name, item.link);
  });
}

renderDefaultCards();

editButton.addEventListener('click', editPopupOpenClose);
newItemButton.addEventListener('click', newItemPopupOpenClose);

closeButtonImagePopup.addEventListener('click', imagePopupOpenClose);
closeButtonNewItemPopup.addEventListener('click', newItemPopupOpenClose);
closeButtonEditPopup.addEventListener('click', editPopupOpenClose);

editFormElement.addEventListener('submit', editFormSubmitHandler);
newItemFormElement.addEventListener('submit', newItemFormSubmitHandler);
