const express = require('express')
const multer = require('multer')
const { createPost,getPosts,myPosts,getAllPosts } = require('../controllers/PostController.js')
const uploadMiddleware = multer({ dest: 'blogImages/' })

const router = express.Router()

router.get('/home',getAllPosts)
router.post('/post', uploadMiddleware.single('file'), createPost)
router.get('/',getPosts)
router.get('/:username',myPosts)

module.exports = router