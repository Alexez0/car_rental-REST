const port = 5001
const express = require('express')
const app = express()
const sequelize = require('./db')
const models = require('./models/model.js')
const router = require('./routes/mainRouter')
const cors = require('cors')
const middleware = require('./middleware/errorHandlingMiddleware')


app.use(cors())
app.use(express.json())
app.use("/api",router)
app.use(middleware)


const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync().then(()=>{
            console.log('Connected to database!')})
        app.listen(port, ()=>{
            console.log(`Server has been opened on port ${port}`)
        })
    }catch (e) {
        console.log(e)

    }
}

start()