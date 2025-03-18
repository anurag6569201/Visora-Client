import React, { useState, useEffect } from "react";
import "../../../../assets/discover/css/quiz.css";


const QuizSection = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const dummyQuiz = {
        questions: [
            {
                question: "What's the main purpose of this project?",
                options: ["Learning React", "CSS Animation", "Web Development", "All of the above"],
                correct: 3,
                explanation: "This project combines multiple web development concepts including React, CSS animations, and modern web practices."
            },
            {
                question: "Which technology is primarily used here?",
                options: ["Angular", "React", "Vue", "Svelte"],
                correct: 1,
                explanation: "The project is built using React, as seen in the component structure and imports."
            }
        ]
    };

    const handleAnswerSelect = (optionIndex) => {
        if (!quizSubmitted) {
            const newAnswers = [...selectedAnswers];
            newAnswers[currentQuestion] = optionIndex;
            setSelectedAnswers(newAnswers);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < dummyQuiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setShowExplanation(false);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            setShowExplanation(false);
        }
    };

    const calculateScore = () => {
        return dummyQuiz.questions.reduce((acc, question, index) => (
            acc + (selectedAnswers[index] === question.correct ? 1 : 0)
        ), 0);
    };

    const currentQ = dummyQuiz.questions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;
    const progress = ((currentQuestion + 1) / dummyQuiz.questions.length) * 100;

    return (
        <div className="quiz-section">
            <div className="quiz-header">
                <h3>Interactive Quiz</h3>
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="quiz-meta">
                    <span>Question {currentQuestion + 1} of {dummyQuiz.questions.length}</span>
                    {quizSubmitted && (
                        <span className="score">
                            Score: {calculateScore()}/{dummyQuiz.questions.length}
                        </span>
                    )}
                </div>
            </div>

            {!quizSubmitted ? (
                <>
                    <div className="question-card">
                        <h4>{currentQ.question}</h4>
                        <div className="quiz-options">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`quiz-btn ${
                                        selectedAnswers[currentQuestion] === index 
                                            ? 'selected' 
                                            : ''
                                    }`}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={quizSubmitted}
                                >
                                    {option}
                                    {quizSubmitted && (
                                        <span className="answer-status">
                                            {index === currentQ.correct 
                                                ? '✓' 
                                                : selectedAnswers[currentQuestion] === index 
                                                    ? '✗' 
                                                    : ''}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quiz-navigation">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestion === 0}
                        >
                            ← Previous
                        </button>
                        
                        {currentQuestion === dummyQuiz.questions.length - 1 ? (
                            <button
                                onClick={() => setQuizSubmitted(true)}
                                disabled={!isAnswered}
                                className="submit-btn"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <button
                                onClick={handleNextQuestion}
                                disabled={!isAnswered}
                            >
                                Next →
                            </button>
                        )}
                    </div>

                    {isAnswered && (
                        <button
                            className="explanation-toggle"
                            onClick={() => setShowExplanation(!showExplanation)}
                        >
                            {showExplanation ? 'Hide' : 'Show'} Explanation
                        </button>
                    )}

                    {showExplanation && (
                        <div className="explanation">
                            <h5>Explanation:</h5>
                            <p>{currentQ.explanation}</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="quiz-results">
                    <h4>Quiz Results</h4>
                    <div className="score-circle">
                        {calculateScore()}/{dummyQuiz.questions.length}
                    </div>
                    
                    {dummyQuiz.questions.map((question, index) => (
                        <div key={index} className="result-item">
                            <div className="question-status">
                                {selectedAnswers[index] === question.correct 
                                    ? '✓' 
                                    : '✗'}
                            </div>
                            <div>
                                <p><strong>Question {index + 1}:</strong> {question.question}</p>
                                <p>Your answer: {question.options[selectedAnswers[index]]}</p>
                                <p>Correct answer: {question.options[question.correct]}</p>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        className="retry-btn"
                        onClick={() => {
                            setCurrentQuestion(0);
                            setSelectedAnswers([]);
                            setQuizSubmitted(false);
                        }}
                    >
                        Retry Quiz
                    </button>
                </div>
            )}
        </div>
    );
};


export default QuizSection;