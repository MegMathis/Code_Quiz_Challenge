// When I click the start button

// When I answer a question
// I am presented with another question
// When I answer a question incorrectly
// Time is subtracted from the clock
// When all questions are answered or the timer reaches 0
// game is over
// When the game is over
// I can save my initials and my score

var questions = [
  {
    q: "Commonly used data types DO NOT include:",
    a: "a. Strings",
    b: "b. Booleans",
    c: "c. Alerts",
    d: "d. Numbers",
    correct: "c. Alerts",
  },
  {
    q: "The condition in an if/else statement is enclosed with __________.",
    a: "a. Quotes",
    b: "b. Curly brackets",
    c: "c. Parentheses",
    d: "d. Square brackets",
    correct: "c. Parentheses",
  },
  {
    q: "Arrays in JavaScript can be used to store _____________.",
    a: "a. Numbers and strings",
    b: "b. Other arrays",
    c: "c. Booleans",
    d: "d. All of the above",
    correct: "d. All of the above",
  },
  {
    q: "String values must be encosed within ____________ when being assigned to variables.",
    a: "a. Quotes",
    b: "b. Curly brackets",
    c: "c. Parentheses",
    d: "d. Square brackets",
    correct: "a. Quotes",
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "a. Javascript",
    b: "b. Terminal/Bash",
    c: "c. for loops",
    d: "d. console.log",
    correct: "d. console.log",
  },
];

var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 60;
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

// a timer is presented
function timer() {
  timerEl.textContent = "Time remaining: " + timeLeft + "s";
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
  if (timeleft < 0) {
    timeleft = 0;
  }
  timerEl.textContent = "Time remaining: " + timeLeft + "s";
}

// a timer starts and I am presented with a question
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

  questionContainer.appendChiild(questionHeader);
  questionContainer.appendChild(AnswerA);
  questionContainer.appendChild(AnswerB);
  questionContainer.appendChild(AnswerC);
  questionContainer.appendChild(AnswerD);
};

/// When I answer the question
// I am presented with another question

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickScores = document.getElementById("view-score");

var answerClick = function (event) {
  event.preventDefault();
  var userAnswer = event.target.textContent;
  correctAnswer = questions[currentQuestionIndex].correct;
  console.log("userAnswer", userAnswer);

  //   correct / incorrect
  var answerDetermination = document.querySelector("#answer-determination");
  console.log(correctAnswer);
  if (userAnswer !== correctAnswer) {
    adjustTime(-10);
    answerDetermination.textContent = "Incorrect";
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      endQuizPage();
    } else {
      renderQuestion(questions[currentQuestionIndex]);
    }
    console.log(userAnswer);
  } else if (userAnswer === correctAnswer) {
    currentQuestionIndex++;
    answerDetermination.textContent = "Correct";
    userScore++;
    if (currentQuestionIndex >= questions.length) {
      endQuizPage();
    } else {
      renderQuestion(questions[currentQuestionIndex]);
    }
  }
};

var quiz = function (event) {
  event.preventDefault();
  resetDisplay();
  renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
  questionContainer.innerHTML = "";
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
});

var initials;
function endQuizPage() {
  resetDisplay();
  timerEl.textContent = "";
  clearInterval(quizDuration);
  var endPage = document.createElement("h2");
  questionContainer.appendChild(endPage);

  let blank = doument.querySelector("#answer-determination");
  blank.innerHTML = "";

  endPage.innerHTML =
    "Finished!  Your final score is " +
    userScore +
    ". Enter you initials to save score.";

  var intialBox = document.createElement("input");
  blank.appendChiild(initialBox);

  var submitIntialBtn = document.createElement("button");
  submitIntialBtn.textContent = "Submit";
  blank.appendChiild(submitInitialBtn);

  submitInitialBtn.addEventListener("click", () => {
    let storeInitials = (...input) => {
      let data = JSON.stringify({ name: input[0], score: input[1] });
    };
    storeInitials(initialBox.value, userScore);
  });

  if (initialInput === "") {
    var nullInitial = document.createElement("p");
    nullInitial.textContent = "Please enter your initials";
    return false;
  } else {
    displayMessage("saved", "saved successfully");
  }
  initialBox.reset();
  document.querySelector("input").value = "";

  initialBox.addEventListener("submt", endQuizPage);
}

function renderInitials() {
  submitInitialBtn.addEventListener("click", function (event) {
    event.preventDefault;
  });
}

clickStart.addEventListener("click", quiz);
