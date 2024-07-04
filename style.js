document.addEventListener('DOMContentLoaded', function(event) {
    // Global variables
    let currentQuestionIndex = 0;
    let score = 0;
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        }
    ];

    // Function to load quiz questions
    function loadQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = '';

        const questionCard = document.createElement('div');
        questionCard.classList.add('card');

        const questionCardBody = document.createElement('div');
        questionCardBody.classList.add('card-body');

        const questionTitle = document.createElement('h5');
        questionTitle.classList.add('card-title');
        questionTitle.innerText = questions[currentQuestionIndex].question;

        questionCardBody.appendChild(questionTitle);

        questions[currentQuestionIndex].options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.classList.add('d-block');

            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question';
            optionInput.value = option;

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));

            questionCardBody.appendChild(optionLabel);
        });

        questionCard.appendChild(questionCardBody);
        quizContainer.appendChild(questionCard);

        if (currentQuestionIndex === questions.length - 1) {
            document.getElementById('next-button').style.display = 'none';
            document.getElementById('submit-button').style.display = 'block';
        }
    }

    // Function to handle next question
    function nextQuestion() {
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) {
            alert('Please select an option');
            return;
        }

        if (selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuiz();
        }
    }

    // Function to submit quiz and show results
    function submitQuiz() {
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) {
            alert('Please select an option');
            return;
        }

        if (selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
        }

        $('#resultModal').modal('show');
        document.getElementById('result-text').innerText = `Your score is ${score} out of ${questions.length}`;
    }

    // Event listener for feedback form submission
    document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        alert('Feedback submitted successfully');
        this.reset();
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Initial quiz load on page load
    loadQuiz();
});
