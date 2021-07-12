import {debounce} from './debounce.js';
import {removeMapPin, offersForMap} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresList = mapFilters.querySelectorAll('.map__checkbox');
const DEFAULT = 'any';
const maxNumberOffers = 10;
const priceLimit = {
  low: 10000,
  high: 50000,
};


const filtrationPrice = (element) => {
  switch (priceFilter.value) {
    case 'low':
      return element.offer.price < priceLimit.low;
    case 'middle':
      return element.offer.price <= priceLimit.high && element.offer.price >= priceLimit.low;
    case 'high':
      return element.offer.price > priceLimit.high;
  }

};


const filtrationFeatures = (element) => {
  if (! element.offer.features)
  { return false; }
  const selectedFeatures = [];
  featuresList.forEach ((item) => {
    if (item.checked) {
      selectedFeatures.push (item);
    }
  });
  if (!selectedFeatures.length)
  { return true; }
  const arrayFeaturesList = Array.from (selectedFeatures).map ((item) => item.value);
  return arrayFeaturesList.every ((item) => element.offer.features.includes (item));

};


const filtrationOffers = (points) => {
  const filtres = [];

  for(let i = 0; i < points.length; i++) {
    const point = points[i];
    if (
      (point.offer.type === typeFilter.value || typeFilter.value === DEFAULT) &&
    (point.offer.rooms === +roomsFilter.value || roomsFilter.value === DEFAULT) &&
    (point.offer.guests === +guestsFilter.value || guestsFilter.value === DEFAULT) &&
    (filtrationPrice(point) || priceFilter.value === DEFAULT) &&
    (filtrationFeatures(point))
    ) {
      filtres.push(points[i]);
    }
    if (filtres.length === maxNumberOffers) {
      break;
    }

  }
  return filtres;
};


const filtredPoints = (points) => {

  const redrawPoints = () => {
    removeMapPin();
    offersForMap(filtrationOffers(points));
  };
  mapFilters.addEventListener('change', debounce (
    (evt) => {
      redrawPoints(evt);
    }));
};
export {filtrationOffers, filtredPoints};
