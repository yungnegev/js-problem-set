// 11) Задача о замыканиях

const outerFunction = (str) => {                     // внешняя функция, которая принимает строку
    const string = str                               // присваиваем переменной string значение аргумента str (для наглядности)
    return () => {
        return string                                    
    }
}

const innerFunction = outerFunction('Hello')         // присваиваем переменной innerFunction результат выполнения функции outerFunction
                                                     // innerFunction теперь является функцией, которая не принимает аргументов
                                                     // и возвращает строку 'Hello' из замыкания     

console.log(innerFunction()) // Hello