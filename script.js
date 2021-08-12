var questions = [{
    q: "Commonly used data types DO NOT include:",
    a: "Strings",
    b: "Booleans",
    c: "Alerts",
    d: "Numbers",
    correct: "Alerts",
},
{
    q: "The antecedents/consequents in an if/else statement is enclosed with ____.",
    a: "Quotes",
    b: "Curly brackets",
    c: "Parentheses",
    d: "Square brackets",
    correct: "Parentheses",
},
{
    q: "Arrays in JavaScript can be used to store ____.",
    a: "Numbers and strings",
    b: "Other arrays",
    c: "Booleans",
    d: "All of the above",
    correct: "All of the above",
},
{
    q: "String values must be encosed within ____ when being assigned to variables.",
    a: "Quotes",
    b: "Curly brackets",
    c: "Parentheses",
    d: "Square brackets",
    correct: "Quotes",
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "Javascript",
    b: "Terminal/Bash",
    c: "for loops",
    d: "console.log",
    correct: "console.log",
},
{
    q: "What is the correct syntax for referring to an external script called 'code.js'?",
    a: "<script src='code.js'>",
    b: "<script href='code.js'>",
    c: "<script ref='code.js'>",
    d: "<script name='code.js'>",
    correct: "<script src='code.js'>",
}];

var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 60;
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "seconds";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
}
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time remaining: " + timeLeft + "seconds";
}

clickStart.onclick = timer;
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    // determine if answer is wrong or right
    var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answerDetermination.textContent = "sorry, that is incorrect :(";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Good work!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    questionContainer.innerHTML="";
    document.querySelector("#intro-page").style.display = "none";
}
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + " " + score;
}
clickViewScores.addEventListener("click", () => {
    highScores();
})

var initials; 
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";

    endPage.innerHTML = "All done! Your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
        // rest variable
        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuizPage);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

clickStart.addEventListener('click', quiz);