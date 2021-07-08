const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresList = mapFilters.querySelectorAll('.map__checkbox');
const DEFAULT = 'any';

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
  const selectedFeatures = featuresList.querySelectorAll('input:checked');
  const arrayFeaturesList = Array.from(selectedFeatures).map((item) => item.value);

  return arrayFeaturesList.every((item) => element.offer.features.includes(item));
};


const filtrationOffers = (card) => {
  if (
    (card.offer.type === typeFilter.value || typeFilter.value === DEFAULT) &&
    (card.offer.rooms === +roomsFilter.value || roomsFilter.value === DEFAULT) &&
    (card.offer.guests === +guestsFilter.value || guestsFilter.value === DEFAULT) &&
    (filtrationPrice(card) || priceFilter.value === DEFAULT) &&
    filtrationFeatures(card)
  ) {
    return card;
  }
  return false;
};


export {filtrationOffers};
