/* eslint-disable no-alert */
const getRandomNumber = (min, max) => {
  if (min < 0) {
    return window.alert('Недопустимое значение. Введите корректоное число, которое больше нуля');
  }
  return Math.floor(Math.random() * (max - min) + min);
};

getRandomNumber(3, 15);


const getRandomNumberDecimal = (min, max, decimalPlaces) => {
  if (min < 0) {
    return window.alert('Недопустимое значение. Введите корректоное число, которое больше нуля');
  }
  const decimalConverter = Math.pow(10, decimalPlaces);
  const randomValue = Math.random() * (max - min) + min;
  return ~~ (randomValue * decimalConverter) / decimalConverter;
};

getRandomNumberDecimal(12.4562566, 12.6705, 2);

const getRandomArrayElement =  (elements) => elements[getRandomNumber(0, elements.length)];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};


export {getRandomNumber, getRandomNumberDecimal, getRandomArrayElement, showAlert};
