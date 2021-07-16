import {makeOffer} from './popup.js';

const LAT_MAP = 35.652832;
const LNG_MAP = 139.839478;
const ZOOM_MAP = 10;
const LAT_MARKER = 35.65283;
const LNG_MARKER = 139.83947;

const BigPin = {
  url: '././img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};
const SmallPin = {
  url: '././img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
};

const adForm = document.querySelector('.ad-form');
const selectFormElements = adForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const selectMapElements = mapForm.querySelectorAll('.map__filter');
const selectMapElementsFeatures = mapForm.querySelectorAll('.map__checkbox');
const address = document.querySelector('#address');

//Функция скрытия элементов форм при неактивном режиме страницы
const setNotActive = function() {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  selectFormElements.forEach ((value) => {
    value.disabled = true;

  });
  selectMapElements.forEach ((value) => {
    value.disabled = true;
  });

  selectMapElementsFeatures.forEach ((value) => {
    value.disabled = true;
  });
};
setNotActive();

//функуия активации элементов формы в режиме активной страницы
const setPageState = function() {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  selectFormElements.forEach ((value) => {
    value.disabled = false;

  });
  selectMapElements.forEach ((value) => {
    value.disabled = false;
  });

  selectMapElementsFeatures.forEach ((value) => {
    value.disabled = false;
  });
  address.readOnly = true;
  address.value = `${LAT_MARKER  }, ${  LNG_MARKER}`;
};


//при загрузке карты отменяем блокировку формы
const map = L.map('map-canvas')
  .on('load', () => {
    setPageState();
  })

  .setView({
    lat: LAT_MAP,
    lng: LNG_MAP,
  }, ZOOM_MAP);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: BigPin.url,
  iconSize: BigPin.size,
  iconAnchor: BigPin.anchor,
});

const mainPinMarker = L.marker(
  {
    lat: LAT_MARKER,
    lng: LNG_MARKER,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);


//После завершения движения маркера, записываем новые координаты в поле "Адрес"

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)  }, ${  lng.toFixed(5)}`;

});

//Создаем слой на карте
const markerGroup = L.layerGroup().addTo(map);

//Удаляем слой на карте
const removeMapPin = () => {
  markerGroup.clearLayers();

};


//Создаем вспомогательные точки на карте
const regularPinIcon = L.icon ({
  iconUrl: SmallPin.url,
  iconSize: SmallPin.size,
  iconAnchor: SmallPin.anchor,
});


const offersForMap = (points) => {
  points
    .forEach((point) => {

      const marker = L.marker({
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        draggable: true,
        icon: regularPinIcon,
      });
      marker.addTo(markerGroup)
        .bindPopup(() => makeOffer(point),
          {
            keepInView: true,
          },
        );

    });
};

//Ф-я возвращения главного маркера в исходное положение.

const returnMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: LAT_MARKER,
    lng: LNG_MARKER,
  });
  address.value = `${LAT_MAP.toFixed(5)  }, ${  LNG_MAP.toFixed(5)}`;
};

// ф-я закрытия попапов маркера
const closeMapPopup = ()=> {
  map.closePopup();
};

//Возвращаем маркер и карту в исходное положение

map.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: LAT_MARKER,
    lng: LNG_MARKER,
  });

  map.setView({
    lat: LAT_MAP,
    lng: LNG_MAP,
  }, ZOOM_MAP);
});

export {offersForMap, removeMapPin, returnMainPinMarker, closeMapPopup};
