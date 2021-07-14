import {randomNumber, randomNumberDecimal, getRandomArrayElement} from './util.js';

const avatar = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];


const title = [
  'Квартира с видом на парк',
  'Уютная студия у метро',
  'Аппартаменты на верхнем этаже',
];

const address = [
  '35.65000 139.70056',
  '35.70000 139.70002',
  '35.65450 139.70045',
];

const price = [
  50000,
  32000,
  124500,
];

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const rooms = [
  3,
  1,
  5,
  10,
];

const guests = [
  2,
  3,
  7,
];

const checkin = [
  '12:00',
  '13:00',
  '14:00',
];

const checkout = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi, dishwasher, parking, washer, elevator, conditioner',
  'wifi, elevator, conditioner',
  'dishwasher, parking, washer, elevator',
];

const description = [
  'Современная мебель, большой ЖК телевизор, свежий ремонт',
  'Шикарный вид из окна, охроняемая территория, рядом магазин и десткий сад',
  'Аппартаменты класса люкс, джакузи, собственный лифт, панорамные зеркала',
  '',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const lat = [
  35.65000,
  35.70000,
];

const lng = [
  139.70000,
  139.80000,
];


const createAd = function () {

  const randomAuthorIndex = randomNumber(0, avatar.length);
  const randomLatScope = randomNumberDecimal(lat[0],lat[1],5);
  const randomLngScope = randomNumberDecimal(lng[0],lng[1],5);

  return {
    author: avatar[randomAuthorIndex],
    offer: {title: getRandomArrayElement(title), address: getRandomArrayElement(address), price: getRandomArrayElement(price), type: getRandomArrayElement(type), rooms: getRandomArrayElement(rooms), guests: getRandomArrayElement(guests),  checkin: getRandomArrayElement(checkin), checkout: getRandomArrayElement(checkout), features: getRandomArrayElement(features), description: getRandomArrayElement(description), photos: getRandomArrayElement(photos)},
    location: [randomLatScope , randomLngScope],
  };
};


const createSimilarOffer = () => new Array(3).fill(null).map(() => createAd());

export {createAd, createSimilarOffer};
