// 3) Аналог библиотеки Math (Mathx) используя замыкания


// Mathx в данном случае - это результат выполнения анонимной функции (iife), которая возвращает объект с методами
// внутри анонимной функции замкнуты функции, которые не доступны из вне
// это структура, которая позволяет создавать приватные методы и свойства
// к примеру метод isPrime, который используется внутри метода nthPrime, но не доступен из вне
// в обьекте стандартные методы вычисления чисел Фибоначчи и простых чисел 
const Mathx = (() => {
    const fibonacci = (n) => {
        let fibonacciArray = [0, 1]
        for (let i = 2; i <= n; i++) {
            fibonacciArray[i] = fibonacciArray[i - 1] + fibonacciArray[i - 2]
        }
        return fibonacciArray[n]
    }
    const fibAll = (n) => {
        const fibArr = Array.from({ length: n }, (v, i) => fibonacci(i))
        return fibArr
    }
    const isPrime = (num) => {
        if (num <= 1) return false
        if (num === 2) return true
        for (let i = 2; i < num; i++) {
            if (num % i === 0) return false
        }
        return true
    }
    const nthPrime = (n) => {
        let count = 0
        let i = 0
        while (count < n) {
            i++
            if (isPrime(i)) count++
        }
        return i
    }
    const primesUntill = (n) => {
        let primes = []
        for (let i = 0; i < n; i++) {
            if (isPrime(i)) primes.push(i)
        }
        return primes
    }

    return {
        fibonacci,
        fibAll, 
        nthPrime,
        primesUntill
    }
})()

console.log(Mathx.fibonacci(5)) // 5
console.log(Mathx.fibAll(5)) // [0, 1, 1, 2, 3]
console.log(Mathx.nthPrime(5)) // 11
console.log(Mathx.primesUntill(5)) // [2, 3]
// console.log(Mathx.isPrime(5)) // error
