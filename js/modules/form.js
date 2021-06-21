const adForm = document.querySelector('.ad-form');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');

//Зависимость количества комнат от количества жильцов
selectRooms.addEventListener('change', function(evt) {
   
    selectRooms.value = evt.target.value;
    let rooms = selectRooms.value;
    
    if(rooms === '1') {
        selectGuests[1].disabled = true;
        selectGuests[0].disabled = true;
        selectGuests[3].disabled = true;
        
    } else if (rooms === '2') {
        selectGuests[0].disabled = true;
        selectGuests[3].disabled = true;
       
    } else if (rooms === '3') {
        selectGuests[3].disabled = true;
        
    } else if (rooms === '100') {
        selectGuests[0].disabled = true;
        selectGuests[1].disabled = true;
        selectGuests[2].disabled = true;
    } else {
        selectGuests.disabled = false;
    }
    
})

//связываем поля время выезда и время заезда
adForm.addEventListener('change', function(evt){
    selectTimeIn.value = evt.target.value
    selectTimeOut.value = evt.target.value
    
});