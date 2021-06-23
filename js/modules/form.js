const adForm = document.querySelector('.ad-form');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');

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
adForm.addEventListener('change', function (evt) {
  selectTimeIn.value = evt.target.value;
  selectTimeOut.value = evt.target.value;

});