let options = document.querySelector('.options');
let currQuestion = document.querySelector('.question');
let allOptions = document.querySelectorAll('.option p');
let progress = document.querySelector('.progress');
let currScore = document.querySelector('.score');
let finalScore = 0;
let questionNum = document.querySelector('.question-num');
let qNo = 0;
let questionIndex;
let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
 ];
let totalQuestions = questions.length;

window.onload = () => {
    displayNextQuestion();
}

options.addEventListener("click", (e) => {
    if (e.target.classList[0] == 'option') {
        let option = e.target.children[0].innerText;
        let optionNum = option.charCodeAt(0) - 64;
        checkAnswer(optionNum, e);
    }
})


function displayNextQuestion() {
    if (questions.length == 0) {
        localStorage.setItem('score', finalScore);
        endGame();
        return;
    }
    qNo++;
    questionNum.innerText = qNo + '/' + totalQuestions;

    progress.style.width = (240 / questions.length) + "px";

    let index = Math.floor(Math.random() * questions.length);
    currQuestion.innerText = questions[index].question;

    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].innerText = questions[index]['choice' + (i + 1)];
    }
    questionIndex = index;
}

function checkAnswer(userResponse, e) {
    let color;

    if (userResponse == questions[questionIndex].answer) {
        e.target.classList.add('green');
        finalScore += 10;
        currScore.innerText = finalScore;
        color = 'green';
    }
    else {
        e.target.classList.add('red');
        color = 'red';
    }

    questions.splice(questionIndex, 1);

    setTimeout(() => {
        e.target.classList.remove(color);
        displayNextQuestion();
    },500);
}

function endGame() {
    window.location = './end.html';
}