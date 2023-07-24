const express  = require('express')
const mongoose  =  require('mongoose')
const app = express()
const dotenv  = require('dotenv')
dotenv.config()
const PostRouter  = require('./routes/PostRoute.js')
const UserRouter  = require('./routes/UserRoute.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const UserProfileModel = require('./models/UserProfile.js')
// const cloudinary = require('cloudinary').v2 ;


app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json())
app.use(cookieParser())
app.use('/blogImages',express.static(__dirname + '/blogImages'))

// cloudinary.config({ 
//   cloud_name: process.env.cloud_name, 
//   api_key: process.env.api_key, 
//   api_secret: process.env.api_secret
// });

const start = async()=>{
  mongoose.connect(process.env.MONGO_DB_URI)
  console.log("Connected to DB");
  app.listen(4000,()=>{
    console.log("Server running at port 4000");  
  })
}

start()

app.use(UserRouter)
app.use(PostRouter)
app.use(UserProfileModel)