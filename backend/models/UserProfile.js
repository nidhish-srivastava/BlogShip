const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
  username : String,
  dp : String,
  bio : String,
  users : []
})

const UserProfileModel = mongoose.model('UserProfile',UserProfileSchema)

module.exports = UserProfileModel