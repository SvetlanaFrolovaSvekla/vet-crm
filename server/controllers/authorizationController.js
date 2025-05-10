require('dotenv').config();
const Users = require('../models/Users');
const Roles = require('../models/Roles');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const uuid = require('uuid'); // Для генерации уникальной ссылки
const moment = require('moment');
const {Op} = require('sequelize');


// Настройка транспорта для отправки email через Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,  // email
        pass: process.env.SMTP_PASS   // Пароль приложения (НЕ обычный пароль!)
    }
});

// Функция генерации JWT-токена
const generateJwt = (id, email, role, number, FIO, roleName) => {
    return jwt.sign(
        {id, email, role, number, FIO, roleName},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

// Функция для проверки безопасности пароля
function isPasswordSecure(password) {
    // Минимальная длина пароля
    const minLength = 8;

    // Регулярные выражения для проверки наличия цифр, заглавных букв и специальных символов
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*]/;

    // Проверка длины пароля
    if (password.length < minLength) {
        return {isValid: false, message: 'Пароль должен содержать не менее 8 символов'};
    }

    // Проверка наличия цифр
    if (!hasNumber.test(password)) {
        return {isValid: false, message: 'Пароль должен содержать хотя бы одну цифру'};
    }

    // Проверка наличия заглавных букв
    if (!hasUpperCase.test(password)) {
        return {isValid: false, message: 'Пароль должен содержать хотя бы одну заглавную букву'};
    }

    // Проверка наличия специальных символов
    if (!hasSpecialChar.test(password)) {
        return {isValid: false, message: 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*)'};
    }

    return {isValid: true};
}


class authorizationController {

    // Регистрация
    async registration(req, res, next) {
        const {email, password, role = 1, number, FIO} = req.body;

        // Проверяем ввод
        if (!email || !password || !number || !FIO) {
            return next(ApiError.badRequest('Некорректные данные: email, пароль, номер и ФИО обязательны!'));
        }

        // Проверяем безопасность пароля
        const passwordCheck = isPasswordSecure(password);
        if (!passwordCheck.isValid) {
            return next(ApiError.badRequest(passwordCheck.message));
        }

        // Проверяем, существует ли email
        const candidate = await Users.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует!'));
        }

        // Хэшируем пароль
        const hashPassword = await bcrypt.hash(password, 5);

        // Генерируем ссылку активации
        const activationLink = uuid.v4();

        // Создаем пользователя (но он НЕ активирован)
        const user = await Users.create({
            email,
            password: hashPassword,
            role,
            number,
            FIO,
            isActivated: false,
            activationLink
        });

        // Формируем URL для подтверждения
        const confirmationUrl = `${process.env.API_URL}/api/authorization/auth/activate/${activationLink}`;

        // Отправляем email с подтверждением
        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Подтверждение регистрации!",
                text: `Для подтверждения вашей учетной записи перейдите по ссылке: ${confirmationUrl}`
            });
            console.log("Письмо отправлено успешно!");
        } catch (error) {
            console.error("Ошибка при отправке письма: ", error);
        }


        return res.json({message: "На вашу почту отправлено письмо для подтверждения регистрации!"});
    }

    async activate(req, res) {
        try {
            const {link} = req.params;
            console.log("Activation link:", link); // Логируем ссылку активации

            const user = await Users.findOne({where: {activationLink: link}});
            console.log("User found:", user); // Логируем найденного пользователя

            if (!user) {
                return res.status(400).json({message: "Некорректная ссылка активации!"});
            }

            user.isActivated = true;
            user.activationLink = null;
            await Users.update({isActivated: true, activationLink: null}, {where: {activationLink: link}});


            console.log("User activated successfully:", user); // Логируем успешную активацию

            return res.redirect(process.env.CLIENT_URL + "/login"); // Перенаправляем на страницу входа
        } catch (error) {
            console.error("Ошибка при активации:", error); // Логируем ошибку
            return res.status(500).json({message: "Ошибка при активации"});
        }
    }

    // Авторизация (логин)
    async login(req, res, next) {
        const {email, password} = req.body;

        const user = await Users.findOne({
            where: {email},
            include: [{model: Roles, attributes: ['naimenovanie']}]
        });

        if (!user) {
            return next(ApiError.internal('Пользователь не найден!'));
        }

        if (!user.isActivated) {
            return next(ApiError.forbidden('Подтвердите email перед входом!'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль!'));
        }

        const token = generateJwt(user.id, user.email, user.role, user.number, user.FIO, user.Role.naimenovanie, user.answerForSecretQuestion);

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                roleName: user.Role ? user.Role.naimenovanie : "Роль не найдена!",
                number: user.number,
                FIO: user.FIO,
                answerForSecretQuestion: user.answerForSecretQuestion
            }
        });
    }

    // Проверка токена
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.number, req.user.FIO, req.user.roleName, req.user.answerForSecretQuestion);
        return res.json({token});
    }

    async forgotPassword(req, res, next) {
        const {email} = req.body;

        if (!email) {
            return next(ApiError.badRequest('Email обязателен!'));
        }

        const user = await Users.findOne({where: {email}});

        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не найден!'));
        }

        const resetToken = uuid.v4();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = moment().add(1, 'hour').toDate();

        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Восстановление пароля",
                text: `Для восстановления пароля перейдите по ссылке: ${resetUrl}`
            });
            return res.json({message: "На ваш email отправлена инструкция по восстановлению пароля"});
        } catch (error) {
            console.error("Ошибка при отправке письма: ", error);
            return next(ApiError.internal('Ошибка при отправке письма'));
        }
    }

// Сброс пароля
    async resetPassword(req, res, next) {
        const {token} = req.params;
        const {password} = req.body;

        const passwordCheck = isPasswordSecure(password);
        if (!passwordCheck.isValid) {
            return next(ApiError.badRequest(passwordCheck.message));
        }

        const user = await Users.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {[Op.gt]: Date.now()}


            }
        });

        if (!user) {
            return next(ApiError.badRequest('Ссылка для восстановления пароля недействительна или истекла!'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        user.password = hashPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.json({message: "Пароль успешно изменен!"});
    }


// Метод changePassword в authorizationController
    async changePassword(req, res, next) {
        const {email, oldPassword, newPassword} = req.body; // Добавляем email в запрос

        if (!email) {
            return next(ApiError.badRequest('Email обязателен!'));
        }

        try {
            // Находим пользователя по email
            const user = await Users.findOne({where: {email}});
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден!'));
            }

            // Проверяем старый пароль
            const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
            if (!isPasswordValid) {
                return next(ApiError.badRequest('Неверный старый пароль!'));
            }

            const passwordCheck = isPasswordSecure(newPassword);
            console.log(passwordCheck); // Для отладки
            if (!passwordCheck.isValid) {
                return next(ApiError.badRequest(passwordCheck.message));
            }


            // Хэшируем новый пароль
            const hashPassword = await bcrypt.hash(newPassword, 5);

            // Обновляем пароль
            user.password = hashPassword;
            await user.save();

            return res.json({message: 'Пароль успешно изменён!'});
        } catch (error) {
            console.error('Ошибка при изменении пароля:', error);
            return next(ApiError.internal('Ошибка при изменении пароля!'));
        }
    }
}


module.exports = new authorizationController();
