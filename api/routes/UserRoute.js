const express =  require('express')
const {login,register,profile,logout} = require('../controllers/UserController.js')
const router = express.Router()

router.post('/logout',logout)
router.post('/login',login)
router.post('/register',register)
router.get('/profile',profile)

module.exports = router

