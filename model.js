const mongoose  = require("mongoose")

const Schema = mongoose.Schema({
    title: String,
    descp: String,
    file : String
},{
    timestamps : true
})

const Model = mongoose.model("Post",Schema)

module.exports = Model