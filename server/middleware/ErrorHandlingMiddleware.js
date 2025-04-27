/*
* Middleware (промежуточное ПО) — это функции, которые обрабатывают запросы между клиентом и сервером.
*  Они могут изменять запросы, проверять данные, защищать маршруты и многое другое.
Logger (логирование запроса).
CORS (разрешение кросс-доменных запросов).
Auth (проверка JWT-токена).
Routes (обработка маршрутов).
ErrorHandler (обработка ошибок).
*
* */

/*Этот код — это middleware для обработки ошибок в Express.
 Он перехватывает ошибки в запросах и отправляет корректный HTTP-ответ клиенту.*/

const ApiError = require('../error/ApiError'); // Импортируется класс ApiError c типом ошибок

/*
* Экспортируется middleware-функция с 4 параметрами (err, req, res, next).
В Express middleware с 4 аргументами автоматически распознаётся как обработчик ошибок.
*
* Если ошибка — это экземпляр ApiError, сервер отправляет клиенту JSON-ответ с кодом ошибки и её описанием.
*  Если ошибка не является ApiError, сервер возвращает 500 Internal Server Error
*  с сообщением "Непредвиденная ошибка!".
* */
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}
