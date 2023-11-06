//define an array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Initialize empty arrays for the game pattern and the user's clicked pattern
var started = false;
var level = 0;

// Listen for a key press event on the document
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level); // If the game hasn't started, update the level title and start the game
    nextSequence();
    started = true;
  }
});

// Listen for a click event on any button with the "btn" class
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // Get the color of the clicked button
  userClickedPattern.push(userChosenColour); // Add the clicked color to the user's pattern

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Check the user's answer at the current level
function checkAnswer(currentLevel) {
 // If the answer is correct, check if the user has completed the pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver(); // Reset the game to its initial state
    }
}

// Generate the next sequence for the game
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Animate a button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play a sound based on a given name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset the game to its initial state
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}