// 15) Асинхронность

// такой вариант только будет работать если type="module" в html
// или если запускать через node.js c .mjs || type="module" в package.json

const fetchData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const result =  await fetch(url);   // await - ожидание выполнения промиса, result будет http-ответом
    const data =  await result.json();  // data будет результатом выполнения result.json()
    return data;
};

const data = await fetchData();         // data будет результатом выполнения promise
console.log(data);                      // json-объект
