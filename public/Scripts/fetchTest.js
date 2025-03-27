async function fetchTest(fetchFull = true) {
    const response = fetchFull ? await fetch('/full-database') : await fetch('/partial-database');
    const data = await response.json();
    return data.data;
}

let currentQuestion = "";
let currentAnswers = [];
let currentAnswerCount = 0;
let allCorrect = true;
let data = null;

const question = document.querySelector("h2");
const answerCheckContainer = document.querySelector(".answer-check");
const answerCheckText = document.querySelector("#answer-check-text");

function checkAnswer() {
    allCorrect = true;

    const allAnswers = document.querySelectorAll(".answer-input");

    //check if all answers are in current answers
    allAnswers.forEach((answer) => {
        if (!currentAnswers.includes(answer.value.toLocaleLowerCase())) {
            console.log(answer.textContent);
            answer.style.backgroundColor = "red";
            allCorrect = false;
            return;
        }
        answer.style.backgroundColor = "green";
    })


    answerCheckContainer.style.display = "flex";
    answerCheckText.textContent = `Correct Answers: ${currentAnswers.join(", ")}`;

    if (allCorrect) {
        answerCheckText.textContent = "All answers are correct!";
        document.querySelector("#next").style.display = "flex";
    }
}

function nextQuestion() {
    if (data.length == 0) {
        window.location = "/";
        return;
    }

    document.querySelector("#next").style.display = "none";
    document.querySelector(".answer-check").style.display = "none";

    currentData = data.shift();
    currentQuestion = currentData.question;
    currentAnswers = currentData.answers.map((answer) => answer.toLocaleLowerCase());
    currentAnswerCount = currentData.answers_count;

    question.textContent = currentQuestion;

    document.querySelectorAll(".answer").forEach((answer) => {
        answer.remove();
    })

    for (let i = 0; i < currentAnswerCount; i++) {
        const answer = document.createElement("div");
        answer.classList.add("answer");
        answer.innerHTML = `<label for="answer${i + 1}">Answer ${i + 1}</label> <input class="answer-input" type="text" id="answer${i + 1}" name="answer" />`;
        document.querySelector(".answer-container").appendChild(answer);
    }
}