const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const authorizationController = require('../controllers/authorizationController')

router.post('/registration', authorizationController.registration)
router.post('/login', authorizationController.login)
router.get('/auth', authMiddleware, authorizationController.check)
// Маршрут для активации аккаунта
router.get('/auth/activate/:link', authorizationController.activate);

router.post('/forgot-password', authorizationController.forgotPassword);
router.post('/reset-password/:token', authorizationController.resetPassword);
router.post('/change-password', authMiddleware, authorizationController.changePassword);

module.exports = router
