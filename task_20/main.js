// 20) функция подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи


// для удобства, в html я создал 3 кнопки и инпут
// в инпуте вводится число, которое будет умножено на 1024 и введено в LocalStorage как строка
// при нажатии на кнопку set, в LocalStorage записывается строка длинной в "n" килобайт
// при нажатии на кнопку get, в span выводится результат вычасления занимаемой памяти в LocalStorage
// при нажатии на кнопку clear, LocalStorage очищается
const setBtn = document.querySelector('.set');
const clearBtn = document.querySelector('.clear');
const getBtn = document.querySelector('.get');
const input = document.querySelector('input');
const size = document.querySelector('.size');


// функция подсчета объема памяти занимаемого данными в LocalStorage
const  getLocalStorageSpace = function() {
    var total = 0;
    for (var x in localStorage) {
        var amount = (localStorage[x].length) / 1024
        if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
            total += amount;
        }
    }
    console.log(total.toFixed(2));
    return total.toFixed(2);
};

// вспомогательная функция для генерации строки "n" килобайт (из предыдущей задачи)
function gen(n) {
    return new Array((n * 1024) + 1).join('a')
}

// функция записи в LocalStorage
const setLocalStorage = () => {
    const value = input.value;
    try {
        localStorage.setItem('test', gen(value));
        getBtn.click();
    } catch (e) {
        size.innerHTML = e;
    }
}

// функция очистки LocalStorage
const clearLocalStorage = () => {
    localStorage.clear();
    getBtn.click();
}


// обработчики событий
getBtn.addEventListener('click', () => {
    size.innerHTML = getLocalStorageSpace();
})

setBtn.addEventListener('click', () => {
    setLocalStorage();
})

clearBtn.addEventListener('click', () => {
    clearLocalStorage();
})