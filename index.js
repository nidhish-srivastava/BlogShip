const express  = require('express')
const mongoose  =  require('mongoose')
const app = express()
const dotenv  = require('dotenv')
dotenv.config()
const router  = require('./route.js')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(router)
app.use('/uploads',express.static(__dirname + '/uploads'))

const start = async()=>{
    mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to DB");
    app.listen(4000,()=>{
      console.log("Server running at port 4000");  
    })
}

start()