import { openModal } from "./utils.js";

const imageModal = document.querySelector("#image-popup");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _getCardElement() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__title").textContent = this._name;

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      imageModalImage.src = this._link;
      imageModalImage.alt = this._name;
      imageModalCaption.textContent = this._name;

      openModal(imageModal);
    });
  }

  getView() {
    this._getCardElement();
    this._setEventListeners();

    return this._element;
  }
}
