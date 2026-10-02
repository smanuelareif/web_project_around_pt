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

const cardTemplate = document.querySelector("#card-template");
const imageModal = document.querySelector("#image-popup");

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const imageModalImage = imageModal.querySelector(".popup__image");
  const imageModalCaption = imageModal.querySelector(".popup__caption");

  cardImage.addEventListener("click", function () {
    imageModalImage.src = link;
    imageModalCaption.textContent = name;

    openModal(imageModal);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButton.parentElement.remove();
  });

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

const cardsList = document.querySelector(".cards__list");

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector("#edit-popup .popup__close");
const editModal = document.querySelector("#edit-popup");
const addButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = document.querySelector(
  "#new-card-popup .popup__close",
);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

const imageModalCloseButton = imageModal.querySelector(".popup__close");

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

function handleOpenNewCardModal() {
  openModal(newCardModal);
}

addButton.addEventListener("click", handleOpenNewCardModal);

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

const newCardForm = document.querySelector("#new-card-form");
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = newCardName.value;
  const link = newCardLink.value;

  renderCard(name, link, cardsList);

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
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  closeModal(editModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
