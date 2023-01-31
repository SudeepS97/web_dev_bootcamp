const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { MongoClient } = require('mongodb');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri = process.env.MONGO_URI
const client = new MongoClient(uri);
const db = "wikiDB"
const collection = "articles"
client.connect()

app.route("/articles").get(async function (req, res) {
    await client.db(db).collection(collection).find().toArray(function (err, articles) {
        if (err) {
            res.send(err);
        } else {
            res.send(articles);
        }
    })
}).post(async function (req, res) {
    await client.db(db).collection(collection).insertOne({ title: req.body.title, content: req.body.content });
}).delete(async function (req, res) {
    await client.db(db).collection(collection).deleteMany({});
});

app.route("/articles/:title").get(async function (req, res) {
    const reqTitle = req.params.title
    await client.db(db).collection(collection).find({ title: reqTitle }).toArray(function (err, articles) {
        if (err) {
            res.send(err);
        } else {
            res.send(articles);
        }
    })
}).put(async function (req, res) {
    const reqTitle = req.params.title
    client.db(db).collection(collection).updateOne(
        { title: reqTitle },
        { title: req.body.title, content: req.body.content },
        { overwrite: true }
    );
}).patch(async function (req, res) {
    const reqTitle = req.params.title
    client.db(db).collection(collection).updateOne(
        { title: reqTitle },
        { $set: req.body }
    );
}).delete(async function (req, res) {
    const reqTitle = req.params.title
    await client.db(db).collection(collection).deleteOne({ title: reqTitle });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
})