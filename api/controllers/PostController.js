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

const getPosts = async (req, res) => {
   const posts = await PostModel.find().populate('author', ['username']).sort({ createdAt: -1 })
   res.json(posts)
}

const myPosts = async(req,res) =>{
   const username = req.params.username
   const myPosts = await PostModel.find({}).populate({
      path : 'author',
      match : {username : username}
   }).exec()
   const filteredPosts = myPosts.filter(post => post.author !== null);
   res.json(filteredPosts)
}

const getSinglePost = async(req,res)=>{
      const {id} = req.params
      console.log(id);
      const getSinglePost =  await PostModel.find(id).populate('author',['username'])
      res.json(getSinglePost)
}


module.exports = { createPost, getPosts,myPosts,getSinglePost}