var startButton =document.getElementById("start-btn")
var questionContainerElement = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonElement = document.getElementById("answer-buttons")
var submitButtonElement= document.getElementById("submit")
var initialsInputElement = document.getElementById("initials")
var score=0
var timer= document.getElementById("timer")
var timeLeft= 60
var timerInterval
var gameOverElement = document.getElementById("game-over")
var finalScoreElement = document.getElementById("final-score")
var timeLeftElement = document.getElementById("time-left")
var highScoreElement = document.getElementById("high-score")
// created all variables that need to be referenced in the functions below.
let shuffledQuestions, currentQuestionIndex
// added event listener to behin game on the click of the start button. Refences the start game function.
startButton.addEventListener("click", startGame)
// created the start game function that removes the start game element and pulls up the first quiz question and answers.
function startGame(){
    console.log("started")
    startButton.classList.add("hidden")
    shuffledQuestions =questions.sort(()=> Math.random() - .5)
    currentQuestionIndex =0
    questionContainerElement.classList.remove("hidden")
    timer.innerHTML=timeLeft
    timerInterval=setInterval(updateTimer, 1000)
    setNextQuestion()
}
// this function updates the timer when a question is answered wrong and calls up the game over function when the timer runs out.
function updateTimer(){
    timeLeft--
    timer.innerHTML=timeLeft
    if (timeLeft==0){
        clearInterval(timerInterval)
        gameOver()
    }
}
// this function clears the game board when the timer runs out.
function gameOver(){
    gameOverElement.classList.remove("hidden")
    questionContainerElement.classList.add("hidden")
    clearInterval(timerInterval)
    finalScoreElement.innerHTML= score
    timeLeftElement.innerHTML= timeLeft
    
}
submitButtonElement.addEventListener("click", saveScore)
// This function saves the high score along with the initials of the user.
function saveScore(){
    var initials= initialsInputElement.value
    var saveScore ={initials:initials, score:score}
    var highScore =JSON.parse(localStorage.getItem("HighScore"))|| saveScore
    if (score> highScore.score){
        localStorage.setItem("HighScore", saveScore)
    }
    highScoreElement.innerHTML = highScore.score + "(" + highScore.initials + ")"
}
// this function shuffles the nect question that will appear.
function setNextQuestion(){
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
// This function calls up the next question when after the user selects an answer or when they start the quiz.
function showQuestion(question){
    questionElement.innerText =question.question
    answerButtonElement.innerHTML=""
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("button")
        answerButtonElement.appendChild(button)
        // if (answer.correct)
        button.correct =answer.correct
        
        button.addEventListener("click", selectAnswer)
    });
}
// this function removes time from the timer if a question is answered correctly.
function selectAnswer(e){
    var isCorrect= e.currentTarget.correct
    // console.log(isCorrect)
    if (isCorrect){
        score +=1
    }
    else{
        timeLeft-=10
    }
    // currentQuestionIndex++
    if (currentQuestionIndex>= shuffledQuestions.length-1){
        gameOver()
    }
    else {
        currentQuestionIndex++
        setNextQuestion()
    }
    // setNextQuestion()
}
// These are the avalaible questions and answers that the user can select.
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "<script>", correct: true},
            {text: "<scripting>", correct: false},
            {text: "<javascript>", correct: false},
            {text: "<js>", correct: false}

        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "function myFunction()", correct: true},
            {text: "function = myFunction()", correct: false},
            {text: "fuunction:myFunction()", correct: false},
            {text: "function--myFunction()", correct: false}
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: [
            {text: "call function myFunction()", correct: false},
            {text: "invoke myFunction()", correct: false},
            {text: "myFunction()", correct: true},
            {text: "call myFunction()", correct: false}
        ]
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: [
            {text: "'This is a comment.", correct: false},
            {text: "//This is a comment.", correct: true},
            {text: "<!--This is a comment.-->", correct: false},
            {text: "{this is a comment.}", correct: false}
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            {text: "carName", correct: false},
            {text: "variable carName", correct: false},
            {text: "v carName", correct: false},
            {text: "var carName", correct: true}
            
        ]
    }
]