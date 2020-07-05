export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _popupCloseIfClickOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => this._popupCloseIfClickOnOverlay(evt));
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

}
