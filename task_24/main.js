// 24) Подгрузить данные и создать таблицу

// обычный феч запрос
// в данном случае filltext работает с http
// у некоторых браузеров по умолчанию стоит https everywhere (например у меня в firefox пришлось отключить https everywhere для данного сайта (localhost))
const fetchData = async () => {
    const url = 'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const data = await fetchData() // получаем данные

const table = document.createElement('table') // создаем таблицу
table.classList.add('table')
document.body.append(table)

const thead = document.createElement('thead') // создаем шапку таблицы
table.append(thead)

const tbody = document.createElement('tbody') // создаем тело таблицы
table.append(tbody)

const tr = document.createElement('tr') // создаем 'ряд' в шапке таблицы
thead.append(tr)

// список заголовков таблицы
const ths = ['First Name', 'Last Name', 'Tel', 'Address', 'City', 'State', 'Zip']
// для каждого заголовка создаем ячейку и добавляем в строку
ths.forEach(item => {
    const th = document.createElement('th')  // создаем th
    th.textContent = item                    // добавляем в него текст из списка заголовков 
    th.classList.add('sort-btn')             // добавляем класс для кнопки сортировки
    th.dataset.order = 'asc'                 // чтобы при первом клике сортировка была по возрастанию
    th.style.cursor = 'pointer'              // курсор при наведении на ячейку
    tr.append(th)                            // добавляем ячейку в строку
})

// функция для создания таблицы
const createTable = (data) => {
    tbody.innerHTML = ''
    data.forEach(item => {
        const tr = document.createElement('tr')  // для каждого обьекта в массиве создаем строку
        tbody.append(tr)

        const nameColumn = document.createElement('td') // создаем ячейку
        nameColumn.textContent = item.fname             // добавляем текст из массива в ячейку
        tr.append(nameColumn)                           // добавляем ячейку в строку
                                                        // повторяем для каждого элемента 
        const lastNameColumn = document.createElement('td')
        lastNameColumn.textContent = item.lname
        tr.append(lastNameColumn)

        const telColumn = document.createElement('td')
        telColumn.textContent = item.tel
        tr.append(telColumn)

        const addressColumn = document.createElement('td')
        addressColumn.textContent = item.address
        tr.append(addressColumn)

        const cityColumn = document.createElement('td')
        cityColumn.textContent = item.city
        tr.append(cityColumn)

        const stateColumn = document.createElement('td')
        stateColumn.textContent = item.state
        tr.append(stateColumn)

        const zipColumn = document.createElement('td')
        zipColumn.textContent = item.zip
        tr.append(zipColumn)
    })
}

// функция для пагинации принимает массив данных и номер страницы
const paginate = (data, page) => {
    const limit = 50                                // количество элементов на странице (в тз 50)
    const start = (page - 1) * limit                // начальный индекс элемента
    const end = page * limit                        // конечный индекс элемента
    const paginatedData = data.slice(start, end)    // создаем новый массив с элементами от начального до конечного индекса
    return paginatedData                            // возвращаем новый массив с данными именно для текущей страницы
}

// функция для создания кнопок пагинации
const createButtons = (data) => {
    const limit = 50                                        // для вычисления количества кнопок
    const buttonsCount = Math.ceil(data.length / limit)     // количество кнопок (длина массива / количество элементов на странице)
    const buttons = []                                      // массив для кнопок
    for (let i = 0; i < buttonsCount; i++) {                // итерируемся по количеству кнопок
        const button = document.createElement('button')     
        button.textContent = i + 1                          // текст кнопки
        button.classList.add('pagination-btn')              // класс кнопки
        buttons.push(button)                                // добавляем кнопку в массив
    }
    return buttons                                          // возвращаем массив кнопок
}

// создаем кнопки пагинации
// в данном случе я просто прикрепил кнопки к body так как их не много
// можно было создать кнопки next и prev а так же скрывать часть кнопок для красоты и удобства
const buttons = createButtons(data)                         
buttons.forEach(button => {                                 
    document.body.append(button)                            
})

// при клике на кнопку пагинации
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentPage = index + 1                        // номер страницы (+ 1 так как индекс с 0)
        const paginatedData = paginate(data, currentPage)    // получаем массив с данными для текущей страницы
        sessionStorage.setItem('currentPage', currentPage)   // я решил сохранять номер текущей страницы в sessionStorage (чтобы в дальнейшем можно было его использовать)
        createTable(paginatedData)                           // создаем таблицу с данными для текущей страницы
        buttons.forEach((btn) => btn.style.color = 'black')  // красим все кнопки в черный (чтобы при переключении страницы красилась только текущая)
        button.style.color = 'hotpink'                       // красим кнопку текущей страницы                             
    })
})

// функция для сортировки данных
// принимает массив данных, порядок сортировки (asc или desc) и индекс колонны по которой нужно сортировать
// для сортировки использую метод sort
// в зависимости от порядка сортировки:
// если порядок сортировки по возрастанию то сравниваем два элемента и возвращаем 1 если первый больше второго и -1 если наоборот
// нам нужно сравнивать элементы массива по ключу (например fname)
// для этого используем Object.keys(a)[column] где a это элемент массива, Object.keys(a) вернет массив ключей обьекта a
// в данном случае это ['fname', 'lname'...]
// чтобы получить fname нужно взять элемент с индексом column
// например Object.keys(a)[0] вернет fname
// чтобы получить значение по ключу используем a[Object.keys(a)[column]]
// P.S. прошу извинить за стену текста
const sortData = (data, order, column) => {
    const sortedData = data.sort((a, b) => {  
        if (order === 'asc') {                
            if (a[Object.keys(a)[column]] > b[Object.keys(b)[column]]) {   
                return 1
            } else {
                return -1
            }
        } else {
            if (a[Object.keys(a)[column]] < b[Object.keys(b)[column]]) {
                return 1
            } else {
                return -1
            }
        }
    })
    return sortedData
}

// кнопки сортировки это заголовки таблицы которые были созданны ранее
const sortButtons = document.querySelectorAll('.sort-btn')

// для каждой кнопки сортировки (заголовка) добавляем обработчик события (клик)
sortButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentPage = sessionStorage.getItem('currentPage')   // получаем номер текущей страницы из sessionStorage
        const order = button.dataset.order                          // получаем порядок сортировки из data-order (создано ранее)
        const column = index                                        // индекс колонны вданном случае совпадает с индексом заголовка но можно было взять его из data-column к примеру 
        const paginatedData = paginate(data, currentPage)           // создаем массив с данными для текущей страницы
        const sortedData = sortData(paginatedData, order, column)   // создаем массив с отсортированными данными
        createTable(sortedData)                                     // выводим на экран таблицу с отсортированными данными
        if (order === 'asc') {                                      // меняем порядок сортировки в зависимости от текущего
            button.dataset.order = 'desc'
        } else {
            button.dataset.order = 'asc'
        }
    })
})
// в зависимости от желаемого поведения можно было сначало отсортировать все данные а потом разбить на страницы
// таким образом при смене страницы данные были бы уже отсортированы от первой до последней страницы
// на данный момент при смене страницы данные сортируются только для текущей страницы


// при загрузке страницы создаем таблицу с данными для первой страницы
const onLoad = () => {
    const paginatedData = paginate(data, 1)
    sessionStorage.setItem('currentPage', 1)  // не забываем сохранить номер текущей страницы в sessionStorage
    buttons[0].style.color = 'hotpink'        // и покрасить первую кнопку
    createTable(paginatedData)
}

onLoad() // вызываем функцию запуска при загрузке страницы