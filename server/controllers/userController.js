const errors = require('../errors/errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/model.js')
const secretKey = 'key'

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, secretKey, {expiresIn: '2h'})

}

class userController {
    async registration(req, res, next) {
        const {name, password, email, role, passportData} = req.body
        if (!name || !email || !password || !passportData) {
            return next(errors.badRequest("Incorrect input data"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(errors.badRequest(`User with email ${email} is already exists`))
        }

        const hashPassword = await bcrypt.hash(password, 4)
        const user = await User.create({name, password: hashPassword, email, role, passportData})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})

    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(errors.internal(`User with email ${email} not found`))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(errors.internal('Password is not compare'))
        }
        const token = generateJwt(user.id, user, email, user.role)

        return res.json({token})
    }


    async delete(req, res) {
        const {id} = req.body
        await User.destroy({where: {id: id}})
        return res.json({message: `User with id ${id} has been deleted`})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new userController()