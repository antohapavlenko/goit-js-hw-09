import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startButton.addEventListener('click', startClock)

// вибрана дата до якої йде відлік
let setDate = null

// обєкт налаштуваннь
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       setDate = selectedDates[0]
        if(setDate < Date.now()) {
          return Notiflix.Notify.failure('Qui timide rogat docet negare');
        }

        if(setDate > Date.now()) {
          refs.startButton.removeAttribute("disabled");
          Notiflix.Notify.success('Sol lucet omnibus');
        }
    }
}
flatpickr(refs.inputDate, options);

// функція старту таймера з перевірками
function startClock() {
  const intervalId = setInterval(() => {
    if (setDate < Date.now()) {
      clearInterval(intervalId)
    }
    const dateNow = setDate.getTime() - Date.now()
    convertMs(dateNow)
  }, 1000)
}

// Функцыя що додаэ 0 до дати
function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;    
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}





