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

export {randomNumber, randomNumberDecimal, getRandomArrayElement};