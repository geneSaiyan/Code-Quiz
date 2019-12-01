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
var wrongAudio = document.getElementById("wrongAudio");
var overlayText = document.getElementById("overlay-text");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials-input");
var initialSubmit = document.getElementById("btn-initials");
var initialLabel = document.getElementById("initial-label");
var scoreList = document.getElementById("score-list");
var restartButton = document.getElementById("btn-restart");

function playWrong(){
  wrongAudio.play();
}

var quizPlayers = [];

//Initialize score list
init();

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
  var minutes = 0.5;

  clearInterval(interval);
  totalSeconds = minutes * 60;
}

//Function created to display the timer as it counts down
function renderTime() {
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

  if (secondsElapsed >= totalSeconds) {
    stopTimer();
    $("#quiz-container").fadeOut(500);
    overlayText.textContent = "TIME EXPIRED !";
      overlayText.style.color = "gold";
      $("#overlay").fadeIn(1000);
      $("#overlay").fadeOut(2000);
      $("#high-score-container").fadeIn(2000);
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

function subtractTime() {
  secondsElapsed+=10;
}


//Setting questions Object variable 
var questionsObj = {
  questions: [
    { q: 'What HTML tag is used to enter a new line into HTML contents?', options: ['<br>', '<h1>', '<p>', '<hr>'], answer: 1 },
    { q: 'The condition in an if / else statement is enclosed within ____.', options: ['quotes', 'double quotes', 'parentheses', 'curly brackets'], answer: 4 },

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
    else{
      stopTimer();
      $("#quiz-container").fadeOut(1000);
      $("#high-score-container").fadeIn(2000);
      
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
      overlayText.textContent = "CORRECT";
      overlayText.style.color = "green";
      $("#overlay").fadeIn(1000);
      $("#overlay").fadeOut(1000);
    }
    else{
     playWrong();
      overlayText.textContent = "WRONG";
      overlayText.style.color = "red";
      $("#overlay").fadeIn(1000);
      $("#overlay").fadeOut(1000);
      subtractTime();
    }
},
  score: 0,
  scoreCard: function () {
    scoreCard.textContent = (this.score / this.questions.length) * 100 ;
    finalScore.textContent = scoreCard.textContent;
  }
}

function button(ele){
  questionsObj.checkAnswer(ele);
  questionsObj.nextQuestion();
}

startButton.addEventListener("click", function () {
  //fade out the welcome container and fade in the quiz container
  $("#welcome-container").fadeOut(100);
  $("#quiz-container").fadeIn(2000);
  //Start the timer
  startTimer();
  window.onload = questionsObj.load();
});

function renderScoreList() {
  scoreList.innerHTML = "";

  // Render a new p for each player score
  for (var i = 0; i < quizPlayers.length; i++) {
    var player = quizPlayers[i];

    var pTag = document.createElement("p");
    pTag.textContent = player;
    pTag.setAttribute("data-index", i);

    scoreList.appendChild(pTag);
  }
}

function init() {
  // Get stored  from localStorage
  // Parsing the JSON string to an object
  var storedPlayers = JSON.parse(localStorage.getItem("quizPlayers"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedPlayers !== null) {
    quizPlayers = storedPlayers;
  }

  // Render playerlist to the DOM
  renderScoreList();
}

function storeQuizPlayers() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("quizPlayers", JSON.stringify(quizPlayers));
}

initialSubmit.addEventListener("click", function(event) {
  event.preventDefault();

  var inputText = initials.value.trim();

  // Return from function early if submitted todoText is blank
  if (inputText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  quizPlayers.push(inputText);
  initials.value = "";

  // Store updated todos in localStorage, re-render the list
  storeQuizPlayers();
  renderScoreList();
  initials.style.display = "none";
  initialSubmit.style.display = "none";
  initialLabel.style.display = "none";
  restartButton.style.display = "inline";
});

restartButton.addEventListener("click", function(){
  location.reload();
});
