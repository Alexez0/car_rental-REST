const Router = require('express')
const router = new Router()
const carRouter = require('../routes/carRouter')
const userRouter = require('../routes/userRouter')
const orderRouter = require('../routes/orderRouter')

router.use('/order',orderRouter)
router.use('/user', userRouter)
router.use('/car', carRouter)


module.exports = router