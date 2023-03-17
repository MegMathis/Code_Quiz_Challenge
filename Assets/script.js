// set up docs variables
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
    q: "String values must be enclosed within ____________ when being assigned to variables.",
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
var count = 60;
var h2 = document.querySelector("h2");
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

// timer starts when I click "start quiz"
function startCountDown() {
  var timer = setInterval(function () {
    count--;
    h2.innerText = "Time Remaining: " + count;
    if (count === 0) {
      clearInterval(timer);
      endQuizPage();
    }
  }, 1000);
}

// Questions are rendered
clickStart.onclick = startCountDown;
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
};

// Correct or Incorrect
var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function (event) {
  event.preventDefault();
  var userAnswer = event.target.textContent;
  correctAnswer = questions[currentQuestionIndex].correct;
  //   console.log("userAnswer", userAnswer);

  var answerDetermination = document.querySelector("#answer-determination");
  //   console.log(correctAnswer);
  if (userAnswer !== correctAnswer) {
    count -= 10;
    answerDetermination.textContent = "Incorrect";
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      endQuizPage();
    } else {
      renderQuestion(questions[currentQuestionIndex]);
    }
    // console.log(userAnswer);
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

// Scoring
var quiz = function (event) {
  event.preventDefault();
  resetDisplay();
  renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
  questionContainer.innerHTML = "";
  document.querySelector("#intro-page").style.display = "none";
}

// High Score
function highScores() {
  let data = localStorage.getItem("initials");
  let getData = JSON.parse(data);
  let name = getData.name;
  let score = getData.score;
  questionContainer.innerHTML = "";
  questionContainer.innerHTML = name + " " + score;
}

clickViewScores.addEventListener("click", () => {
  highScores();
});

// entering initials
var initials;
function endQuizPage() {
  resetDisplay();
  timerEl.textContent = "";
  clearInterval(quizDuration);
  var endPage = document.createElement("h2");
  questionContainer.appendChild(endPage);

  let blank = document.querySelector("#answer-determination");
  blank.innerHTML = "";

  endPage.innerHTML =
    "Finished!  Your final score is " +
    userScore +
    ". Enter you initials to save score.";

  var initialBox = document.createElement("input");
  blank.appendChild(initialBox);

  var submitInitialBtn = document.createElement("button");
  submitInitialBtn.textContent = "Submit";
  blank.appendChild(submitInitialBtn);

  submitInitialBtn.addEventListener("click", () => {
    if (initialBox.value.length === 0) return alert("Please enter initials");
    let storeInitials = (...input) => {
      let data = JSON.stringify({ name: input[0], score: input[1] });
      localStorage.setItem("initials", data);
    };
    storeInitials(initialBox.value, userScore);
    var playAgain = document.createElement("button");
    playAgain.textContent = "Play Again";
    blank.appendChild(playAgain);

    playAgain.addEventListener("click", () => {
      location.reload();
    });
  });

  document.querySelector("input").value = "";

  initialBox.addEventListener("submt", endQuizPage);
}

function renderInitials() {
  submitInitialBtn.addEventListener("click", function (event) {
    event.preventDefault;
  });
}

clickStart.addEventListener("click", quiz);
