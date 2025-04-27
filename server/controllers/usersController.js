const Users = require('../models/Users');
const Roles = require("../models/Roles");

class UsersController {

    // Создание пользователя
    async create(req, res) {
        try {
            const {email, password, role} = req.body;


            if (!email || email.trim() === "") {
                return res.status(400).json({error: "Электронный адрес не может быть пустым!"});
            }

            if (!password || password.trim() === "") {
                return res.status(400).json({error: "Пароль не может быть пустым!"});
            }

            if (!role) {
                return res.status(400).json({error: "Роль не может быть пустой!"});
            }

            const roleItem = await Roles.findByPk(role);

            if (!roleItem) {
                return res.status(404).json({error: "Указанная роль не найдена!"});
            }

            const usersNew = await Users.create({email, password, role});

            return res.json(usersNew);
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error.message, error);
            res.status(500).json({error: "Ошибка сервера!", details: error.message});
        }

    }

    // Получение всех пользователей
    async getAll(req, res) {
        try {
            const users = await Users.findAll({
                include: [{model: Roles, attributes: ['naimenovanie']}]
            });
            res.json(users);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }

    // Получение пользователя по ID
    async getById(req, res) {
        try {
            const {id} = req.params;
            const user = await Users.findByPk(id, {
                include: [{model: Roles, attributes: ['naimenovanie']}]
            });

            if (!user) {
                return res.status(404).json({error: 'Пользователь не найден'});
            }
            res.json(user);
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }

    // Обновление данных пользователя
    async update(req, res) {
        try {
            const {id} = req.params;
            const {email, password, role} = req.body;

            const userItem = await Users.findByPk(id);
            if (!userItem) {
                return res.status(404).json({error: 'Пользователь не найден'});
            }

            if (role) {
                const roleItem = await Roles.findByPk(role);

                if (!roleItem) {
                    return res.status(404).json({error: "Указанная роль не найдена!"});
                }
            }


            if (email) userItem.email = email;
            if (password) userItem.password = password;
            if (role) userItem.role = role;


            await userItem.save();
            return res.json(userItem);

        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }

    // Удаление пользователя
    async delete(req, res) {
        try {
            const {id} = req.params;
            const userItem = await Users.findByPk(id);
            if (!userItem) {
                return res.status(404).json({error: 'Пользователь не найден'});
            }

            await userItem.destroy();
            return res.json({message: 'Пользователь удален'});

        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }

    // Обновление данных пользователя по его электронному адресу
    async updateByEmail(req, res) {
        try {
            const {email} = req.params; // Получаем email из URL
            const {emailU, role, number, FIO} = req.body;

            // !emailU Это такой костылек... тот же емайл, который приходит из параметров

            // Проверяем, существует ли пользователь с таким email
            const user = await Users.findOne({where: {email}});
            if (!user) {
                return res.status(404).json({error: 'Пользователь с таким email не найден!'});
            }

            // Проверяем, существует ли роль
            let roleName = null;
            if (role) {
                const roleItem = await Roles.findByPk(role);
                if (!roleItem) {
                    return res.status(404).json({error: "Указанная роль не найдена!"});
                } else {
                    roleName = roleItem.naimenovanie; // Получаем наименование роли
                    console.log('Указанная роль:', roleName);
                }
            }

            // Обновляем данные
            user.email = emailU;
            user.role = role;
            user.number = number;
            user.FIO = FIO;


            // Сохраняем изменения
            await user.save();

            // Возвращаем обновленные данные, включая наименование роли
            return res.json({
                ...user.toJSON(),
                roleName: roleName
            });
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error.message, error);
            res.status(500).json({error: 'Ошибка сервера', details: error.message});
        }
    }


}


module.exports = new UsersController();