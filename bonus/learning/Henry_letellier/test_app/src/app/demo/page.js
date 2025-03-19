/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** page.js
*/

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


// Separated quiz data function
function getQuizData() {
    return [
        {
            title: "General Knowledge",
            description: "Test your general knowledge",
            questions: [
                {
                    question: "What is the capital of France?",
                    options: ["London", "Berlin", "Paris", "Madrid"],
                    correctAnswer: "Paris"
                },
                {
                    question: "Which planet is known as the Red Planet?",
                    options: ["Earth", "Mars", "Jupiter", "Venus"],
                    correctAnswer: "Mars"
                },
                {
                    question: "Who painted the Mona Lisa?",
                    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                    correctAnswer: "Leonardo da Vinci"
                }
            ]
        },
        {
            title: "Science Quiz",
            description: "Test your science knowledge",
            questions: [
                {
                    question: "What is the chemical symbol for water?",
                    options: ["Wa", "H2O", "O2H", "HOH"],
                    correctAnswer: "H2O"
                },
                {
                    question: "What is the largest organ in the human body?",
                    options: ["Heart", "Liver", "Skin", "Lungs"],
                    correctAnswer: "Skin"
                },
                {
                    question: "What is the hardest natural substance on Earth?",
                    options: ["Gold", "Iron", "Diamond", "Platinum"],
                    correctAnswer: "Diamond"
                }
            ]
        }
    ];
}

// Standalone functions
export function handleOptionSelect(option, setSelectedOption) {
    setSelectedOption(option);
}

export function handleNextQuestion(
    selectedOption,
    currentQuestion,
    score,
    setScore,
    answeredQuestions,
    setAnsweredQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    totalQuestions,
    setShowResults,
    setSelectedOption
) {
    if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1);
    }

    setAnsweredQuestions(answeredQuestions + 1);

    if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
    } else {
        setShowResults(true);
    }
}

export function handleNextQuiz(
    currentQuizIndex,
    setCurrentQuizIndex,
    quizzes,
    setCurrentQuestionIndex,
    setSelectedOption,
    setShowResults,
    setScore
) {
    if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowResults(false);
        setScore(0);
    } else {
        alert("Congratulations! You've completed all quizzes!");
    }
}

export function resetQuiz(
    setCurrentQuestionIndex,
    setScore,
    setShowResults,
    setSelectedOption,
    setAnsweredQuestions
) {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setAnsweredQuestions(0);
}

function QuizGame() {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);

    const quizzes = getQuizData();
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const totalQuestions = currentQuiz.questions.length;

    // Handlers
    function handleOptionClick(option) {
        handleOptionSelect(option, setSelectedOption);
    }

    function handleNextClick() {
        handleNextQuestion(
            selectedOption,
            currentQuestion,
            score,
            setScore,
            answeredQuestions,
            setAnsweredQuestions,
            currentQuestionIndex,
            setCurrentQuestionIndex,
            totalQuestions,
            setShowResults,
            setSelectedOption
        );
    }

    function handleTryAgainClick() {
        resetQuiz(
            setCurrentQuestionIndex,
            setScore,
            setShowResults,
            setSelectedOption,
            setAnsweredQuestions
        );
    }

    function handleNextQuizClick() {
        handleNextQuiz(
            currentQuizIndex,
            setCurrentQuizIndex,
            quizzes,
            setCurrentQuestionIndex,
            setSelectedOption,
            setShowResults,
            setScore
        );
    }

    // UI Component functions
    function renderProgressBar() {
        return (
            <div className="mb-4">
                <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    >
                    </div>
                </div>
            </div>
        );
    }

    function renderQuestionOptions() {
        return (
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`w-full p-3 text-left rounded-lg transition-colors ${selectedOption === option
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        );
    }

    function renderNextButton() {
        return (
            <button
                className={`w-full mt-6 py-3 rounded-lg font-medium ${selectedOption
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                onClick={handleNextClick}
                disabled={!selectedOption}
            >
                Next Question
            </button>
        );
    }

    function renderQuizContent() {
        return (
            <div className="quiz-container">
                {renderProgressBar()}
                <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
                {renderQuestionOptions()}
                {renderNextButton()}
            </div>
        );
    }

    function getResultMessage() {
        if (score === totalQuestions) return "Perfect score! Amazing job!";
        if (score >= totalQuestions / 2) return "Good effort! Keep learning.";
        return "Keep practicing, you'll improve!";
    }

    function renderResultsContent() {
        return (
            <div className="results-container text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                <div className="text-5xl font-bold text-blue-600 mb-4">{score}/{totalQuestions}</div>
                <p className="mb-6 text-lg">{getResultMessage()}</p>

                <div className="flex flex-col space-y-3">
                    <button
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        onClick={handleTryAgainClick}
                    >
                        Try Again
                    </button>
                    <button
                        className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                        onClick={handleNextQuizClick}
                    >
                        Next Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-2">{currentQuiz.title}</h1>
                <p className="text-gray-600 text-center mb-6">{currentQuiz.description}</p>

                {!showResults ? renderQuizContent() : renderResultsContent()}
            </div>
        </div>
    );
};


function demo() {
    const router = useRouter();

    function goHome() {
        router.push('/');
    }

    return (
        <div>
            <h1>hello</h1>
            <button type="button" onClick={goHome}>Go Back Home</button>
            {/* Render QuizGame as a JSX element */}
            <QuizGame />
        </div>
    );
}

export default demo;
