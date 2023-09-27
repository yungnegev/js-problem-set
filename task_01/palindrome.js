// 1) Палиндром

// простой регекс для удаления пробелов и перевод в нижний регистр
// можно было бы через split(' ').join('')
// разбиваем строку на массив, переворачиваем и собираем обратно в строку
// сравниваем исходную строку (без пробелов) и перевернутую
const isPalidnrome = (str) => {
    const prepString = str.replace(/\s/g, '').toLowerCase()
    const strReverse = prepString.split('').reverse().join('')
    return strReverse === prepString
}

console.log(isPalidnrome('аргентина манит негра')); // true
console.log(isPalidnrome('А роза упала на лапу Азора')); // true
console.log(isPalidnrome('не палиндром')); // false