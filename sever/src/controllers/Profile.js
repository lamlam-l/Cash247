const Users = require('../models/users')

class Profile {
    //POST /profile
    async info(req, res) {
        const user = await Users.findOne({ name: req.body.name })
        if(!user)
            return res.json({ success: false, message: 'user not found' })
        const { name, email, createdAt, updatedAt } = user
        res.json({success: true, user: { name, email, createdAt, updatedAt }})
    }

    //POST /profile/update
    async update(req, res) {
        const newName = await Users.findOne({ name: req.body.newUser.name })
        if(newName && req.body.name != req.body.newUser.name) {
            return res.json({ success: false, message: 'user name have been taken' })
        }
        if(req.body.newUser.name == '') {
            return res.json({ success: false, message: 'empty username' })
        }
        const currentUser = await Users.findOne({ name: req.body.name })
        try {
            await Users.findOneAndUpdate({ name: req.body.name }, {
                name: req.body.newUser.name === undefined ? currentUser.name : req.body.newUser.name,
                email: req.body.newUser.email === undefined ? currentUser.email : req.body.newUser.email
            })
            return res.json({ success: true, message: 'info updated!' })   
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }

    //POST /profile/changePassword
    async changePassword(req, res) {
        const { name, newPassword } = req.body
        const user = await Users.findOne({ name })
        if(!user)
            return res.json({ success: false, message: 'user not found' })
        if(newPassword == '')
            return res.json({ success: false, message: 'new password is empty' })
        if(req.body.currentPassword !== user.password) {
            return res.json({ success: false, message: 'wrong password'})
        }
        try {
            await Users.findOneAndUpdate({ name }, { password: newPassword })
            res.json({ success: true, message: 'password updated!' })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
}

module.exports = new Profile
