// 23) Анализ пароля

// функция которая возвращает сообщение о надёжности пароля
// принимает на вход пароль и вызывает функцию analyzePassword
// в зависимости от количества ошибок возвращает соответствующее сообщение
// проходит по объекту recommendations и добавляет в сообщение рекомендации через запятую
// если ошибок нет, то возвращает сообщение о том, что пароль надёжный и оценку по 10-бальной шкале (10 - количество ошибок)
const determinePasswordStrength = (password) => {
    // для начала пишу функцию которая анализирует пароль и возвращает объект с рекомендациями и количеством ошибок 
    // проверка осуществляется с помощью регексов
    const analyzePassword = (password) => {
        let recommendations = {
            length: "",
            capitals: "",
            lowercase: "",
            numbers: "",
            special: ""
        };
        let errors = 0;
        if (password.length < 8) {
            recommendations.length = "Пароль должен содержать не менее 8 символов";
            errors++;
        }
        if (!password.match(/[a-z]/)) {
            recommendations.lowercase = "Пароль должен содержать хотя бы одну строчную букву";
            errors++;
        }
        if (!password.match(/[A-Z]/)) {
            recommendations.capitals = "Пароль должен содержать хотя бы одну заглавную букву";
            errors++;
        }
        if (!password.match(/[0-9]/)) {
            recommendations.numbers = "Пароль должен содержать хотя бы одну цифру";
            errors++;
        }
        if (!password.match(/[^A-Za-z0-9]/)) {
            recommendations.special = "Пароль должен содержать хотя бы один спецсимвол";
            errors++;
        }
        return {
            recommendations,
            errors,
        };
    }
    const analysis = analyzePassword(password);
    const errors = analysis.errors;
    const recommendations = analysis.recommendations;
    if (errors === 0) {
        return `Пароль надёжный. Оценка: ${10 - errors * 2}`;
    } else {
        let message = `Пароль ненадёжный. Оценка: ${10 - errors * 2}. `;
        if (errors === 1) {
            message += "Рекомендация: ";
        } else {
            message += "Рекомендации: ";
        }
        let first = true;
        for (let key in recommendations) {
            if (recommendations[key] !== "") {
                if (first) {
                    message += recommendations[key];
                    first = false;
                } else {
                    message += ", " + recommendations[key];
                }
            }
        }
        return message;
    }
}


console.log(determinePasswordStrength("1234567"))
// Пароль ненадёжный. Оценка: 2. Рекомендации: Пароль должен содержать не менее 8 символов, Пароль должен... 