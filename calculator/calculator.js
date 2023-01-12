const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    res.send("The result of " + req.body.num1 + " + " + req.body.num2 + " is: " + (Number(req.body.num1) + Number(req.body.num2)));
});

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    res.send("Your BMI is: " + (Math.round(703 * Number(req.body.weight) / (Number(req.body.height) ** 2) * 100) / 100));
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});