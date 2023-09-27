// 26) Рекурсивно пройтись по всему DOM дереву и вывести в консоль каждый элемент

const body = document.body;

// Функция принимает дом елемент (с которого начинается обход)
// выводит в консоль информацию о теге
// для каждого дочернего элемента вызывает рекурсивно эту же функцию

function recursiveDOM(node) {
    console.log(node);
    for (let i = 0; i < node.children.length; i++) {
        recursiveDOM(node.children[i]);
    }
}


recursiveDOM(body);