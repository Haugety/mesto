// Отображение шести карточек по-умолчанию

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

const cardsList = document.querySelector('.cards');
const templateCardsElement = document.querySelector('#cardsElement').content;

function renderDefaultCards(defaultCards) {
  for (i = 0; i < defaultCards.length; i++) {
    const userCardsElement = templateCardsElement.cloneNode(true);

    userCardsElement.querySelector('.cards__image').src = defaultCards[i].link;
    userCardsElement.querySelector('.cards__title').textContent = defaultCards[i].name;

    cardsList.append(userCardsElement);
  }
}

renderDefaultCards(initialCards);


// Открытие/закрытие/редактирование попапов

const popupsNodeList = document.querySelectorAll('.popup');
const editPopup = popupsNodeList[0];
const newItemPopup = popupsNodeList[1];
const imagePopup = popupsNodeList[2];

const closeButton = document.querySelectorAll('.popup__close-button');
const closeButtonEditPopup = closeButton[0];
const closeButtonNewItemPopup = closeButton[1];
const closeButtonImagePopup = closeButton[2];

const editButton = document.querySelector('.edit-button');

const formElementsNodeList = document.querySelectorAll('.popup__container');
const editFormElement = formElementsNodeList[0];
const newItemFormElement = formElementsNodeList[1];

const saveButtonsNodeList = document.querySelectorAll('.popup__save-button');
const saveButtonEditPopup = saveButtonsNodeList[0];
const saveButtonNewItemPopup = saveButtonsNodeList[1];




const nameInput = document.querySelector('.popup__input_text_name');
const descriptionInput = document.querySelector('.popup__input_text_description');

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__subtitle');

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

function saveEditPopup() {
  if (nameInput.value !== '' && descriptionInput.value !== '') {
    editPopup.classList.remove('popup_opened');
  }
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  if (nameInput.value !== '' && descriptionInput.value !== '') {
    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
  } else {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
  }
}

editButton.addEventListener('click', editPopupOpenClose);
closeButtonEditPopup.addEventListener('click', editPopupOpenClose);

editFormElement.addEventListener('submit', editFormSubmitHandler);
saveButtonEditPopup.addEventListener('click', saveEditPopup);



const newItemButton = document.querySelector('.add-button');

function newItemPopupOpenClose() {
  if (!newItemPopup.classList.contains('popup_opened')) {
    newItemPopup.classList.add('popup_opened');
  }
  else {
    newItemPopup.classList.remove('popup_opened');
  }
}

newItemButton.addEventListener('click', newItemPopupOpenClose);
closeButtonNewItemPopup.addEventListener('click', newItemPopupOpenClose);



const placeInput = document.querySelector('.popup__input_text_place');
const linkInput = document.querySelector('.popup__input_text_link');

function saveNewItemPopup() {
  if (placeInput.value !== '' && linkInput.value !== '') {
    newItemPopup.classList.remove('popup_opened');
  }
}

function newItemFormSubmitHandler (evt) {
  evt.preventDefault();

  if (placeInput.value !== '' && linkInput.value !== '') {
    const userCardsElement = templateCardsElement.cloneNode(true);

    userCardsElement.querySelector('.cards__image').src = linkInput.value;
    userCardsElement.querySelector('.cards__title').textContent = placeInput.value;

    cardsList.prepend(userCardsElement);
  }

  placeInput.value = '';
  linkInput.value = '';

}

newItemFormElement.addEventListener('submit', newItemFormSubmitHandler);
saveButtonNewItemPopup.addEventListener('click', saveNewItemPopup);



const imagePopupElement = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');

function imagePopupOpenClose() {
  if (!imagePopup.classList.contains('popup_opened')) {
    imagePopup.classList.add('popup_opened');
  }
  else {
    imagePopup.classList.remove('popup_opened');
  }
}

cardsList.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('like-button')) {
    evt.target.classList.toggle('like-button_active');
  }
  if (evt.target.classList.contains('trash-button')) {
    evt.target.parentElement.remove();
  }
  if (evt.target.classList.contains('cards__image')) {
    imagePopupOpenClose();
    imagePopupElement.src = evt.target.src;
    imagePopupCaption.textContent = evt.target.parentElement.querySelector('.cards__title').textContent;
  }
});

closeButtonImagePopup.addEventListener('click', imagePopupOpenClose);



