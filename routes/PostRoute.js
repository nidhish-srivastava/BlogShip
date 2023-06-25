const express = require('express')
const multer = require('multer')
const { createPost, getMyPosts,getAllPosts } = require('../controllers/PostController.js')
const uploadMiddleware = multer({ dest: 'uploads/' })

const router = express.Router()

router.post('/post', uploadMiddleware.single('file'), createPost)
router.get('/', getMyPosts)
router.get('/all',getAllPosts)

module.exports = router