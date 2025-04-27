const Router = require('express')
const router = new Router()

const usersController = require('../controllers/usersController')

router.post('/create', usersController.create) // Для создания
router.get('/list', usersController.getAll) // Для получения

router.get('/:id', usersController.getById) // Для получения
//router.put('/:id', usersController.update); // Обновление

router.put('/email/:email', usersController.updateByEmail);// Обновление

router.delete('/:id', usersController.delete); // Удаление


module.exports = router
