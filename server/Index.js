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

// Упрощенная настройка CORS
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000'
];

// Настройка CORS - более простая версия
app.use(cors({
    origin: function (origin, callback) {
        // Разрешить запросы без origin (например, мобильные приложения)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(`CORS block for origin: ${origin}`);
            // В рабочем режиме лучше просто отклонять запросы без ошибки
            callback(null, true); // Временно разрешаем все origins для отладки
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Обработка preflight запросов для всех маршрутов
app.options('*', cors());


app.use(express.json())

app.use(
    helmet({
        frameguard: { action: 'deny' }, // <- явно запрещаем встраивание в iframe
        contentSecurityPolicy: false, // отключаем CSP для отладки

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

// CORS для отладки - для проверки что сервер отвечает на запросы CORS
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS test successful!' });
});

app.use(errorHandler)


app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
});

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