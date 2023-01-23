const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const tasks = [];
const workTasks = [];
weekday = date.getDate();

app.get("/", function (req, res) {

    console.log(tasks);
    res.render("list", { listTitle: "To Do List", kindOfDay: weekday, tasks: tasks });
});

app.post("/", function (req, res) {
    if (req.body.list == "Work To Do List") {
        task = req.body.newTask;
        workTasks.push(task);
        res.redirect("/work");
    } else {
        task = req.body.newTask;
        tasks.push(task);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work To Do List", kindOfDay: weekday, tasks: workTasks });
});

app.post("/work", function (req, res) {
    task = req.body.newTask;
    workTasks.push(task);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});