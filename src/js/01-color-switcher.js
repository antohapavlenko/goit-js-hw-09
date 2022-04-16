

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')
let timerId = null

startBtn.addEventListener('click', colorStart)  
stopBtn.addEventListener('click', colorStop) 

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function colorStart() {
    if (timerId) {
      return
    }
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtn.setAttribute("disabled", "disabled");
    stopBtn.removeAttribute("disabled");
   
  }

  function colorStop() {
    clearInterval(timerId)
    timerId = null
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "disabled");
  }