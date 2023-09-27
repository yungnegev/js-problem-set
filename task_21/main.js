// 21) Вычислить размер коллстэка

const sizeDiv = document.querySelector('.size');

// размер коллстэка обычно вычисляется при помощи рекурсии
// когда стэк переполняется, то возникает ошибка
// и мы можем поймать ее при помощи try/catch
// в mozilla firefox ошибка 'too much recursion'
// в google chrome ошибка 'maximum call stack size exceeded'
// размер коллстэка равен количеству вызовов функции до возникновения ошибки
// выполняя функцию я получаю каждый раз немного разный результат (в среднем он похож но немного отличается)
// это связано с тем, что кол стэк может быть разным в зависимости от доступной для него памяти

var compute_size = () =>
  new Promise((resolve) => {
    var repeat = (size) => {
      try {
        repeat(size + 1);
      } catch (err) {
        resolve(size);
      }
    };
    repeat(0);
  });

const size = await compute_size();
sizeDiv.innerHTML = size;
console.log(size);