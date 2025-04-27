// При каком-либо действии с необходимой авторизацией вызывается этот миделвейер.
// Например, при добавлении типов в таблицу type я должна прописать:
// Authorization
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJpa0BhYSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0MDQ1OTA4NCwiZXhwIjoxNzQwNTQ1NDg0fQ.Wg-ZFAjX8kqD3wkAth9zhOwq7ZypLZUB6XPHwKD_S9c
// Где после Bearer указывается токен.

const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        /*Если метод запроса — OPTIONS
         (используется браузерами для предварительного запроса CORS),
          то сразу передаем управление следующему middleware.*/
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            /*
            * Запросы обычно передают JWT-токен в заголовке Authorization в формате:
            * Authorization: Bearer <токен>
            Функция split(' ')[1] берет вторую часть заголовка, извлекая сам токен.
            * */
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            // Если токен отсутствует, отправляется ответ с кодом 401 (Unauthorized).
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            // Функция jwt.verify расшифровывает токен, используя секретный ключ SECRET_KEY из переменных окружения
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // Если роль пользователя (decoded.role) не совпадает с требуемой (role), то отправляется 403 Forbidden.
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            // Декодированная информация о пользователе сохраняется в req.user, и управление передается следующему middleware.
            req.user = decoded;
            next()
        } catch (e) {
            // Если токен недействителен или что-то пошло не так, отправляется 401 Unauthorized.
            res.status(401).json({message: "Не авторизован"})
        }
    };
}



