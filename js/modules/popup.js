import {createSimilarOffer} from './data.js';

const popupTemplate = document.querySelector('#card').content;
const popup = popupTemplate.querySelector('.popup');
const createdPopup = createSimilarOffer();



createdPopup.forEach((value) => {
  const clonedPopup = popup.cloneNode(true);

  const popupTitle = clonedPopup.querySelector('.popup__title');
  popupTitle.textContent = value.offer.title;

  const popupAddress = clonedPopup.querySelector('.popup__text--address');
  popupAddress.textContent = value.offer.address;

  const popupPrice = clonedPopup.querySelector('.popup__text--price');
  popupPrice.textContent = value.offer.price + ' ₽/ночь';

  const popupType = clonedPopup.querySelector('.popup__type');
  popupType.textContent = value.offer.type;
  
  switch (popupType.textContent) {
    case 'palace':
      popupType.textContent = 'Дворцец';
      break;

    case 'bungalow':
      popupType.textContent = 'Бунгало';
      break;

    case 'house':
      popupType.textContent = 'Дом';
      break;

    case 'flat':
      popupType.textContent = 'Квартира';
      break;
    default:
      popupType.textContent = 'Отель';
  }

  const popupRoomsAndGuests = clonedPopup.querySelector('.popup__text--capacity');
  if(value.offer.rooms === 1 && value.offer.guests === 1) {
    popupRoomsAndGuests.textContent = value.offer.rooms +  ' комната для ' +  value.offer.guests + ' гостя';
  } else if (value.offer.rooms > 4) {
    popupRoomsAndGuests.textContent = value.offer.rooms +  ' комнат для ' +  value.offer.guests + ' гостей';
  } else if (value.offer.rooms === 1) {popupRoomsAndGuests.textContent = value.offer.rooms +  ' комната для ' +  value.offer.guests + ' гостей';
  } else {popupRoomsAndGuests.textContent = value.offer.rooms +  ' комнаты для ' +  value.offer.guests + ' гостей';}

  const popupTime = clonedPopup.querySelector('.popup__text--time');
  popupTime.textContent = 'Заезд после ' + value.offer.checkin + ' выезд до ' + value.offer.checkout;

  const popupFeatures = clonedPopup.querySelector('.popup__features');
  popupFeatures.textContent = value.offer.features;

  const popupDescription = clonedPopup.querySelector('.popup__description');
  popupDescription.textContent = value.offer.description;
  if(!popupDescription.textContent) {
    delete value.offer.description;
  }

  const popupPhotos = clonedPopup.querySelector('.popup__photo');
  popupPhotos.src = value.offer.photos;
  
  const popupAvatar = clonedPopup.querySelector('.popup__avatar');
  popupAvatar.src = value.author
  
  const mapCanvas = document.querySelector('#map-canvas')
  mapCanvas.appendChild(clonedPopup);
});
