const express =  require('express')
const {login,register,profile,logout} = require('../controllers/UserController.js')
const router = express.Router()

router.get('/profile',profile)
router.post('/logout',logout)
router.post('/login',login)
router.post('/register',register)

module.exports = router

