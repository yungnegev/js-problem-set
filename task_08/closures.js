// 8) Задача о замыканиях

const fnArray = [
    () => 1,
    () => 2,
    () => 3,
    () => 4,
    () => 5,
]

const outerFunction = (fnArray) => {                    // функция, которая принимает массив функций
    return () => {                                      // возвращает новую функцию
        let newArray = []                               // создаем пустой массив для результатов
        for (let i = 0; i < fnArray.length; i++) {      // проходимся по массиву fnarray  
            let fnResult = fnArray[i]()                 // вызываем функцию и получаем результат
            newArray.push(fnResult)                     // добавляем результат в массив newArray
        }
        return newArray                                 // возвращаем массив результатов
    }
}

const innerFunction = outerFunction(fnArray)            // присваиваем переменной innerFunction результат выполнения функции outerFunction
                                                        // innerFunction теперь является функцией, которая не принимает аргументов
                                                        // и возвращает массив результатов выполнения функций из массива fnarray

console.log(innerFunction()) // [ 1, 2, 3, 4, 5 ]
