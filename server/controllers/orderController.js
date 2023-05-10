const {Car, Order, User} = require('../models/model')
const errors = require("../errors/errors")
const {where} = require("sequelize");


class orderController{
    async getAll(req,res){
        const orders = await Order.findAll()
        return res.json(orders)
    }

    async getOne(req,res){
        const {id} = req.params
        const orders = await Order.findOne({where: {id}})
        return res.json(orders)
    }

    async getFullInfo(req,res){
        const orderArray=[]

        const orders = await Order.findAll()
        for (const order of orders) {
            const carId = order.dataValues.carId
            const carList = await Car.findByPk(carId)
            const carPrice = carList.dataValues.price
            const carMark = carList.dataValues.mark
            const userId = order.dataValues.userId
            const candidate = await User.findByPk(userId)
            const userName = candidate.dataValues.name
            orderArray.push({carId: carId, car: carMark, name: userName, price: carPrice})
        }
        return res.json(orderArray)
    }



    async createOrder(req,res, next){
        const {mark,rental_period, email, price} = req.body
        const status = 'ok'
        if(!mark || !rental_period|| !email ||!price){
            return next(errors.badRequest("Incorrect input data"))
        }
        const candidate = await User.findOne({where: {email}})
        if(!candidate){
            return next(errors.badRequest(`User with email ${email} not found`))
        }
        const userCar = await Car.findOne({where: {mark}})
        if(!userCar){
            return next(errors.badRequest(`Car ${mark} not found`))
        }
        if(price < userCar.price){
            return res.json({message: 'Not enough money for payment'})
        }else{
            const bill = price - userCar.price
            Car.update({description: 'in use'}, {where: {mark}})
            const order = Order.create({userId:candidate.id,carId:userCar.id, rental_period, status})
            return res.json({message: `Your bill is ${bill}. Order has been placed`})
        }
    }

    async update(req,res, next){
        const {status, pay, passportData} = req.body
        const candidate = await User.findOne({where: {passportData}})
        if(!candidate){
            return next(errors.badRequest(`User with passport data ${passportData} not found`))
        }
        const order = await Order.findOne({where:{userId: candidate.id}})
        if(!order){
            return next(errors.badRequest(`Order not found`))
        }
        const result = await Order.update({status: status},{where: {userId: candidate.id}})
        return res.json({message: `Your pay is ${pay}`})
    }

    async delete(req,res){
        const {id} = req.body
        const carId = await Order.findOne({where:{id}})
        Car.update({description: 'available'}, {where: {id: carId.carId}})
        Order.destroy({ where: {id: id}})
        return res.json({message: `Order with id ${id} has been deleted`})
    }
}

module.exports = new orderController()