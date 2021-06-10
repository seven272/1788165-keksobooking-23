const randomNumber = function (min, max) {
    if (min < 0) {
        return window.alert("Недопустимое значение. Введите корректоное число, которое больше нуля")
    }
    return Math.floor(Math.random() * (max - min) + min);
}

randomNumber(3, 15);


const randomNumberDecimal = function(min, max, decimalPlaces) {
    if (min < 0) {
        return window.alert("Недопустимое значение. Введите корректоное число, которое больше нуля")
    }
    let decimalConverter = Math.pow(10, decimalPlaces); 
    let randomValue = Math.random() * (max - min) + min;
    return ~~ (randomValue * decimalConverter) / decimalConverter;
}

randomNumberDecimal(12.4562566, 12.6705, 2);

const randomNumberArray = function (someArray) {
    return Math.floor(Math.random() * someArray.length)
}

const getRandomArrayElement = function (elements) {
    return elements[randomNumber(0, elements.length)];
}

const createAd = function () {
    let avatar = [
        'img/avatars/user01.png',
        'img/avatars/user02.png',
        'img/avatars/user03.png',
        'img/avatars/user04.png',
        'img/avatars/user05.png',
        'img/avatars/user06.png',
        'img/avatars/user07.png',
        'img/avatars/user08.png',
    ]
    
    
    let title = [
        "Квартира с видом на парк",
        "Уютная студия у метро",
        "Аппартаменты на верхнем этаже"
    ]
    
    let address = [
        "60.09450 30.34917",
        "60.89053 30.56941",
        "60.30929 30.23388",
    ]
    
    let price = [
        50000,
        32000,
        124500
    ]
    
    let type = [
        'palace', 
        'flat', 
        'house', 
        'bungalow',
        'hotel'
    ]
    
    let rooms = [
        3,
        1,
        5
    ]
    
    let guests = [
        3,
        2,
        7
    ]
    
    let checkin = [
        "12:00", 
        "13:00",
        "14:00"
    ]
    
    let checkout = [
        "12:00", 
        "13:00",
        "14:00"
    ]
    
    let features = [
        "wifi", 
        "dishwasher", 
        "parking",
        "washer", 
        "elevator", 
        "conditioner"
    ]
    
    let description = [
        "Современная мебель, большой ЖК телевизор, свежий ремонт",
        "Шикарный вид из окна, охроняемая территория, рядом магазин и десткий сад",
        "Аппартаменты класса люкс, джакузи, собственный лифт, панорамные зеркала"
    ]
    
    let photos = [
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
    
    ]
    
    let lat = [
        35.65000, 
        35.70000
    ]
    
    let lng = [
        139.70000,
        139.80000
    ]

    const randomAuthorIndex = randomNumber(0, avatar.length);
    const randomLatScope = randomNumberDecimal(lat[0],lat[1],5);
    const randomLngScope = randomNumberDecimal(lng[0],lng[1],5);
   
    return {
        author: avatar[randomAuthorIndex],
        offer: getRandomArrayElement(title) + ' ' + getRandomArrayElement(address) + ' ' + getRandomArrayElement(price) + ' ' + getRandomArrayElement(type) + ' ' + getRandomArrayElement(rooms) + ' ' + getRandomArrayElement(guests) + ' ' + getRandomArrayElement(checkin) + ' ' + getRandomArrayElement(checkout) + ' ' + getRandomArrayElement(features) + ' ' + getRandomArrayElement(description) + ' ' + getRandomArrayElement(photos),
        location: randomLatScope + ' ' + randomLngScope 
    }
}

console.log(createAd())
export {randomNumber, randomNumberDecimal, getRandomArrayElement, randomNumberArray, createAd }