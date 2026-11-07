import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openModal, closeModal, handleOverlayClick } from "./utils.js";

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "popup__button_disabled",
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const imageModal = document.querySelector("#image-popup");

const cardsList = document.querySelector(".cards__list");

initialCards.forEach(function (card) {
  const cardElement = new Card(card, "#card-template");
  const cardView = cardElement.getView();

  cardsList.prepend(cardView);
});

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector("#edit-popup .popup__close");
const editModal = document.querySelector("#edit-popup");
const addButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = document.querySelector(
  "#new-card-popup .popup__close",
);

editModal.addEventListener("click", handleOverlayClick);
newCardModal.addEventListener("click", handleOverlayClick);
imageModal.addEventListener("click", handleOverlayClick);

const imageModalCloseButton = imageModal.querySelector(".popup__close");

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

function handleOpenNewCardModal() {
  newCardForm.reset();

  newCardFormValidator.resetValidation();

  openModal(newCardModal);
}

addButton.addEventListener("click", handleOpenNewCardModal);

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

const newCardForm = document.querySelector("#new-card-form");
const newCardFormValidator = new FormValidator(settings, newCardForm);
newCardFormValidator.setEventListeners();
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  if (!newCardForm.checkValidity()) {
    return;
  }

  const name = newCardName.value;
  const link = newCardLink.value;
  const cardData = { name: name, link: link };
  const cardElement = new Card(cardData, "#card-template");
  const cardView = cardElement.getView();

  cardsList.prepend(cardView);

  closeModal(newCardModal);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formName = document.querySelector(".popup__input_type_name");
const formDescription = document.querySelector(
  ".popup__input_type_description",
);
const profileForm = document.querySelector("#edit-profile-form");
const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.setEventListeners();

editButton.addEventListener("click", handleOpenEditModal);
closeButton.addEventListener("click", function () {
  closeModal(editModal);
});

function fillProfileForm() {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();

  profileFormValidator.resetValidation();

  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (!profileForm.checkValidity()) {
    return;
  }

  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  closeModal(editModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
