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

function getCardElement(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const imageModalImage = imageModal.querySelector(".popup__image");
  const imageModalCaption = imageModal.querySelector(".popup__caption");

  cardImage.addEventListener("click", function () {
    imageModalImage.src = link;
    imageModalImage.alt = name;
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

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");

    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

editModal.addEventListener("click", handleOverlayClick);
newCardModal.addEventListener("click", handleOverlayClick);
imageModal.addEventListener("click", handleOverlayClick);

const imageModalCloseButton = imageModal.querySelector(".popup__close");

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

function handleOpenNewCardModal() {
  newCardForm.reset();

  resetValidation(
    newCardForm,
    [newCardName, newCardLink],
    [newCardNameError, newCardLinkError],
    newCardSubmitButton,
  );

  openModal(newCardModal);
}

addButton.addEventListener("click", handleOpenNewCardModal);

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

const newCardForm = document.querySelector("#new-card-form");
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");
const newCardNameError = document.querySelector("#place-name-error");
const newCardLinkError = document.querySelector("#place-link-error");
const newCardSubmitButton = newCardForm.querySelector('button[type="submit"]');

newCardName.addEventListener("input", function () {
  toggleButtonState(newCardForm, newCardSubmitButton);
  showInputError(newCardName, newCardNameError);
});

newCardLink.addEventListener("input", function () {
  toggleButtonState(newCardForm, newCardSubmitButton);
  showInputError(newCardLink, newCardLinkError);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  if (!newCardForm.checkValidity()) {
    return;
  }

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
const profileSubmitButton = profileForm.querySelector("button[type='submit']");
const profileNameError = document.querySelector("#profile-name-error");
const profileDescriptionError = document.querySelector(
  "#profile-description-error",
);

function toggleButtonState(form, button) {
  const allValid = form.checkValidity();
  button.disabled = !allValid;
  button.classList.toggle("popup__button_disabled", !allValid);
}

formName.addEventListener("input", function () {
  toggleButtonState(profileForm, profileSubmitButton);
});

formDescription.addEventListener("input", function () {
  toggleButtonState(profileForm, profileSubmitButton);
});

function showInputError(inputElement, errorElement) {
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("popup__error_visible");
    inputElement.classList.add("popup__input_type_error");
  } else {
    errorElement.textContent = "";
    errorElement.classList.remove("popup__error_visible");
    inputElement.classList.remove("popup__input_type_error");
  }
}

function resetValidation(form, inputs, errors, button) {
  inputs.forEach(function (input) {
    input.classList.remove("popup__input_type_error");
  });

  errors.forEach(function (error) {
    error.textContent = "";
    error.classList.remove("popup__error_visible");
  });

  toggleButtonState(form, button);
}

formName.addEventListener("input", function () {
  showInputError(formName, profileNameError);
});

formDescription.addEventListener("input", function () {
  showInputError(formDescription, profileDescriptionError);
});

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

  resetValidation(
    profileForm,
    [formName, formDescription],
    [profileNameError, profileDescriptionError],
    profileSubmitButton,
  );

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
