// 18) Подсчитать максимальный объем данных в localStorage.

// Для наглядности, вывожу результаты на экран.
const result = document.querySelector('.result');

// использую try/catch, чтобы когда localStorage заполнится, и возникнет ошибка, вывести результат
// в случае ошибки, удаляю записанные данные и вывожу результат
// в try блоке при помощи цикла, записываю в localStorage данные, увеличивая их объем на 250 КБ (по одному будет очень долго)
// заведомо известно, что в localStorage можно записать приблизительно 5 МБ данных так что цикл до 20000 кб с запасом
// обьявляю переменную i при помощи var для того, чтобы она была доступна в catch блоке
// в catch блоке удаляю записанные данные и вывожу результат

function gen(n) {
    return new Array((n * 1024) + 1).join('a')
}

var i = 0;
try {
    for (i = 0; i <= 20000; i += 250) {
        localStorage.setItem('test', gen(i));
    }
} catch (e) {
    localStorage.removeItem('test');
    var el = document.getElementById('size');        
    el.innerHTML =  `Максимальный объем данных в localStorage: ${i - 250} КБ`     
}