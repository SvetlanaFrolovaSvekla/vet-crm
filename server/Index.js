require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors'); // Импортируем cors
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const helmet = require('helmet');

const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors()); // Без параметров = разрешить всё
app.options('*', cors()); // Явно разрешаем preflight для всех маршрутов

// Другие middleware
app.disable('x-powered-by');
app.use(express.json());
app.use(helmet({
    frameguard: { action: 'deny' },
    contentSecurityPolicy: false,
}));

// Роутеры
app.use('/api', router);

// Тестовый эндпоинт
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS разрешён для всех!', timestamp: new Date() });
});

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Ошибка запуска сервера:', e);
    }
};

start();