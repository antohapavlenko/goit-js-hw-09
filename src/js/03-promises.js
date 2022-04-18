import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', getFormValue)

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
                
            } else {
                reject({ position, delay });
            };
        }, delay);  
    });
};


function getFormValue(event) {
    event.preventDefault();

    let inputValue = {};
    const formData = new FormData(form)
    formData.forEach((value, key) => inputValue[key] = value);

    const delay = Number(inputValue.delay);
    const step = Number(inputValue.step);
    const amount = Number(inputValue.amount);
    

    for (let i = 0; i < amount; i += 1) {
        createPromise(i, delay + step * i)
        .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { timeout: 5000 });
        })
        .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { timeout: 5000 });
        }); 
    }
};
 