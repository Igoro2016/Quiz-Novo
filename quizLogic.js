// quizLogic.js
import { questions } from './quizData.js';
import { shuffleArray } from './shuffle.js';

const questionElement = document.getElementById("question");
const choiceElements = Array.from(document.getElementsByClassName("choice"));
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const wrongElement = document.getElementById("wrong");

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;

export function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.innerText = currentQuestionData.question;

    const choices = shuffleArray(currentQuestionData.choices);
    for (let i = 0; i < choiceElements.length; i++) {
        choiceElements[i].innerText = choices[i];
    }
    answerChosen = false; // reset flag when loading new question
}

function checkAnswer(e) {
    if (answerChosen) return; // prevent multiple answers
    answerChosen = true;

    if (e.target.innerText === questions[currentQuestion].answer) {
        score++;
        scoreElement.innerText = "Pontuação: " + score;
        alert("Correto!");
    } else {
        wrong++;
        wrongElement.innerText = "Erros: " + wrong;
        alert(
            "Errado! A resposta correta é " + questions[currentQuestion].answer + "."
        );
    }
}

choiceElements.forEach((element) => {
    element.addEventListener("click", checkAnswer);
});

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    scoreElement.innerText = "Pontuação: 0";
    wrongElement.innerText = "Erros: 0";
    loadQuestion();
}

nextButton.addEventListener("click", () => {
    if (!answerChosen) {
        alert("Por favor, escolha uma resposta antes de prosseguir.");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert(
            "Fim do Quiz! Você acertou " +
            score +
            " de " +
            questions.length +
            " perguntas."
        );
        restartQuiz();
    }
});
