export class FormValidator {
  constructor(form) {
    this.form = form;
  }

  checkInputValidity(input, error){
    let isValid = true;
    if (input.validity.valueMissing) {
      isValid = false;
      this.addError(error);
      error.textContent = 'Пожалуйста, заполните поле';
    } else {
      this.removeError(error);
      error.textContent = '';
    }
    return isValid
  }

  setSubmitButtonState(button, status) {
    if (status === true) {
      button.classList.remove('form__button_disabled');
    } else {
      button.classList.add('form__button_disabled');
    }
  }

  chooseButton() {
    return Array.from(this.form.elements).find((elem) => {
      return elem.classList.contains('form__button');
    })
  }

  addError(error) {
    error.classList.add('form__error_active');
  }
  removeError(error) {
    error.classList.remove('form__error_active');
  }

  chooseError() {
    const errors = [];
    Array.from(this.form.elements).forEach((elem) => {
      if (elem.classList.contains('form__input')) {
        errors.push(elem.nextElementSibling);
      }
    })
    return errors;
  }

  checkValid() {
    let isFormValid = true;
    this.button = this.chooseButton();
    Array.from(form.elements).forEach((item) => {
      if (item.classList.contains('form__input')) {
        const isValid = this.checkInputValidity(item, item.nextElementSibling);
        if (!isValid) {
          isFormValid = false
        }
        this.setSubmitButtonState(this.button, isFormValid);
        item.addEventListener('focus', () => {
          const errors = this.chooseError();
          this.removeError(errors[0]);
          this.removeError(errors[1]);
          this.setSubmitButtonState(this.button, true)
        })
      }
    })
    return isFormValid;
  }
}