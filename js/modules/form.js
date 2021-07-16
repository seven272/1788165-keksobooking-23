/* eslint-disable no-use-before-define */
import {returnMainPinMarker, closeMapPopup, offersForMap} from './map.js';
import {serverOffers} from '../main.js';
const typeOfRealty = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const adForm = document.querySelector('.ad-form');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');
const formTime = adForm.querySelector('.ad-form__element--time');
const selectType = adForm.querySelector('#type');
const selectPrice = adForm.querySelector('#price');
const buttonReset = adForm.querySelector('.ad-form__reset');
const mapFilter = document.querySelector('.map__filters');

const successTemplate = document.querySelector('#success').content;
const successMesage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorMesage = errorTemplate.querySelector('.error');
const mainPage = document.querySelector('main');


const selectRoomsAndGuests = () => {
  if (
    (selectRooms.value === '100' && selectGuests.value !== '0') ||
    (selectGuests.value === '0' && selectRooms.value !== '100')
  ) {

    selectRooms.setCustomValidity(
      'Этот варинат не для гостей. Выберите корректное значение',
    );
  } else if (selectGuests.value > selectRooms.value) {

    selectRooms.setCustomValidity(
      'Гостей не может быть больше, чем комнат. Выберите корректное значение',
    ),
    selectGuests.setCustomValidity(
      'Гостей не может быть больше, чем комнат. Выберите корректное значение',
    );
  } else {
    selectRooms.setCustomValidity('');
    selectGuests.setCustomValidity('');
  }
  selectRooms.reportValidity();
  selectGuests.reportValidity();
};

selectRooms.addEventListener('change', selectRoomsAndGuests);
selectGuests.addEventListener('change', selectRoomsAndGuests);
selectRoomsAndGuests();

//связываем поля время выезда и время заезда
formTime.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
  selectTimeOut.value = evt.target.value;

});


//связываем тип жилья и минимальную цену
const onTypeOfRealty = () => {
  const minPrice = typeOfRealty[selectType.value];
  selectPrice.placeholder = minPrice;
  selectPrice.min = minPrice;
};

selectType.addEventListener('change', onTypeOfRealty);

// Создание сообщения об успешной отправки обьявления и закрытие его по клику или esc
const createSuccessMessage = () => {
  const successPopup = successMesage.cloneNode(true);
  document.addEventListener('click', onCloseClickSuccessPopupMessage);
  document.addEventListener('keydown', onCloseEscapeSuccessPopupMessage);
  mainPage.appendChild(successPopup);

};

const onCloseEscapeSuccessPopupMessage = (evt) => {
  const popupMessage = mainPage.querySelector('.success');

  evt.preventDefault();

  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popupMessage.remove();
  }

  document.removeEventListener('keydown', onCloseEscapeSuccessPopupMessage);
  document.removeEventListener('click', onCloseClickSuccessPopupMessage);

};


const onCloseClickSuccessPopupMessage = () => {
  const popupMessage = mainPage.querySelector('.success');
  popupMessage.remove();
  document.removeEventListener('click', onCloseClickSuccessPopupMessage);
};

// Создание сообщения о неуспешной отправки обьявления и закрытие сообщения по клику или нажатию esc

const createErrorMesage = () => {
  const errorPopup = errorMesage.cloneNode(true);
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', onCloseEscapeErrorPopupMessage);
  document.addEventListener('click', onCloseClickErrorPopupMessage);
  mainPage.appendChild(errorPopup);
};

const onCloseEscapeErrorPopupMessage = (evt) => {
  const errorMessage = mainPage.querySelector('.error');

  evt.preventDefault();

  if (evt.key === 'Esc' || evt.key === 'Escape') {
    errorMessage.remove();
  }

  document.removeEventListener('keydown', onCloseEscapeErrorPopupMessage);
  document.removeEventListener('click', onCloseClickErrorPopupMessage);

};

const onCloseClickErrorPopupMessage = () => {
  const errorMessage = mainPage.querySelector('.error');
  errorMessage.remove();

  document.removeEventListener('click', onCloseClickErrorPopupMessage);
  document.removeEventListener('keydown', onCloseEscapeErrorPopupMessage);
};


const formReset = () => {
  adForm.reset();
  mapFilter.reset();
  returnMainPinMarker();
  closeMapPopup();
  selectPrice.placeholder = '1000';
  offersForMap(serverOffers);
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
});

//ф-я создания сообщения об успешной отправке обьявления и очистки формы и карты
const createSuccessAction = () => {
  createSuccessMessage();
  formReset();
};


const setOfferFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if(response.ok) {
          onSuccess();
        } else {
          onError();
          return response.json();
        }
      });

  });
};

setOfferFormSubmit(createSuccessAction, createErrorMesage);
