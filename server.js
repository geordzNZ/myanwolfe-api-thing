const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = 8005

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'myanwolfe-api-thing'

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to MongoDB')
        db = client.db(dbName)
        console.log(`Connected to the ${dbName} database`)
    })




    
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`)
})