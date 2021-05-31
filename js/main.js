let randomNumber = function (min, max) {
    if (min < 0) {
        return window.alert("Недопустимое значение. Введите корректоное число, которое больше нуля")
    }
    return Math.floor(Math.random() * (max - min) + min);
}

randomNumber(3, 15);


let randomNumberDecimal = function(min, max, decimalPlaces) {
    if (min < 0) {
        return window.alert("Недопустимое значение. Введите корректоное число, которое больше нуля")
    }
    let decimalConverter = Math.pow(10, decimalPlaces); 
    let randomValue = Math.random() * (max - min) + min;
    return ~~ (randomValue * decimalConverter) / decimalConverter;
}

randomNumberDecimal(12.4562566, 12.6705, 2);