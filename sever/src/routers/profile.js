const express = require('express')
const router = express.Router()

const Profile = require('../controllers/Profile')

router.post('/', Profile.info)
router.post('/update', Profile.update)
router.post('/changePassword', Profile.changePassword)

module.exports = router