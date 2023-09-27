// 9) json в строку

const json = {
    "name": "Artur",
    "age": 26,
    "skills": ["Javascript", "HTML", "CSS"],
    "position": "front-end developer"
}

const jsonToStr = (json) => {
    let str = '{';                            // cоздаем строку c открывающей скобкой
    for (let key in json) {                   // перебираем ключи в json
        str += `"${key}":"${json[key]}",`;    // добавляем в строку ключ и значение а также запятую, двойные кавычки и двоеточие
    }
    str = str.slice(0, -1);                   // удаляем последнюю запятую
    str += '}';                               // добавляем закрывающую скобку
    return str;
}

console.log(jsonToStr(json));
