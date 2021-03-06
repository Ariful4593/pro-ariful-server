const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Heloo Ariful ISLAM")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsirj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const clientCollection = client.db("creatingAgency").collection("admin");
    app.post('/contact', (req, res) => {
        const details = req.body;
        clientCollection.insertOne(details)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(details)
    })
    // agencyCollection.insertOne({ name: 'Ariful Islam' })
    // perform actions on the collection object
});

const port = 4000;
app.listen(process.env.PORT || port)