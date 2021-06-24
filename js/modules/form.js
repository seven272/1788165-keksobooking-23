const adForm = document.querySelector('.ad-form');
//переменные интерактивных элементов формы 
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');

const selectFormElements = adForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const selectMapElements = mapForm.querySelectorAll('.map__filter');
const selectMapElementsFeatures = mapForm.querySelectorAll('.map__checkbox');

// console.log(selectFormElements);


//Режим активной / неактивной страницы

//Функция скрытия элементов форм при неактивном режиме страницы
let setNotActive = function() {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  selectFormElements.forEach (function(value) {
    value.disabled = true;
  
  });
  selectMapElements.forEach (function(value) {
    value.disabled = true;
  });

  selectMapElementsFeatures.forEach (function(value) {
    value.disabled = true;
  });
};
setNotActive();

//функуия активации элементов формы в режиме активной страницы
let setPageState = function() {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  selectFormElements.forEach (function(value) {
    value.disabled = false;
  
  });
  selectMapElements.forEach (function(value) {
    value.disabled = false;
  });

  selectMapElementsFeatures.forEach (function(value) {
    value.disabled = false;
  });

}
setPageState();

//С помощью функции Array.from преобразуем псевдомассив в массив
// let arraySelectFormElements = Array.from(selectFormElements);
// let arraySelectMapElements = Array.from(selectMapElements);
// console.log(arraySelectFormElements)
//Обьеденяем два массива в один
// let arrayFormAndMap = arraySelectFormElements.concat(arraySelectMapElements);
// console.log(arrayFormAndMap)
//пытаемся с помощью функции в качестве параметра, которой передан флаг менять значения.
// let setPageState = function(active) {
//    for(let i = 0; i < active.length;i++) {
//      if(active[i].disabled = false) {
//       return true;
//      }  
//     //  return false;
//    }
//  }
//  setPageState(arrayFormAndMap);

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