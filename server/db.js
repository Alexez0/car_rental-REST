const {Sequelize} = require("sequelize");
module.exports = new Sequelize(
    "test", "root", "root",{
        dialect: "mysql",
        host: "localhost"
    }
)



