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

const editButton = document.querySelector(".profile__edit-button");
const editCloseButton = document.querySelector("#edit-popup .popup__close");
const editModal = document.querySelector("#edit-popup");

const addButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = document.querySelector(
  "#new-card-popup .popup__close",
);

const newCardForm = document.querySelector("#new-card-form");
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formName = document.querySelector(".popup__input_type_name");
const formDescription = document.querySelector(
  ".popup__input_type_description",
);

const profileForm = document.querySelector("#edit-profile-form");

const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

const cardsList = document.querySelector(".cards__list");

const newCardFormValidator = new FormValidator(settings, newCardForm);
const profileFormValidator = new FormValidator(settings, profileForm);

newCardFormValidator.setEventListeners();
profileFormValidator.setEventListeners();

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  const cardView = cardElement.getView();

  cardsList.prepend(cardView);
}

initialCards.forEach(createCard);

function handleImageClick(name, link) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;

  openModal(imageModal);
}

function handleOpenNewCardModal() {
  newCardForm.reset();

  newCardFormValidator.resetValidation();

  openModal(newCardModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  if (!newCardForm.checkValidity()) {
    return;
  }

  const name = newCardName.value;
  const link = newCardLink.value;
  const cardData = { name: name, link: link };

  createCard(cardData);
  closeModal(newCardModal);
}

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

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

addButton.addEventListener("click", handleOpenNewCardModal);
newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

editButton.addEventListener("click", handleOpenEditModal);
editCloseButton.addEventListener("click", function () {
  closeModal(editModal);
});

editModal.addEventListener("click", handleOverlayClick);
newCardModal.addEventListener("click", handleOverlayClick);
imageModal.addEventListener("click", handleOverlayClick);

newCardForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
