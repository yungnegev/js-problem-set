// 14) Промисы

const imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_langur.jpg'

function loadImage(url) {
    return new Promise((resolve, reject) => {         // Создаем промис, у которого есть 2 состояния: resolve и reject
        const img = new Image();                      // я решил создать картинку, чтобы было видно, что она загрузилась
        img.src = url;                                
        img.onload = () => {                          // если картинка загрузилась, то вызываем resolve
            resolve(img);                             // resolve принимает аргументом то, что мы хотим вернуть
        }
        img.onerror = () => {                         // если картинка не загрузилась, то вызываем reject
            reject(new Error('Image load failed'));   // reject принимает аргументом ошибку, которую мы хотим вернуть
        }   
    });
}


// вызываем функцию loadImage с url картинки которую мы хотим загрузить
loadImage(imgUrl)                             // возвращается промис
    .then(img => {                            // если промис перешел в состояние resolve, то вызываем then
        console.log(img);                     // в then мы получаем то, что мы передали в resolve (в нашем случае это img)
        img.style.width = '300px';            // можем с ним работать как с обычным dom элементом
        document.body.append(img);            // добавляем картинку на страницу для наглядности
    })
    .catch(error => console.log(error));      // если промис перешел в состояние reject, то вызываем catch и получаем ошибку, которую мы передали в reject
                                              // в нашем случае это new Error('Image load failed')
    
