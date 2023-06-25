const express  =  require('express')
const  multer = require('multer')
const { createPost, getAllPosts }  = require('./controller.js')
const upload = multer({dest : 'uploads/'})

  const router = express.Router()

router.post('/create',upload.single('file'),createPost)
router.get('/', getAllPosts)

module.exports = router