const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const question = document.getElementById("question");
const options = document.getElementById("options");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const timerDisplay = document.getElementById("timerDisplay");

const totalQuestions = document.getElementById("totalQuestions");
const correctAnswers = document.getElementById("correctAnswers");
const wrongAnswers = document.getElementById("wrongAnswers");
const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const performanceMessage = document.getElementById("performanceMessage");
const highScore = document.getElementById("highScore");

// QUIZ QUESTIONS

const quizData = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },

  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "background", "color", "text-color"],
    answer: 2,
  },

  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "const", "let", "static"],
    answer: 1,
  },

  {
    question: "Which method selects an element by ID?",
    options: [
      "getElementsByClassName()",
      "querySelectorAll()",
      "getElementById()",
      "querySelector()",
    ],
    answer: 2,
  },

  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "#", "//", "**"],
    answer: 2,
  },

  {
    question: "Which HTML tag is used for inserting an image?",
    options: ["<picture>", "<img>", "<image>", "<src>"],
    answer: 1,
  },

  {
    question: "Which CSS layout system is one-dimensional?",
    options: ["Grid", "Flexbox", "Table", "Float"],
    answer: 1,
  },

  {
    question: "Which event occurs when a button is clicked?",
    options: ["mouseover", "submit", "change", "click"],
    answer: 3,
  },

  {
    question: "Which JavaScript function displays a popup message?",
    options: ["console.log()", "alert()", "print()", "prompt()"],
    answer: 1,
  },

  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape", "Google"],
    answer: 2,
  },
];

// VARIABLES

let currentQuestion = 0;

let userAnswers = new Array(quizData.length).fill(null);

let score = 0;
let timer;
let timeLeft = 15;

// START QUIZ

function startQuiz() {
  welcomeScreen.classList.add("hidden");
  welcomeScreen.classList.remove("active");

  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("active");

  loadQuestion();
}

startBtn.addEventListener("click", startQuiz);

//Timer

function startTimer() {
  clearInterval(timer);

  timeLeft = 15;

  timerDisplay.innerText = `⏰ Time Left : ${timeLeft}s`;

  timerDisplay.classList.remove("warning");

  timer = setInterval(() => {
    timeLeft--;

    timerDisplay.innerText = `⏰ Time Left : ${timeLeft}s`;

    if (timeLeft <= 5) {
      timerDisplay.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);

      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;

        loadQuestion();
      } else {
        showResult();
      }
    }
  }, 1000);
}

// LOAD QUESTION

function loadQuestion() {
  let q = quizData[currentQuestion];

  // Set question text
  question.innerText = q.question;

  // Clear previous options
  options.innerHTML = "";

  // Create options dynamically
  q.options.forEach((opt, index) => {
    let button = document.createElement("div");
    button.classList.add("option");
    button.innerText = opt;

    // If already selected, highlight it
    if (userAnswers[currentQuestion] === index) {
      button.classList.add("selected");
    }

    // Option click event
    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    options.appendChild(button);
  });

  // Update progress text
  progressText.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;

  // Update progress bar
  let progress = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = progress + "%";

  startTimer();

  // Button visibility control
  prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";

  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

// SELECT ANSWER

function selectAnswer(index) {
  userAnswers[currentQuestion] = index;

  // Remove selected class from all options
  const optionElements = document.querySelectorAll(".option");

  optionElements.forEach((option) => {
    option.classList.remove("selected");
  });

  // Highlight the selected option
  optionElements[index].classList.add("selected");
}

// NEXT QUESTION

function nextQuestion() {
  clearInterval(timer);

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;

    loadQuestion();
  }
}

// PREVIOUS QUESTION

function prevQuestion() {
  clearInterval(timer);

  if (currentQuestion > 0) {
    currentQuestion--;

    loadQuestion();
  }
}

// EVENT LISTENERS

nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);

// SUBMIT QUIZ

submitBtn.addEventListener("click", showResult);

function showResult() {
  clearInterval(timer);
  score = 0;

  let wrong = 0;

  // Calculate score
  quizData.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    } else {
      wrong++;
    }
  });

  // Hide quiz screen
  quizScreen.classList.add("hidden");
  quizScreen.classList.remove("active");

  // Show result screen
  resultScreen.classList.remove("hidden");
  resultScreen.classList.add("active");

  // Fill result data
  totalQuestions.innerText = quizData.length;
  correctAnswers.innerText = score;
  wrongAnswers.innerText = wrong;
  finalScore.innerText = score;

  let percent = Math.round((score / quizData.length) * 100);
  percentage.innerText = percent + "%";

  // Performance message
  if (percent >= 80) {
    performanceMessage.innerText = "🌟 Excellent!";
  } else if (percent >= 60) {
    performanceMessage.innerText = "👍 Great Job!";
  } else if (percent >= 40) {
    performanceMessage.innerText = "🙂 Good Effort!";
  } else {
    performanceMessage.innerText = "📘 Keep Practicing!";
  }

  // Local Storage - High Score
  let storedHigh = localStorage.getItem("highScore");

  if (!storedHigh || score > storedHigh) {
    localStorage.setItem("highScore", score);
    storedHigh = score;
  }

  highScore.innerText = storedHigh;
}

// RESTART QUIZ

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
  clearInterval(timer);
  currentQuestion = 0;
  userAnswers = new Array(quizData.length).fill(null);
  score = 0;

  // Hide result screen
  resultScreen.classList.add("hidden");
  resultScreen.classList.remove("active");

  // Show welcome screen
  welcomeScreen.classList.remove("hidden");
  welcomeScreen.classList.add("active");

  // Reset UI
  timerDisplay.innerText = "⏰ Time Left : 15s";
  progressBar.style.width = "10%";
}
