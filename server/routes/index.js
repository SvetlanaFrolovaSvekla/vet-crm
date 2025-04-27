const Router = require('express') // Импортирую роутер
const router = new Router() // Создаю объект роутера

const rolesRouter = require('./rolesRouter')
const usersRouter = require('./usersRouter')
const authorizationRouter = require('./authorizationRouter')

router.use('/roles', rolesRouter)
router.use('/users', usersRouter)
router.use('/authorization', authorizationRouter)

// Экспорирую роутер
module.exports = router