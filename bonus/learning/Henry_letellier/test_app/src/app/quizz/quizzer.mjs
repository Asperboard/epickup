export const quizzer = {
    questions: [],
    userAnswers: [],

    // Function to set the questions
    setQuestions(questions) {
        this.questions = questions;
        this.userAnswers = Array(questions.length).fill(null);
    },

    // Function to generate JSX for displaying the quiz
    getDisplayCode() {
        return this.questions.map((q, index) => (
            <div key={index} className="mb-4">
                <p className="font-medium text-lg mb-2">{q.question}</p>
                <div className="space-y-2">
                    {q.options.map((option, i) => (
                        <label key={i} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={i}
                                className="form-radio text-blue-500"
                                onChange={() => this.setAnswer(index, i)}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>
        ));
    },

    // Function to set the user's answer for a question
    setAnswer(questionIndex, answerIndex) {
        this.userAnswers[questionIndex] = answerIndex;
    },

    // Function to calculate the score
    getScore() {
        return this.questions.reduce((score, question, index) => {
            return score + (this.userAnswers[index] === question.correctAnswer ? 1 : 0);
        }, 0);
    }
};
