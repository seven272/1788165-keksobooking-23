import {makeOffer} from './popup.js';
import {filtrationAds} from './filter.js';

// import {createSimilarOffer} from './data.js';
// const arrayMarkers = createSimilarOffer();
//const arrayPoints = setArrayOffers(similarOffers);
// const arrayPoints = setArrayOffers();


const adForm = document.querySelector('.ad-form');
const selectFormElements = adForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const selectMapElements = mapForm.querySelectorAll('.map__filter');
const selectMapElementsFeatures = mapForm.querySelectorAll('.map__checkbox');
const address = document.querySelector('#address');

const latMap = 35.652832;
const lngMap = 139.839478;
const zoomMap = 10;
const latMarker = 35.65283;
const lngMarker = 139.83947;


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
  address.value = `${latMarker  }, ${  lngMarker}`;
};


//при загрузке карты отменяем блокировку формы
const map = L.map('map-canvas')
  .on('load', () => {
    setPageState();
  })

  .setView({
    lat: latMap,
    lng: lngMap,
  }, zoomMap);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '././img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: latMarker,
    lng: lngMarker,
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

//Создаем вспомогательные точки на карте
const regularPinIcon = L.icon ({
  iconUrl: '././img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const regularPinMarker = L.marker(
  {
    lat: 59.96834,
    lng: 30.31744,
  },
  {
    draggable: true,
    icon: regularPinIcon,
  },
);
regularPinMarker.addTo(map);


const offersForMap = (points) => {
  
  
  points.forEach((point) => {

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

//функции по добавлению слоя на карту и его удалению
const layerGroup = L.layerGroup().addTo(map);
const removeMapPin = () => {
  layerGroup.clearLayers();

};

//Возвращаем маркер и карту в исходное положение

map.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: latMarker,
    lng: lngMarker,
  });

  map.setView({
    lat: latMap,
    lng: lngMap,
  }, zoomMap);
});

export {offersForMap};
