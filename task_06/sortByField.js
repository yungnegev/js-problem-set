// 6) Задача о сортировке объектов

let users = [
    { name: 'John', age: 25 },
    { name: 'Pete', age: 30 },
    { name: 'Ann', age: 25 },
    { name: 'Ann', age: 20 },
    { name: 'Ann', age: 30 },
]

users.sort((a, b) => {                          // метод sort()
    if (a.age > b.age) return 1                 // если возраст a больше возраста b, то возвращаем 1
    if (a.age < b.age) return -1                // если возраст a меньше возраста b, то возвращаем -1    
    if (a.name > b.name) return 1               // если возраста равны, то сортируем по имени
    if (a.name < b.name) return -1                  
})

console.log(users) // [ { name: 'Ann', age: 20 }, { name: 'Ann', age: 25 }, { name: 'John', age: 25 } ... ]

