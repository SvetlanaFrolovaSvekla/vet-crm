const Router = require('express')
const router = new Router()

const rolesController = require('../controllers/rolesController')

router.post('/create', rolesController.create) // Для создания
router.get('/list', rolesController.getAll) // Для получения
router.put('/:id', rolesController.update); // Обновление
router.delete('/:id', rolesController.delete); // Удаление

module.exports = router
