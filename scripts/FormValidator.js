export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  setEventListeners() {
    const inputList = this._formElement.querySelectorAll(
      this._settings.inputSelector,
    );

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);

    errorElement.textContent = input.validationMessage;

    errorElement.classList.add(this._settings.errorClass);

    input.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);

    errorElement.textContent = "";

    errorElement.classList.remove(this._settings.errorClass);

    input.classList.remove(this._settings.inputErrorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    const submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector,
    );

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector),
    );

    const hasInvalidInput = this._hasInvalidInput(inputList);

    submitButton.disabled = hasInvalidInput;

    if (hasInvalidInput) {
      submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      submitButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  resetValidation() {
    const inputList = this._formElement.querySelectorAll(
      this._settings.inputSelector,
    );

    inputList.forEach((input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }
}
