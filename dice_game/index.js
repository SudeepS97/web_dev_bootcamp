var randomNumber1 = Math.ceil(Math.random() * 6)
document.querySelectorAll("img")[0].setAttribute("src", "images/dice" + randomNumber1 + ".png")

var randomNumber2 = Math.ceil(Math.random() * 6)
document.querySelectorAll("img")[1].setAttribute("src", "images/dice" + randomNumber2 + ".png")

if (randomNumber1 > randomNumber2) {
    document.querySelectorAll("h1")[0].textContent = "Player 1 Wins!"
}
else if (randomNumber1 < randomNumber2) {
    document.querySelectorAll("h1")[0].textContent = "Player 2 Wins!"
}
else {
    document.querySelectorAll("h1")[0].textContent = "Draw!"
}