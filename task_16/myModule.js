// 16) Задача на модули и использование внешних библиотек

// для решения задачи нужно установить библиотеку moment.js 
// npm install moment

// вариант с import (ES6)
// type="module" в html или в package.json "type": "module"
import moment from 'moment';

export const formatDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a');



// вариант с require (CommonJS)
const moment = require('moment');

function formatDate2(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = formatDate2;
