import { data } from "autoprefixer";

export class UserInfo {
  constructor(data) {
    this._data = data;
  }

  getUserInfo() {
    return data;
  }

  setUserInfo(data) {
    document.querySelector('.profile__title').textContent = data.name;
    document.querySelector('.profile__subtitle').textContent = data.about;
  }

  setAvatar(data) {
    document.querySelector('.profile__image').src = data.avatar;
  }

}
