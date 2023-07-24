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
         const { title, descp,mainContent } = req.body;
         const postDoc = await PostModel.create({
            title,
            descp,
            file: newPath,  // this is for multer(taken from frontend while selecting an image to upload)
            author: info.id,  // Taken from jwt
            mainContent
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

const myPosts = async (req, res) => {
   try {
      const username = req.params.username
      const myPosts = await PostModel.find({}).populate({
         path: 'author',
         match: { username: username }
      }).exec()
      const filteredPosts = myPosts.filter(post => post.author !== null);
      res.json(filteredPosts)
   } catch (error) {
      res.status(500).json("Server error")      
   }
}


// IN this there is no reference involved,so we wont be getting the userId of who posted
const getAllPosts = async(req,res)=>{
   try {
      const getAll = await PostModel.find({})
      res.status(200).json(getAll)
   } catch (error) {
      res.status(500).json(error)
   }
}



module.exports = { createPost, getPosts, myPosts,getAllPosts }