/*
*  Этот класс ApiError используется для обработки ошибок на сервере.
*  Он наследуется от встроенного класса Error и добавляет кастомные статусы HTTP.
* */

class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    // 🔴 404 Not Found — ресурс не найден.
    // 🔴 throw ApiError.badRequest('Продукт не найден');
    static badRequest(message) {
        return new ApiError(404, message)
    }

    // 🔴 500 Internal Server Error — ошибка на сервере.
    // throw ApiError.internal('Ошибка базы данных');
    static internal(message) {
        return new ApiError(500, message)
    }

    // 🔴 403 Forbidden — доступ запрещён.
    // throw ApiError.forbidden('Нет доступа');
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError
