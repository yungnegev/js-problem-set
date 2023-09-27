// 10) Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

const str = '{ "name": "Artur", "age": 26, "skills": ["Javascript", "HTML", "CSS"], "intern": true }';

// полный вариант парсинга json
// в граматике джсон есть пробелы, скобки, ковычки а так же типы данных (объекты, массивы, строки, числа, булевые значения и null)
// эта функция проходит по каждому символу и проверяет его на соответствие грамматике
// после символа '{' если символ не является '}' то строка -> пробел -> ':' -> значение -> ...
// в зависимости от типа значения, функция вызывает соответствующую функцию для парсинга

function fakeParseJSON(str) {
  let i = 0; // Индекс текущего символа

  return parseValue();

  // Функция парсинга объекта
  function parseObject() {
      // проверка на открывающую скобку
      if (str[i] === "{") {
          i++; // Двигается дальше (пропускает открывающую скобку)
          skipWhitespace(); // Пропускает пробелы

          const result = {}; // Создает пустой объект

          let initial = true; // Флаг для отслеживания первой пары ключ-значение
          while (str[i] !== "}") {
              if (!initial) {
                  eatComma(); // Если не первая пара, то ожидается запятая
                  skipWhitespace();
              }
              const key = parseString(); // Парсит ключ используя функцию parseString
              skipWhitespace();
              eatColon(); // Ожидается двоеточие
              const value = parseValue(); // Парсит значение используя функцию parseValue
              result[key] = value; // Добавляет пару ключ-значение в объект
              initial = false; // Сбрасывает флаг
          }
          i++; // Двигается дальше (пропускает закрывающую скобку)
          return result; // Возвращает объект
      }
  }

  // Функция парсинга массива
  function parseArray() {
      // проверка на открывающую скобку
      if (str[i] === "[") {
          i++; // Двигается дальше (пропускает открывающую скобку)
          skipWhitespace(); // Пропускает пробелы

          const result = []; // Создает пустой массив
          let initial = true; // Флаг для отслеживания первого элемента
          while (str[i] !== "]") {
              if (!initial) {
                  eatComma(); // Если не первый элемент, то ожидается запятая
              }
              const value = parseValue(); // Парсит значение используя функцию parseValue
              result.push(value); // Добавляет значение в массив
              initial = false; // Сбрасывает флаг
          }
          i++; // Двигается дальше (пропускает закрывающую скобку)
          return result; // Возвращает массив
      }
  }

  // Функция парсинга значения
  function parseValue() {
      skipWhitespace(); // Пропускает пробелы
      const value =
          parseString() ?? // Попытка парсинга строки
          parseNumber() ?? // Попытка парсинга числа
          parseObject() ?? // Попытка парсинга объекта
          parseArray() ?? // Попытка парсинга массива
          parseKeyword("true", true) ?? // Попытка парсинга ключевого слова "true"
          parseKeyword("false", false) ?? // Попытка парсинга ключевого слова "false"
          parseKeyword("null", null); // Попытка парсинга ключевого слова "null"
      skipWhitespace(); // Пропускает пробелы
      return value; // Возвращает значение
  }

  // Парсит ключевое слово и возвращает соответствующее значение
  function parseKeyword(name, value) {
      if (str.slice(i, i + name.length) === name) {
          i += name.length; // Двигается дальше (пропускает ключевое слово)
          return value; // Возвращает значение
      }
  }

  // Пропускает пробелы
  function skipWhitespace() {
      while (
          str[i] === " " ||
          str[i] === "\n" ||
          str[i] === "\t" ||
          str[i] === "\r"
      ) {
          i++; // Двигается дальше пока текущий символ является пробелом
      }
  }

  // Парсит строку
  function parseString() {
      if (str[i] === '"') {
          i++; // Двигается дальше (пропускает открывающую кавычку)
          let result = ""; // Создает пустую строку
          while (str[i] !== '"') {
              if (str[i] === "\\") {
                  const char = str[i + 1];
                  if (
                      char === '"' ||
                      char === "\\" ||
                      char === "/" ||
                      char === "b" ||
                      char === "f" ||
                      char === "n" ||
                      char === "r" ||
                      char === "t"
                  ) {
                      result += char;
                      i++; 
                  } else if (char === "u") {
                      if (
                          isHexadecimal(str[i + 2]) &&
                          isHexadecimal(str[i + 3]) &&
                          isHexadecimal(str[i + 4]) &&
                          isHexadecimal(str[i + 5])
                      ) {
                          result += String.fromCharCode(
                              parseInt(str.slice(i + 2, i + 6), 16)
                          ); // Парсит символы из unicode escape sequence
                          i += 5; 
                      }
                  }
              } else {
                  result += str[i];
              }
              i++;
          }
          i++; 
          return result; 
      }
  }

  // Проверяет, является ли символ hex-числом
  function isHexadecimal(char) {
      return (
          (char >= "0" && char <= "9") ||
          (char.toLowerCase() >= "a" && char.toLowerCase() <= "f")
      );
  }

  // Парсит число
  function parseNumber() {
      let start = i;
      if (str[i] === "-") {
          i++; // если число отрицательное, то двигается дальше (пропускает минус)
      }
      if (str[i] === "0") {
          i++; // если число начинается с нуля, то двигается дальше (пропускает ноль)
      } else if (str[i] >= "1" && str[i] <= "9") {
          i++;
          while (str[i] >= "0" && str[i] <= "9") {
              i++; 
          }
      }

      if (str[i] === ".") {
          i++;
          while (str[i] >= "0" && str[i] <= "9") {
              i++; // двигается дальше пока текущий символ является числом
          }
      }
      if (str[i] === "e" || str[i] === "E") { // если есть экспонента
          i++; 
          if (str[i] === "-" || str[i] === "+") {
              i++; 
          }
          while (str[i] >= "0" && str[i] <= "9") {
              i++;
          }
      }
      if (i > start) {
          return Number(str.slice(start, i)); 
      }
  }

  // проверка на запятую
  function eatComma() {
      if (str[i] !== ",") {
          throw new Error('Expected ",".');
      }
      i++; 
  }

  // проверка на двоеточие
  function eatColon() {
      if (str[i] !== ":") {
          throw new Error('Expected ":".');
      }
      i++; 
  }
}

console.log(fakeParseJSON(str));


// можно просто использовать eval
function fakeParseJSON2(str) {
    return eval(`(${str})`);
}

console.log(fakeParseJSON2(str)['name']);