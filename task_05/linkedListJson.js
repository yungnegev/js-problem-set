// 5) Из JSON в связный список

const json = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
]

const linkedListJson = (json) => {                  
    let list = {}                                   // создаем пустой объект
    let current = list                              // создаем переменную, которая будет ссылаться на объект list
    for (let i = 0; i < json.length; i++) {         // проходимся по массиву json
        current.value = json[i].value               // присваеваем current.value значение value из массива json
        if (i !== json.length - 1) {                // если это не последний элемент массива json
            current.next = {}                       // создаем пустой объект next
            current = current.next                  // присваиваем переменной current значение next
        }
    }
    return list
}

console.log(linkedListJson(json)) // { value: 10, next: { value: 20, next: { value: 30...