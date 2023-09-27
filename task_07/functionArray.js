// Задача о коллекции функций.

const functions = [
    () => console.log('Функция 1'),
    () => console.log('Функция 2'),
    () => console.log('Функция 3'),
    () => console.log('Функция 4'),
    () => console.log('Функция 5'),
]

const run = (functions) => {
    for (let i = 0; i < functions.length; i++) {            // проходимся по массиву functions
        functions[i]()                                      // вызываем функцию
        console.log(`Попрядковый номер: ${i + 1}`)          // выводим порядковый номер функции
    }
}

run(functions) // Функция 1 Функция 2 Функция 3 Функция 4 Функция 5