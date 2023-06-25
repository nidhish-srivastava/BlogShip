const PostModel = require("../models/Post.js")
const fs = require('fs')

const createPost = async(req,res)=>{
   try {
     const {originalname,path} = req.file
     const parts = originalname.split('.');
     const ext = parts[parts.length - 1];
     const newPath = path+'.'+ext;
     fs.renameSync(path,newPath);
     const {title,descp} = req.body;
     const postDoc = await PostModel.create({
        title,
        descp,
        file: newPath,
      });
      res.json({msg : "Working",postDoc});
   } catch (error) {
    res.status(500).json("Gand ft gyi bc")
   }
}

const getAllPosts = async(req,res)=>{
     const data = await PostModel.find().sort({createdAt : -1})
     res.send(data)
}

module.exports = {createPost,getAllPosts}