const express = require('express')
const router = express.Router()
const Register = require('../controllers/Register')

router.post('/', Register.register)

module.exports = router