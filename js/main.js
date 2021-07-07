import './modules/data.js';
import './modules/util.js';
import './modules/popup.js';
import './modules/form.js';
import './modules/map.js';
import './modules/filter.js';
import {showAlert} from './modules/util.js';
import {offersForMap} from './modules/map.js';

const similarOfferCount = 10;

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offersFromSerever) => {
    offersForMap(offersFromSerever.slice(0, similarOfferCount));
  })
  .catch(() =>{
    showAlert('Не удалось загрузить данные полностью. Попробуйте еще раз.');
  });