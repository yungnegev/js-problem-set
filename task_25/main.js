// 25) стилизовать элемент


function createSquare() {
    const square = document.createElement('div')            // создаем элемент 'div'
    square.style.width = '200px'                            // задаем ему стиль 
    square.style.height = '200px'
    square.style.backgroundColor = 'red'

    document.body.appendChild(square)                       // добовляем его в DOM (в тело)

    square.addEventListener('click', () => {                // event listener для наглядности
        square.style.backgroundColor === 'red' 
            ? square.style.backgroundColor = 'blue' 
            :  square.style.backgroundColor = 'red'
})
}

createSquare()