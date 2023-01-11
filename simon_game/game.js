var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStatus = 0;

function nextSequence() {
    level++;
    $("h1").html("Level " + level)

    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    console.log("Random Color: " + randomChosenColor);
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);

    console.log("Updated game pattern: " + gamePattern);
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100)
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(clickIdx) {
    if (clickIdx == gamePattern.length) {
        if (gamePattern.toString() == userClickedPattern.toString()) {
            console.log("Level passed!");
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
        else {
            $("h1").html("You Lost at Level " + level);
            userClickedPattern = [];
            gamePattern = [];
            gameStatus = 0;
            level = 0;
        }
    }

}

$("div.btn").click(function () {
    var userChosenColor = this.id;

    console.log("User chosen color: " + userChosenColor);
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    console.log("Current user pattern: " + userClickedPattern);

    checkAnswer(userClickedPattern.length);
})

$("html").keypress(function () {
    if (gameStatus == 0) {
        gameStatus = 1;
        nextSequence();
    }
})