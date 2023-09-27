// 4) функция, изменяющая окончание слов в зависимости от падежа. 


const caseByNumber = (number, wordArray) => {
    if (number % 100 >= 11 && number % 100 <= 14) {  // если число заканчивается на 11, 12, 13, 14
        return wordArray[2] 
    }
    if (number % 10 === 1) {                         // если число заканчивается на 1
        return wordArray[0]
    }
    if (number % 10 >= 2 && number % 10 <= 4) {      // если число заканчивается на 2, 3, 4
        return wordArray[1]
    }
    return wordArray[2]                              // если число заканчивается на 0, 5, 6, 7, 8, 9
}

console.log(caseByNumber(1, ['яблоко', 'яблока', 'яблок'])) // яблоко


module.exports = caseByNumber;