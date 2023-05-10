const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddeware')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/create',authMiddleware, orderController.createOrder)
router.get('/show',checkRole('ADMIN'), orderController.getAll)
router.get('/show/:id',checkRole('ADMIN'), orderController.getOne)
router.get('/full',checkRole('ADMIN'), orderController.getFullInfo)
router.delete('/delete',checkRole('ADMIN'), orderController.delete)
router.put('/update',checkRole('ADMIN'), orderController.update)


module.exports = router