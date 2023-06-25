const express = require('express')
const multer = require('multer')
const { createPost,getPosts,myPosts,getSinglePost } = require('../controllers/PostController.js')
const uploadMiddleware = multer({ dest: 'uploads/' })

const router = express.Router()

router.post('/post', uploadMiddleware.single('file'), createPost)
router.get('/',getPosts)
router.get('/:username',myPosts)

module.exports = router