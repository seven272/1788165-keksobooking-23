const adForm = document.querySelector('.ad-form');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');

const successTemplate = document.querySelector('#success').content;
const successMesage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorMesage = errorTemplate.querySelector('.error');
const mainPage = document.querySelector('main');


//Зависимость количества комнат от количества жильцов
selectRooms.addEventListener('change', (evt) => {

  selectRooms.value = evt.target.value;
  const rooms = selectRooms.value;
  switch (rooms){
    case '1':
      selectGuests[1].disabled = true,
      selectGuests[0].disabled = true,
      selectGuests[3].disabled = true;
      break;

    case '2':
      selectGuests[0].disabled = true,
      selectGuests[3].disabled = true;
      break;

    case '3':
      selectGuests[3].disabled = true;
      break;

    case '100':
      selectGuests[0].disabled = true,
      selectGuests[1].disabled = true,
      selectGuests[2].disabled = true;
      break;
    default:
      selectGuests.disabled = false;
  }

});

//связываем поля время выезда и время заезда
adForm.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
  selectTimeOut.value = evt.target.value;

});


// Создание сообщения об успешной отправки обьявления и закрытие его по клику или esc
const createSuccessMessage = function () {
  const successPopup = successMesage.cloneNode(true);
  document.addEventListener('click', closeClickSuccessPopupMessage);
  document.addEventListener('keydown', closeEscapeSuccessPopupMessage);
  mainPage.appendChild(successPopup);

};

const closeEscapeSuccessPopupMessage = function (evt) {
  const popupMessage = mainPage.querySelector('.success');

  evt.preventDefault();

  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popupMessage.remove();
  }

  document.removeEventListener('keydown', closeEscapeSuccessPopupMessage);
  document.removeEventListener('click', closeClickSuccessPopupMessage);

};


const closeClickSuccessPopupMessage = function () {
  const popupMessage = mainPage.querySelector('.success');
  popupMessage.remove();
  document.removeEventListener('click', closeClickSuccessPopupMessage);
};

// createSuccessMessage();

// Создание сообщения о неуспешной отправки обьявления и закрытие сообщения по клику или нажатию esc

const createErrorMesage = function() {
  const errorPopup = errorMesage.cloneNode(true);
  document.addEventListener('keydown', closeEscapeErrorPopupMessage);
  document.addEventListener('click', closeClickErrorPopupMessage);
  mainPage.appendChild(errorPopup);
};

const closeEscapeErrorPopupMessage = function (evt) {
  const errorMessage = mainPage.querySelector('.error');

  evt.preventDefault();

  if (evt.key === 'Esc' || evt.key === 'Escape') {
    errorMessage.remove();
  }

  document.removeEventListener('keydown', closeEscapeErrorPopupMessage);
  document.removeEventListener('click', closeClickErrorPopupMessage);

};

const closeClickErrorPopupMessage = function() {
  const errorMessage = mainPage.querySelector('.error');
  errorMessage.remove();

  document.removeEventListener('click', closeClickErrorPopupMessage);
  document.removeEventListener('keydown', closeEscapeErrorPopupMessage);
};

// createErrorMesage();

//добавляем обработчик события submit для отправки данных


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
      .then(() => onSuccess())
      .catch(() => onError());
  });

};
setOfferFormSubmit(createSuccessMessage, createErrorMesage);
