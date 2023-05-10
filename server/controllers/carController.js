const {Car, Order, User} = require('../models/model')
const errors = require("../errors/errors")

class carController{
    async create(req,res){
        const {mark, price, description } = req.body
        const car = await Car.create({mark, price,description})
        return res.json(car)
    }

    async showAll(req,res){
        const cars = await Car.findAll()
        return res.json(cars)
    }
    async showOne(req,res) {
        const {id} = req.params
        const cars = await Car.findOne({where: {id}})
        return res.json(cars)
    }


    async delete(req, res){
        const {id} = req.body
        Car.destroy({ where: {id: id}})
        return res.json({message: `Car with id ${id} has been deleted`})
    }



    async update(req,res){
        const {mark, price, description } = req.body
        const result = Car.update({price: price, description:description},{where: {mark: mark}})
        return res.json(result)
    }

}

module.exports = new carController()