const mongoose = require('mongoose')
const { Schema } = mongoose

const user = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, default: 'none' }
}, {
    timestamps: true,
})

module.exports = mongoose.model('users', user)