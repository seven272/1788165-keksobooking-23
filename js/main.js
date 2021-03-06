import './modules/util.js';
import './modules/popup.js';
import './modules/form.js';
import './modules/map.js';
import './modules/filter.js';
import {showAlert} from './modules/util.js';
import {offersForMap} from './modules/map.js';
import {filtredPoints} from './modules/filter.js';

const SIMILAR_OFFER_COUNT = 10;
let serverOffers = [];

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offersFromSerever) => {
    serverOffers = offersFromSerever.slice(0, SIMILAR_OFFER_COUNT);
    offersForMap(offersFromSerever.slice(0, SIMILAR_OFFER_COUNT));
    filtredPoints(offersFromSerever.slice());

  })
  .catch(() =>{
    showAlert('Не удалось загрузить данные полностью. Попробуйте еще раз.');
  });

export {serverOffers};
