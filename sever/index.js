const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

const mongoose = require('mongoose')
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://lam:lam@cluster0.0raph.mongodb.net/money_management?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        })
        console.log('database connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectToDatabase()

const cors = require('cors')
app.use(cors())

const route = require('./src/routers/index')
route(app)

app.listen(process.env.PORT || 5000, () => { })