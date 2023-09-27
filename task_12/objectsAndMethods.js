// 12) Задача на работу с объектами

let book = {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    year: 1954,
    getTitle: () => {             // метод getTitle возвращает значение свойства title объекта book
        return book.title         // если использовать стрелочную функцию, то this будет ссылаться на глобальный объект window
    },
    getAuthor: function () {      // метод getAuthor возвращает значение свойства author объекта book
        return this.author        // если использовать обычную функцию, то this будет ссылаться на объект book (показываю оба варианта)
    },
    getYear:  function () {
        return this.year
    },
    setTitle: (title) => {
        book.title = title
    },
    setAuthor: function (author)  {
        this.author = author
    },
    setYear: function (year)  {
        this.year = year
    },
}


console.log(book.getTitle()) // The Lord of the Rings
console.log(book.getAuthor()) // J.R.R. Tolkien
console.log(book.getYear()) // 1954

book.setTitle('The Hobbit')
book.setAuthor('J.R.R. Tolkien')
book.setYear(1937)

console.log(book.getTitle()) // The Hobbit
console.log(book.getAuthor()) // J.R.R. Tolkien
console.log(book.getYear()) // 1937