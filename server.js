const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = 8005

// Databse setup
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'alien-info-db'

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to MongoDB')
        db = client.db(dbName)
        console.log(`Connected to the ${dbName} database`)
    })

 // Middleware -- Tells our App how to do it's things
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Basic route / CRUD methods
app.get('/', (req, res) => {
    console.log('--Get heard')
    db.collection('alien-info-coll').find().toArray()        
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            res.render('index.ejs', { info: nameList})
            })
        .catch(error => console.log('Get error:',error))
})

app.post('/addOne', (req, res) => {
    console.log('--Post heard')
    db.collection('alien-info-coll').insertOne(
        req.body
    )
        .then(result => {
            console.log(result)
            res.redirect('/')
    })
})

app.post('/updareEntry', (req, res) => {
    
})

app.delete('/deleteEntry', (req, res) => {
    
})





// Port set up
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`)
})