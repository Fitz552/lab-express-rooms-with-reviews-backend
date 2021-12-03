const mongoose = require("mongoose")

const MONGODB_URI = "mongodb://127.0.0.1:27017/rooms"

const connectToDb = 
    mongoose.connect(MONGODB_URI)
    .then( response => console.log(response))
    .catch(err => console.log(err))


module.exports = connectToDb