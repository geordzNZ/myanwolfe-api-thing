const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = 8005

// Databse setup
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'alien-info-db',
    dbColl = 'alien-info-coll'


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


// Basic routes for CRUD methods
app.get('/', (req, res) => {
    console.log('--Get heard')
    db.collection(dbColl).find().toArray()        
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            res.render('index.ejs', { info: nameList})
            })
        .catch(error => console.log('Get error:',error))
})

app.post('/addEntry', (req, res) => {
    console.log('--Post heard')
    db.collection(dbColl).insertOne(
        req.body
    )
        .then(result => {
            console.log(result)
            res.redirect('/')
    })
})

app.put('/updateEntry', (req, res) => {
    console.log('--Put heard')
    console.log(req.body)
    
    Object.keys(req.body).forEach(key => {
        if (req.body[key] == null || req.body[key] == undefined || req.body[key] == "") {
            delete req.body[key]
        }
    })
    console.log(req.body)
    
    db.collection(dbColl).findOneAndUpdate(
        { name: req.body.name },
        {
            $set: req.body
        }
    )
        .then(result => {
            console.log(result)
            res.json('UPDATED')
    }) .catch (err => console.log(err))
})

app.delete('/deleteEntry', (req, res) => {
    console.log('--Delete heard')
    console.log(req.body)
    db.collection(dbColl).deleteOne(
        { name: req.body.name }
    )
        .then(result => {
            console.log(result)
            res.json('DELETED')
        })
    .catch(error => console.error(error))
})





// Port set up
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`)
})