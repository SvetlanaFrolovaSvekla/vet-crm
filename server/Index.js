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

// Замените ваш corsOptions на это:
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000',
    'https://your-netlify-app.netlify.app' // добавьте ваш будущий Netlify URL
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};

// Применяем CORS middleware
app.use(cors(corsOptions));
// Handle preflight requests - ДОБАВЬТЕ ЭТО ЗДЕСЬ
app.options('*', cors(corsOptions));

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