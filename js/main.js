const randomNumber = function (min, max) {
    if (min < 0) {
        return window.alert("Недопустимое значение. Введите корректоное число, которое больше нуля")
    }
    return Math.floor(Math.random() * (max - min) + min);
}

console.log(randomNumber(5, 65));


const randomNumberDecimal = function(min, max, decimalPlaces) {
    if (min < 0) {
        return window.alert("Недопустимое значение. Введите корректоное число, которое больше нуля")
    }
    let decimalConverter = Math.pow(10, decimalPlaces); 
    let randomValue = Math.random() * (max - min) + min;
    return ~~ (randomValue * decimalConverter) / decimalConverter;
}

console.log(randomNumberDecimal(17.4262566, 82.1705, 4));