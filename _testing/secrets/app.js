require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { MongoClient } = require('mongodb');
const db_conn = require(__dirname + "/db_conn.js");
const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    const saltedPassword = password + pepper;
    const hash = await bcrypt.hash(saltedPassword, saltRounds);
    return hash;
};
const comparePassword = async (password, hash) => {
    const saltedPassword = password + pepper;
    const match = await bcrypt.compare(saltedPassword, hash);
    return match;
};

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
const pepper = process.env.PASSWORD_PEPPER;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const uri = process.env.MONGO_URI
const client = new MongoClient(uri);
const db_name = "secrets"
const collection_name = "users"
client.connect()

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post("/login", async function (req, res) {
    const creds = {
        email: req.body.username
    };
    const returnedUsers = await db_conn.findItemsByCreds(client, db_name, collection_name, creds)
    if (returnedUsers) {
        const match = await comparePassword(req.body.password, returnedUsers[0].password);
        if (match) {
            res.render("secrets");
            console.log("Login successful.");
        } else {
            res.render("login");
            console.log("Login failed, incorrect password.");
        }
    } else {
        res.render("login");
        console.log("Login failed, account not found.");
    };
});

app.post("/register", async function (req, res) {
    const hash = await hashPassword(req.body.password);
    const newUser = {
        email: req.body.username,
        password: hash
    };
    const result = await db_conn.createItem(client, db_name, collection_name, newUser);
    res.render("secrets")
})

app.listen(port, () => console.log(`Server started at port: ${port}`));