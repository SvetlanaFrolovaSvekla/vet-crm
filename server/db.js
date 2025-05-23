/*Этот файл (db.js) отвечает за настройку и подключение к базе данных с использованием
библиотеки Sequelize, которая является ORM (Object-Relational-Mapping) для работы с базами данных в Node.js.
*/

require('dotenv').config(); // Использование констант из .env
const { Sequelize } = require('sequelize'); // Импорт библиотеки для работы с бд

// Создание экземпляра Sequelize
// В конструктор передаются параметры для подключения к БД
// Создание экземпляра Sequelize
// Создание экземпляра Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Важно для Render и аналогичных хостингов
            },
        },
    }
);

// Проверка подключения к базе данных
async function testConnection() {
    try {
        // Метод проверяет, что подключение к базе данных работает корректно
        await sequelize.authenticate();
        console.log('Соединение с БД установлено успешно.');
    } catch (error) {
        console.error('Ошибка подключения к БД:', error);
    }
}

testConnection();

// Экспорт этого экземпляра sequelize, чтоб его можно было использовать в index.js, др. частях
module.exports = sequelize;