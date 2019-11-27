//Main container fade in
$("#welcome-container").fadeIn(2000);

var startButton = document.getElementById("btnStartQuiz");

startButton.addEventListener("click", function(){
    $("#welcome-container").fadeOut(100);
    $("#quiz-container").fadeIn(2000);
    $("#timer-container").fadeIn(2000);




});
 