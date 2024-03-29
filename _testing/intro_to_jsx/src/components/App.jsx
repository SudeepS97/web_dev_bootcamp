import React from "react"
import ReactDOM from "react-dom"
import Heading from "./Heading"
import List from "./List"

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

function App() {
    return (
        <div>
            <Heading />
            <h1 className="heading" style={customStyle}>Good {ToD}!</h1>
            <br></br>
            <List />
            <br></br>
            <p contentEditable='true' spellCheck='false'>Created by {name}</p>
            <p>Copyright {currYear}</p>
        </div>)
};

export default App