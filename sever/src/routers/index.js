const login = require('./login')
const register = require('./register')
const profile = require('./profile')
const dashboard = require('./dashboard')

function route(app) {
    app.use('/login', login)
    app.use('/register', register)
    app.use('/profile', profile)
    app.use('/dashboard', dashboard)
}

module.exports = route
