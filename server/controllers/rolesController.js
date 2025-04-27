const Roles = require('../models/Roles'); // Импорт модели

class RolesController {

    // Создание роли
    async create(req, res) {
        try {
            const {naimenovanie} = req.body;
            if (!naimenovanie || naimenovanie.trim() === "") {
                return res.status(400).json({error: "Название роли не может быть пустым!"});
            }
            const rolesNew = await Roles.create({naimenovanie});
            return res.json(rolesNew);
        } catch (error) {
            console.error("Ошибка при создании роли:", error);
            res.status(500).json({error: "Ошибка сервера!"});
        }
    }

    // Получение всех ролей
    async getAll(req, res) {
        try {
            const roles = await Roles.findAll();
            res.json(roles);
        } catch (error) {
            console.error('Ошибка при получении ролей:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }

    // Изменение данных роли
    async update(req, res) {
        try {
            const {id} = req.params; // Из :id
            const {naimenovanie} = req.body;
            const roleItem = await Roles.findByPk(id);
            if (!roleItem) {
                return res.status(404).json({error: 'Роль не найдена'});
            }
            roleItem.naimenovanie = naimenovanie;
            await roleItem.save();
            return res.json(roleItem);
        } catch (error) {
            console.error('Ошибка при обновлении роли:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }

    // Удаление роли
    async delete(req, res) {
        try {
            const {id} = req.params; // Берется id из URL, :id
            const roleItem = await Roles.findByPk(id);
            if (!roleItem) {
                return res.status(404).json({error: 'Должность не найдена'});
            }
            await roleItem.destroy();
            return res.json({message: 'Роль удалена'});
        } catch (error) {
            console.error('Ошибка при удалении роли:', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
    }


}


module.exports = new RolesController();