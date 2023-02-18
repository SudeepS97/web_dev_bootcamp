import React from "react"
import ReactDOM from "react-dom"
import Heading from "./components/Heading"
import List from "./components/List"

const name = "Sudeep"
const time = new Date().getHours()
const currYear = new Date().getFullYear()

let ToD;
const customStyle = {
    color: ""
}

if (time < 12) {
    ToD = "Morning"
    customStyle.color = 'red'
} else if (time < 18) {
    ToD = "Afternoon"
    customStyle.color = 'green'
} else {
    ToD = "Night"
    customStyle.color = 'blue'
}

ReactDOM.render(
    <div>
        <Heading />
        <h1 className="heading" style={customStyle}>Good {ToD}!</h1>
        <br></br>
        <List />
        <br></br>
        <p contentEditable='true' spellCheck='false'>Created by {name}</p>
        <p>Copyright {currYear}</p>
    </div>,
    document.getElementById("root")
);