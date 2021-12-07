require("dotenv").config()
const connectToDb = require('./configs/db.config')
const express = require ("express")
const mongoose = require("mongoose")

const port = 4000
const app = express()
app.use(express.json())


const authRouter = require("./routes/auth.route")
const reviewRouter = require("./routes/review.route")
const roomRouter = require("./routes/room.route")
const userRouter = require("./routes/user.route")


const API_VERSION = 1


app.use(`/api/version/v${API_VERSION}/auth`, authRouter)
app.use(`/api/version/v${API_VERSION}/review`, reviewRouter)
app.use(`/api/version/v${API_VERSION}/room`, roomRouter)
app.use(`/api/version/v${API_VERSION}/user`, userRouter)

connectToDb
.then( () => 
    app.listen (port, () => console.log(`Listening to port ${port}`) )
)
.catch (err => console.log(err))