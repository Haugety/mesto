const popup = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__container');
const saveButton = document.querySelector('.popup__save-button');

const nameInput = formElement.querySelector('.popup__input_text_name');
const descriptionInput = formElement.querySelector('.popup__input_text_description');

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__subtitle');

function popupOpenClose() {
  if (popup.classList.contains('popup_opened') !== true) {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
  }
  else {
    popup.classList.remove('popup_opened');
  }
}

function savePopup() {
  if (nameInput.value !== '' && descriptionInput.value !== '') {
    popup.classList.remove('popup_opened');
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  if (nameInput.value !== '' && descriptionInput.value !== '') {
    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
  } else {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
  }
}

editButton.addEventListener('click', popupOpenClose);
closeButton.addEventListener('click', popupOpenClose);

formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', savePopup);




