console.log("If you're here, you probably know what you're doing");
console.log("Leaving the answers to the sequence logged down for you!");

let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on("keydown", function () {
  // checks that the game has started
  if (started === false) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id"); // gets the id of the button
  userClickedPattern.push(userChosenColour); // will push the sequence of button user clicks
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); // gets the index of the last clicked button
  //console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // checks that the colors match
    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) { // checks that the user has pushed the exact number of buttons
      setTimeout(function() {
      nextSequence();
    }, 1000); // creates a new sequence if the length is equal
    }
  } else {
    let gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200); // adds and remove the game over animation

    $("h1").html("Game Over, Press Any Key to Restart")
    startOver();
  }
}

const startOver = () => {
  level = 0; // resets the game level
  gamePattern = []; // clears the game pattern array and starts again when game restarts
  //console.log(gamePattern);
  started = false;
}

function nextSequence() {
  userClickedPattern = []; // resets the array so the user has to follow the exact sequence from start

  // increments the players level and displays it
  level++;
  $("h1").html("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber]; // chooses random btn color
  gamePattern.push(randomChosenColour);
  console.log(gamePattern)

  // Sets animation for the sequence
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  // Plays the sound of each btn clicked
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function animatePress(currentColour) {
  // Sets animation for when a btn is clicked
  $("#" + currentColour).addClass("pressed");
  setTimeout(()=> {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
