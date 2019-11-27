//Main container fade in
$("#welcome-container").fadeIn(2000);

//Setting element variables
var startButton = document.getElementById("btnStartQuiz");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

//Setting seconds and interval variables
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

//Function created to format minutes
function getFormattedMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;
  
    var minutesLeft = Math.floor(secondsLeft / 60);
  
    var formattedMinutes;
  
    if (minutesLeft < 10) {
      formattedMinutes = "0" + minutesLeft;
    } else {
      formattedMinutes = minutesLeft;
    }
  
    return formattedMinutes;
  }
  
  //Function created to format seconds
  function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
  
    return formattedSeconds;
  }
  
  //Function created to format setting the timer
  function setTime() {
    var minutes = 5;
  
    clearInterval(interval);
    totalSeconds = minutes * 60;
  }

  //Function created to display the timer as it counts down
  function renderTime() {
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
  
    if (secondsElapsed >= totalSeconds) {
      stopTimer();
    }
  }
  
  //Start timer function
  function startTimer() {
    setTime();
  
    interval = setInterval(function() {
      secondsElapsed++;
      renderTime();
    }, 1000);
  }

  //Stop timer function
  function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
  }

startButton.addEventListener("click", function(){
    //fade out the welcome container and fade in the quiz container
    $("#welcome-container").fadeOut(100);
    $("#quiz-container").fadeIn(2000);

    
    //Start the timer
    startTimer();

});
 