require("dotenv").config()
const connectToDb = require('./configs/db.config')
const express = require ("express")
const mongoose = require("mongoose")

const port = 3000
const app = express()
app.use(express.json())



connectToDb.
then( () => 
    app.listen (port, () => console.log(`Listening to port ${3000}`) )
)
.catch (err => console.log(err))