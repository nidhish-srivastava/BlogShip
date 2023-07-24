const express =  require('express')
const {profile} = require('../controllers/UserProfileController.js')

const router = express.Router()

router.get('/profile',profile)

module.exports = router

