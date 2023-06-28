const PostModel = require("../models/Post.js")
const fs = require('fs')
const jwt = require('jsonwebtoken');

const secret = "sdiasggdaksdkas"
const createPost = async (req, res) => {
   const { originalname, path } = req.file
   const parts = originalname.split('.');
   const ext = parts[parts.length - 1];
   const newPath = path + '.' + ext;
   fs.renameSync(path, newPath);

   // Now we dont want to create the post without authentication
   const { token } = req.cookies
   jwt.verify(token, secret, {}, async (err, info) => {
      if (err) res.status(500).json({ error: "Internal server error" })
      try {
         const { title, descp } = req.body;
         const postDoc = await PostModel.create({
            title,
            descp,
            file: newPath,  // this is for multer(taken from frontend while selecting an image to upload)
            author: info.id  // Taken from jwt
         });
         res.json({ msg: "Working", postDoc });
      }

      catch (error) {
         res.status(400).json("error")
      }
   })

}

const getPosts = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('author', ['username']).sort({ createdAt: -1 })
      res.json(posts)
   } catch (error) {
      res.status(500).json(error)
      
   }
}

// const myPosts = async (req, res) => {
//    try {
//       const username = req.params.username
//       const myPosts = await PostModel.find({}).populate({
//          path: 'author',
//          match: { username: username }
//       }).exec()
//       const filteredPosts = myPosts.filter(post => post.author !== null);
//       res.json(filteredPosts)
//    } catch (error) {
//       res.status(500).json("Server error")      
//    }
// }


module.exports = { createPost, getPosts, myPosts }