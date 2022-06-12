const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = 8005

//Databse setup
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'myanwolfe-api-thing'

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to MongoDB')
        db = client.db(dbName)
        console.log(`Connected to the ${dbName} database`)
    })

 //Tells our App how to do it's things -- middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// Port set up
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`)
})