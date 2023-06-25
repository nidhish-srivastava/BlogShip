const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username : String,
    password : String
})


const UserModel = mongoose.model("User",UserSchema)