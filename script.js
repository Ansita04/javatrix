const quizData = [
    {
        question: "What is the default value of an int variable in Java?",
        options: ["0", "1", "null", "undefined"],
        answer: "0"
    },
    {
        question: "Which keyword is used to define a constant variable in Java?",
        options: ["final", "const", "static", "var"],
        answer: "final"
    },
    {
        question: "Which of these is not a Java primitive data type?",
        options: ["int", "float", "char", "String"],
        answer: "String"
    },
    {
        question: "What is used to create an object in Java?",
        options: ["new", "create", "instance", "build"],
        answer: "new"
    },
    {
        question: "Which Java feature allows method names to be reused with different parameters?",
        options: ["Overloading", "Overriding", "Encapsulation", "Abstraction"],
        answer: "Overloading"
    }
];

const quizContainer = document.getElementById("quiz");
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill("");

function showQuestion(index) {
    const q = quizData[index];
    quizContainer.innerHTML = `
        <div class="question">${q.question}</div>
        <div class="options">
            ${q.options.map(option => 
                `<div class="option-box" onclick="selectAnswer('${option}')">${option}</div>`
            ).join('')}
        </div>
        <div class="buttons">
            ${index > 0 ? '<button id="prev" class="prev-btn">Previous</button>' : ''}
            <button id="${index === quizData.length - 1 ? 'submit' : 'next'}" class="next-btn">
                ${index === quizData.length - 1 ? 'Submit Quiz' : 'Next'}
            </button>
        </div>
    `;

    // Add event listeners for buttons
    if (index > 0) {
        document.getElementById("prev").addEventListener("click", prevQuestion);
    }
    if (index === quizData.length - 1) {
        document.getElementById("submit").addEventListener("click", showResults);
    } else {
        document.getElementById("next").addEventListener("click", nextQuestion);
    }
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    document.querySelectorAll(".option-box").forEach(box => {
        box.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === "") {
        alert("Please select an answer before proceeding.");
        return;
    }
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function prevQuestion() {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
}

function showResults() {
    score = userAnswers.reduce((acc, answer, index) => 
        acc + (answer === quizData[index].answer ? 1 : 0), 0);
    let percentage = (score / quizData.length) * 100;
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>You scored ${score} out of ${quizData.length}!</p>
        <div class="progress-circle" style="background: conic-gradient(#5c2176 ${percentage}%, #ddd ${percentage}%);"></div>
    `;
}

// Start the quiz
document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestionIndex);
});
