const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController')
const authMiddleware = require('../middleware/authMiddeware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create',checkRole('ADMIN'), carController.create)
router.get('/show', carController.showAll)
router.get('/show/:id',checkRole('ADMIN'), carController.showOne)
router.delete('/delete',checkRole('ADMIN'), carController.delete)
router.put('/update',checkRole('ADMIN'), carController.update)



module.exports = router