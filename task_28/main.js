// 28) Создать и добавить элемент с использованием шаблонов

const createBtn = document.getElementById('create');         // кнопка создания элемента


function createAndAddElement() {
    const template = document.createElement('template');     // создаем шаблон (можно в html можно вне функции)
    template.innerHTML = `<div>создано по шаблону</div>`;    // добавляем в шаблон что угодно
    const element = template.content.firstElementChild;      // создаем элемент из шаблона
    document.body.append(element);                           // добавляем элемент в body (можно куда угодно)
}


createBtn.addEventListener('click', createAndAddElement);     // для наглядности при клике на кнопку создаем элемент