//Main container fade in
$("#welcome-container").fadeIn(2000);

//Setting element variables
var startButton = document.getElementById("btnStartQuiz");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var questionSelection = document.getElementById("question");
var scoreCard = document.getElementById('score');
var option1 = document.getElementById("op1");
var option2 = document.getElementById("op2");
var option3 = document.getElementById("op3");
var option4 = document.getElementById("op4");
var overlayText = document.getElementById("overlay-text");

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

  interval = setInterval(function () {
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

//Setting questions Object variable 
var questionsObj = {
  questions: [
    { q: 'What HTML tag is used to enter a new line into HTML contents?', options: ['<br>', '<h1>', '<p>', '<hr>'], answer: 1 },
    { q: 'What HTML tag is used for the largest heading?', options: ['<h8>', '<h2>', '<h1>', '<h4>'], answer: 3 },

    { q: 'Inside which HTML element do we put the JavaScript?', options: ['<scripting>', '<script>', '<js>', '<javascript>'], answer: 2},

    { q: 'How do you write "Hello World" in an alert box?', options: ['msg("Hello World")', 'alert("Hello World")', 'msgBox("Hello World")', 'alertBox("Hello World")'], answer: 2}

  ],
  index: 0,
  load: function () {
    if (this.index <= this.questions.length -1) {
      questionSelection.textContent = this.index + 1 + ". " + this.questions[this.index].q;
      option1.textContent = this.questions[this.index].options[0];
      option2.textContent = this.questions[this.index].options[1];
      option3.textContent = this.questions[this.index].options[2];
      option4.textContent = this.questions[this.index].options[3];
      this.scoreCard();
    }
    else {

      //Do something after quiz is over

    }
  },
  nextQuestion: function () {
    this.index++;
    this.load();
  },
  checkAnswer:function(ele){
                 
    var id=ele.id.split('');
    
    if(id[id.length-1]==this.questions[this.index].answer){
      this.score++;
      this.scoreCard();
      $("#overlay").fadeIn(1000);
      $("#overlay").fadeOut(1000);
    }
    else{

      $("#overlay").fadeIn(1000);
      $("#overlay").fadeOut(1000);
    }
},
  score: 0,
  scoreCard: function () {
    scoreCard.textContent = this.questions.length + "/" + this.score;
  }



}

function button(ele){
  questionsObj.checkAnswer(ele);
  questionsObj.nextQuestion();
}


startButton.addEventListener("click", function () {
  // document.getElementById("overlay").style.display = "block";
  //fade out the welcome container and fade in the quiz container
  $("#welcome-container").fadeOut(100);
  $("#quiz-container").fadeIn(2000);
  // $("#overlay").fadeOut(2000);

  //Start the timer
  startTimer();

  
  window.onload = questionsObj.load();


 

  

});

