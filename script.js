var score = 0;
var highScore = 0;
var timer;
var timeRemaining = 60;
var answer

function generateRandomQuestion() {
    var number1 = Math.floor(Math.random() * 10); // Random number between 0 and 9
    var number2 = Math.floor(Math.random() * 10); // Random number between 0 and 9
    var operator = Math.random() < 0.5 ? "+" : "-"; // Randomly choose addition or subtraction

    var question;
    var answer;
    if (operator === "+") {
        question = "What is " + number1 + " + " + number2 + "?";
        answer = number1 + number2;
    } else {
        question = "What is " + number1 + " - " + number2 + "?";
        answer = number1 - number2;
    }

    return {
        question: question,
        answer: answer
    };
}

function startGame() {
    score = 0;
    timeRemaining = 60;
    updateScore();
    startTimer();
    loadQuestion();
}

function updateScore() {
    var scoreContainer = document.getElementById("score");
    var highScoreContainer = document.getElementById("high-score");
    scoreContainer.textContent = score;
    highScoreContainer.textContent = highScore;
}

function startTimer() {
    var timerContainer = document.getElementById("timer");
    timerContainer.textContent = timeRemaining + "s";

    timer = setInterval(function() {
        timeRemaining--;
        timerContainer.textContent = timeRemaining + "s";

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function loadQuestion() {
    var questionContainer = document.getElementById("question");
    var choicesContainer = document.getElementById("choices");

    var currentQuestion = generateRandomQuestion();
    answer = currentQuestion.answer
    questionContainer.textContent = currentQuestion.question;

    var choices = generateChoices(currentQuestion.answer);
    for (var i = 0; i < choices.length; i++) {
        choicesContainer.children[i].firstChild.textContent = choices[i];
    }
}

function generateChoices(answer) {
    var choices = [];
    choices.push(answer.toString());

    while (choices.length < 3) {
        var randomChoice = Math.floor(Math.random() * 19) - 9; // Random number between -9 and 9
        if (!choices.includes(randomChoice.toString())) {
            choices.push(randomChoice.toString());
        }
    }

    return shuffleArray(choices);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function checkAnswer(selectedAnswer) {
    var resultContainer = document.getElementById("result");
    var choicesContainer = document.getElementById("choices");
    var selected_answer = choicesContainer.children[selectedAnswer].firstChild.textContent;
    // console.log(selected_answer);
    // console.log(choicesContainer.children[selectedAnswer].firstChild.textContent)
    // console.log(answer)
    if (timeRemaining > 0) {
       if (answer === parseInt(selected_answer)) {
           score++;
           resultContainer.textContent = "Correct!";
       } else {
           if (score > 0){
               score--;
           }
           resultContainer.textContent = "Incorrect!";
       }
       updateScore();
       loadQuestion();
    }
}

function endGame() {
    var resultContainer = document.getElementById("result");
    resultContainer.textContent = "Time's up! Game over!";

    if (score > highScore) {
        highScore = score;
    }

    updateScore();
    clearInterval(timer);
}

document.getElementById("start-button").addEventListener("click", function() {
    startGame();
});

