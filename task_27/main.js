// 27) функция, которая добавляет анимацию для элемента


// 1) анимация через animate

const infinite = document.querySelector('.infinite')  // выбираем элемент и придаем ему стили
infinite.style.backgroundColor = 'blue';
infinite.style.width = '100px';
infinite.style.height = '100px';

const animateElement1 = (elem) => {                   // используем метод animate для анимации
    elem.animate([                                    // он принимает 2 аргумента: 1) массив с объектами, 2) объект с настройками
        { transform: 'translateY(0px)' },
        { transform: 'translateY(300px)' }
    ], {
        duration: 2000,
        iterations: Infinity
    });
}

animateElement1(infinite);


// 2) анимация через setInterval

document.body.style.position = 'relative';            // родитель елемента (в данном случае body) должен иметь position: relative
let element = document.querySelector('.element');     // выбираем элемент и придаем ему стили
element.style.position = 'absolute';
element.style.backgroundColor = 'red';
element.style.width = '100px';
element.style.height = '100px';


function animateElement2 (elem) {
    let pos = 0;                                       // задаем начальные координаты (можно было 2 переменные для x и y)
    let id = setInterval(frame, 5);                    // задаем интервал и функцию, которая будет выполняться каждые 5 мс
    function frame () {                                // функция, которая будет выполняться каждые 5 мс и менять координатыт (за счет хоиста доступна выше)
        if (pos == 350) {
            clearInterval(id);                         // останавливаем интервал, когда координаты достигнут нужного значения
        } else {
            pos++;                                     // увеличиваем координаты на 1 и присваиваем их элементу
            elem.style.top = `${pos}px`;                 
            elem.style.left = `${pos}px`;
        }
    }
}


animateElement2(element);



