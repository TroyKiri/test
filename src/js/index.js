// Таймер обратного отсчета

const { default: axios } = require("axios");

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

function openPopup(popup, button) {
  popup.classList.add('popup_is-opened');
  
  function closePopup() {
    popup.classList.remove('popup_is-opened');
  }

  button.addEventListener('click', closePopup);
}

function sendForm(form) {
  const name = form.elements.name.value;
  const secondName = form.elements.secondName.value;
  const presence = form.elements.presence.value;

  const data = { name, secondName, presence};

  axios.post('https://sheet.best/api/sheets/f71febad-82d0-45bc-9317-f6c80290f14a', data)
    .then((res) => {
      form.reset();
      if (res.data[0].presence === "yes") {
        openPopup(popupYes, popupButtonYes);
      } else {
        openPopup(popupNo, popupButtonNo)
      }
    })
    .catch((err) => {
      openPopup(popupError, popupButtonError);
    });
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  sendForm(form);
});