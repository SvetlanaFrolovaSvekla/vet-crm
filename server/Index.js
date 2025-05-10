require('dotenv').config() // Для использования конст. пременных из .env
const express = require('express'); // веб-фреймворк
const sequelize = require('./db') // ORM
const cors = require('cors') // для обращения с разных доменов
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const helmet = require('helmet');

const PORT = process.env.PORT || 5000;

const app = express();
// чтобы Express отвечал на preflight даже для неизвестных маршрутов
app.disable('x-powered-by');

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000'
];

const corsOptions = {
    origin(origin, cb) {
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
// Используем единый corsOptions
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Для preflight


app.use(express.json())

app.use(
    helmet({
        frameguard: { action: 'deny' }, // <- явно запрещаем встраивание в iframe
    })
);


app.use('/api', router) // 6. Отдаю роутер с машрутами doljnosti/... т.е будут открыты соотв. контроллеры,


/*// Проверка - h[t]tp://localhost:5000/roles
app.get('/roles', async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM Roles');
        res.json(results);
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});*/

app.use(errorHandler)
// await sequelize.sync() - функция сравнивает бд со схемой данных
// await sequelize.authenticate(); // Подключение к базе данных
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start();