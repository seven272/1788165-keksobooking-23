// const mapFilters = document.querySelector('.map__filters');
// const housingTypeFilter = mapFilters.querySelector('#housing-type');
// const housingPriceFilter = mapFilters.querySelector('#housing-price');
// const housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
// const housingGuestsFilter = mapFilters.querySelector('#housing-guests');
// const housingFeaturesList = mapFilters.querySelectorAll('.map__checkbox');

// const priceLimit = {
//     limit: {
//         low: {
//           end: 10000,
//         },
//         middle: {
//           start: 10000,
//           end: 50000,
//         },
//         hight: {
//           start: 50000,
//         },
//       },
// };

// const typeRealty = {
//     house: 'Дом',
//     palace: 'Дворец',
//     flat: 'Квартира',
//     bungalow: 'Бунгало',
//     hotel: 'Отель',
// }

// const filtrationPrice = (element) => {
//     switch  (housingPriceFilter.value) {
//         case priceLimit.low.end:
//             return
//     }
// }

const Default = {
    DEFAULT_VALUE: 'any',
    LOW: 10000,
    HIGH: 50000,
  };
  
  const housingTypeInput = document.querySelector('[name="housing-type"]');
  const priceInput = document.querySelector('[name="housing-price"]');
  const roomsInput = document.querySelector('[name="housing-rooms"]');
  const guestsInput = document.querySelector('[name="housing-guests"]');
  const featuresList = document.querySelector('#housing-features');
  
  const filtrationAds = (ad) => {
    if (
      (ad.offer.type === housingTypeInput.value || housingTypeInput.value === Default.DEFAULT_VALUE)
      && (ad.offer.rooms === +roomsInput.value || roomsInput.value === Default.DEFAULT_VALUE)
      && (ad.offer.guests === +guestsInput.value || guestsInput.value === Default.DEFAULT_VALUE)
      && (filtrationPrice(ad) || priceInput.value === Default.DEFAULT_VALUE)
      && filtrationFeatures(ad)
    ) {
      return ad;
    }
    return false;
  };
  
  
  const filtrationPrice = (element) => {
    switch (priceInput.value) {
      case 'low':
        return element.offer.price < Default.LOW;
      case 'middle':
        return element.offer.price <= Default.HIGH && element.offer.price >= Default.LOW;
      case 'high':
        return element.offer.price > Default.HIGH;
    }
  
    // low -- ad.offer.price < Default.LOW
    // middle -- Default.LOW <= ad.offer.price <= Default.HIGH
    // high -- ad.offer.price > Default.HIGH
  }
  
  const filtrationFeatures = (element) => {
    const selectedFeatures = featuresList.querySelectorAll('input:checked');
    const arrayFeaturesList = Array.from(selectedFeatures).map((item) => item.value);
  
    return arrayFeaturesList.every((item) => element.offer.features.includes(item));
  }
  
  export {filtrationAds}