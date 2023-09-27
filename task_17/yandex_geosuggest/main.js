const input = document.querySelector('.input');  // инпут, в котором вводится текст
const list = document.querySelector('.list');    // список, в котором отображаются подсказки

const API_KEY = 'cffe26ef-d499-4dea-b428-ab60a5a5c977';

// обычный фетч
const fetchSuggest = async (key, text) => {
    const url = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${key}&text=${text}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// то что будет выполняться при вводе текста в инпут
const handleInputChange = async (event) => {       // нам будет доступен евент
    const text = event.target.value;               // получаем текст из инпута
    const data = await fetchSuggest(API_KEY, text);// получаем данные с сервера
    const items = data.results || [];              // получаем массив подсказок или если его нет, то пустой массив
    list.innerHTML = '';                           // очищаем список
    items.forEach(item => {                        // проходимся по массиву подсказок
        const li = document.createElement('li');   // тут можно сделать любые дом элементы которые нам нужны, для данного примера я всего лишь создаю li
        li.textContent = item.title['text'];       // и вставляю в него текст подсказки
        list.appendChild(li);
    })
}

// тротлинг позволяет уменьшить количество вызовов функции, которая выполняется слишком часто 
// к примеру инпут, который отправляет запрос на сервер при каждом вводе символа как в нашем случае
// ниже стандартная реализация функции throttle которая принимает функцию и время в миллисекундах
const throttle = (func, limit) => {
    let inThrottle; // переменная, которая будет хранить состояние того, выполняется ли функция в данный момент

    return function() {
        const args = arguments; // сохраняем аргументы функции
        const context = this; // сохраняем контекст вызова функции

        if (!inThrottle) {
            // если на данный момент не находимся в состоянии троттлинга, то выполняем функцию
            func.apply(context, args); // вызываем функцию с сохраненными аргументами и контекстом
            inThrottle = true; // после выполнения функции устанавливаем переменную в true
            setTimeout(() => inThrottle = false, limit); // через время limit устанавливаем переменную в false и тем самым разрешаем выполнение функции
        }
    };
};

// дебаунс позволяет отложить выполнение функции на определенное время после последнего вызова
const debounce = (func, delay) => {
    let timeoutId; // переменная, которая будет хранить id таймаута чтобы его можно было отменить

    return function() {
        const args = arguments; // тут все аналогично троттлингу
        const context = this;

        clearTimeout(timeoutId); // очищаем существующий таймаут если он есть

        timeoutId = setTimeout(() => {
            // делаем новый таймаут, который будет выполняться через delay миллисекунд
            func.apply(context, args); // вызываем функцию аналогично троттлингу
        }, delay);
    };
};

const handleInputChangeDebounced = debounce(handleInputChange, 1000); // время в миллисекундах
const handleInputChangeThrottled = throttle(handleInputChange, 1000);

// вешаем обработчик на инпут и вызываем функцию handleInputChangeDebounced или handleInputChangeThrottled
input.addEventListener('input', handleInputChangeDebounced);
// input.addEventListener('input', handleInputChangeThrottled);

