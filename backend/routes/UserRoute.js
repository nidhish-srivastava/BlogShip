const express =  require('express')
const {login,register,logout} = require('../controllers/UserController.js')

const router = express.Router()

router.post('/logout',logout)
router.post('/login',login)
router.post('/register',register)

module.exports = router

