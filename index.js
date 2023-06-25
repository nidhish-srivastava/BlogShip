const express  = require('express')
const mongoose  =  require('mongoose')
const app = express()
const dotenv  = require('dotenv')
dotenv.config()
const PostRouter  = require('./routes/PostRoute.js')
const UserRouter  = require('./routes/UserRoute.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(PostRouter)
app.use(UserRouter)
app.use('/uploads',express.static(__dirname + '/uploads'))

const start = async()=>{
    mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to DB");
    app.listen(4000,()=>{
      console.log("Server running at port 4000");  
    })
}

start()