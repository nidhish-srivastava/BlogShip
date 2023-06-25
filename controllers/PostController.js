const PostModel = require("../models/Post.js")
const fs = require('fs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const createPost = async (req, res) => {
   const { originalname, path } = req.file
   const parts = originalname.split('.');
   const ext = parts[parts.length - 1];
   const newPath = path + '.' + ext;
   fs.renameSync(path, newPath);

   // Now we dont want to create the post without authentication
   const { token } = req.cookies
   jwt.verify(token, process.env.secret, {}, async (err, info) => {
      if (err) throw err

      const { title, descp } = req.body;
      const postDoc = await PostModel.create({
         title,
         descp,
         file: newPath,  // this is for multer(taken from frontend while selecting an image to upload)
         author: info.id  // Taken from jwt
      });
      res.json({ msg: "Working", postDoc });
   })

}


const getMyPosts = async (req, res) => {
   const posts = await PostModel.find().populate('author', ['username']).sort({ createdAt: -1 })
   res.json(posts)
}

const getAllPosts = async(req,res)=>{
   const allPosts = await PostModel.find().sort({createdAt : -1})
   res.json(allPosts)
}

module.exports = { createPost, getMyPosts ,getAllPosts}