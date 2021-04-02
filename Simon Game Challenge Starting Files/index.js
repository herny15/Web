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
        console.log(userClickedPattern);
        comprobarPatron(userChosenColour);
    }
})



function comprobarPatron(userChosenColour){
    var indice = userClickedPattern.length - 1;
    if (userChosenColour === gamePattern[indice]){
        animaSound(userChosenColour);
        if(gamePattern.length === userClickedPattern.length){    
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }else{
        gameOver();
        $("#level-title").text("Press A Key to Start");
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
    play = false;
    level = 0;
    gamePattern = [];
    animaSound("wrong");
    $("body").addClass("game-over").delay(200).queue(function(next){
        $(this).removeClass("game-over");
        next();
    })
}
