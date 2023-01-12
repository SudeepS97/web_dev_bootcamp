const express = require("express")

const app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello World</h1>");
    console.log(req);
});

app.get("/contact", function (req, res) {
    res.send("Contact me @ adlfkjasdlfkj.com")
});

app.get("/about", function (req, res) {
    res.send("about me...")
});

app.get("/hobbies", function (req, res) {
    res.send("<ul><li>item1</li><li>item_2</li></ul>")
});

app.listen(3000, function () {
    console.log("Server started on port 3000")
});

