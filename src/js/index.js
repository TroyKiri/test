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
