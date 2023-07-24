const mongoose  = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: String,
    descp: String,
    file : String,
    author : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    mainContent : String
},{
    timestamps : true
})

const PostModel = mongoose.model("Post",PostSchema)

module.exports = PostModel