var buttonColours = ["red", "blue", "green", "yellow"];
var play = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];


$(document).keydown(function(event){
    console.log(event.key);
    if(!play){
        nextSequence();
        play=true;
    }
});

$(".btn").click(function(event){
    if(play){
        var userChosenColour = event.target.id
        userClickedPattern.push(userChosenColour);
        animaSound(userChosenColour);
        console.log(userClickedPattern);
        comprobarPatron();
    }
})



function comprobarPatron(){
    var indice = userClickedPattern.length - 1;
    if (userClickedPattern[indice] === gamePattern[indice]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }else{
        gameOver();
        $("#level-title").text("Press A Key to Start");
        play = false;
    }

}

function animaSound(color){
    // $("#" + color).fadeOut(100).fadeIn(100);
    animatePress(color);
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    animaSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text("Level "+ level);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    })

}
function gameOver(){
    level = 0;
    gamePattern = [];
    $("body").addClass("game-over").delay(100).queue(function(next){
        $(this).removeClass("game-over");
        next();
    })
}
