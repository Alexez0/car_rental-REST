const sequelize = require('../db.js')
const {DataTypes, INTEGER} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    passportData: {type: DataTypes.STRING}
})


const Order = sequelize.define('order',{
    rental_period: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING}
})


const Car = sequelize.define('car', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    description:{type: DataTypes.STRING}
})


User.hasMany(Order)
Order.belongsTo(User)


Car.hasMany(Order)
Order.belongsTo(Car)


module.exports = {
    Car,
    User,
    Order
}


