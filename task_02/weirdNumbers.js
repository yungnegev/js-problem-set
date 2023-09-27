// 2) Странные числа 

//  инициализируем sum = 0 (сумму делителей) 
//  инициализируем цикл от 0 до number
//  если number делится на i без остатка, то прибавляем i к sum
//  возвращаем результат сравнения sum и number
const isWeird = (number) => {
    let sum = 0
    for (let i = 0; i < number; i++) {
        if (number % i === 0) {
            sum += i
        }
    }
    return sum === number
}

console.log(isWeird(6)) // true (6 = 1 + 2 + 3)