const User = require('../models/users')

class Login {
    async login(req, res) {
        const { name, password } = req.body
        const user = await User.findOne({ name })
        if (!user)
            return res.json({ success: false, message: "incorrect username or password" })
        if (password !== user.password)
            return res.json({ success: false, message: "incorrect username or password" })
        return res.json({ success: true })
    }
}

module.exports = new Login