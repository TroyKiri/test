import { FormValidator } from './validation/Validation.js';

// Таймер обратного отсчета

// Дни
const days = document.querySelector('.timer__days');
// Часы
const hours = document.querySelector('.timer__hours');
// Минуты
const minutes = document.querySelector('.timer__minutes');
// Секунды
const seconds = document.querySelector('.timer__seconds');

const date = { days, hours, minutes, seconds };

// Конечная дата
const endtime = 'July 16 2021 17:00:00'

// Считаем оставшееся время
function getTimeRemaining(endtime){
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );
  return { total, days, hours, minutes, seconds };
}

//Обновление и отображание таймера
function updateTimer(date, endtime) {
  const time = getTimeRemaining(endtime);
  date.days.innerHTML = time.days;
  date.hours.innerHTML = time.hours;
  date.minutes.innerHTML = time.minutes;
  date.seconds.innerHTML = time.seconds;

  if(time.total<=0){
    clearInterval(timeInterval);
  }
}

updateTimer(date, endtime);
setInterval(updateTimer, 1000, date, endtime);


// Форма

const form = document.forms.form;
const button = form.elements.submit;

const popupError = document.querySelector('.popup__error');
const popupButtonError = popupError.querySelector('.popup__button')

const popupYes = document.querySelector('.popup__yes');
const popupButtonYes = popupYes.querySelector('.popup__button');

const popupNo = document.querySelector('.popup__no');
const popupButtonNo = popupNo.querySelector('.popup__button');

const preloader = document.querySelector('.circle-preloader__container');

const formValidator = new FormValidator(form);

// formValidator.setEventListeners();

function renderPreloader(preloader, form) {
  preloader.classList.add('circle-preloader__container_active');
  form.classList.add('form__arrea_not-active');
}
function removePreloader(preloader, form) {
  preloader.classList.remove('circle-preloader__container_active');
  form.classList.remove('form__arrea_not-active');
}

function openPopup(popup, button) {
  popup.classList.add('popup_is-opened');
  
  function closePopup() {
    popup.classList.remove('popup_is-opened');
  }

  button.addEventListener('click', closePopup);
}

function sendForm(form) {
  renderPreloader(preloader, form);

  const name = form.elements.name.value;
  const secondName = form.elements.secondName.value;
  const presence = form.elements.presence.value;

  const data = { name, secondName, presence};

  form.reset();

  fetch('https://sheet.best/api/sheets/f71febad-82d0-45bc-9317-f6c80290f14a', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      removePreloader(preloader, form);
      if (presence === "yes") {
        openPopup(popupYes, popupButtonYes);
      } else {
        openPopup(popupNo, popupButtonNo)
      }
    })
    .catch((err) => {
      removePreloader(preloader, form);
      openPopup(popupError, popupButtonError);
    });
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (formValidator.checkValid()) {
    sendForm(form);
  }
});

window.onload = function() {
  setTimeout(function() {
    document.querySelector('.page').classList.add('page_loaded');
    document.querySelector('.circle-preloader__container_page').classList.remove('circle-preloader__container_page_active');
  }, 1500)
}