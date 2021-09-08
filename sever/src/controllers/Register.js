const User = require('../models/users')

class Register {
    //POST /register
    async register(req, res) {
        const { name, password, email } = req.body

        //validation
        if(!name || !password)
            return res.json({ success: false, message: 'missing user name or password' })
        const user = await User.findOne({ name: name })
        if(user)
            return res.json({ success: false, message: 'user name have been taken' })

        const newUser = new User({ name, password, email })

        //save
        await newUser.save()
        res.json({ success: true, message: 'user saved' })
    }
}

module.exports = new Register