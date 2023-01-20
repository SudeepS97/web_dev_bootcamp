const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    let city = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e03e78466d49768412e9c1a4896f8a8a&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https:openweathermap.org/img/wn/" + icon + "@2px.png"

            res.write("<h1>The temperature in " + city + " is " + (temp * 1.8 + 32) + " degrees fahrenheit.</p>");
            res.write("<p>" + weatherDescription + "</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server is up and running.");
})