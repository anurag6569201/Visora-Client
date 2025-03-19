import React, { useState, useEffect } from "react";
import "../../../../assets/discover/css/quiz.css";

const QuizSection = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://0.0.0.0:8001/api/quizzes/')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0 && data[0].data) {
                    console.log("Fetched Quiz Data:", data[0].data); // Debug
                    setQuizData(data[0].data); // Extract the nested 'data' field
                    setLoading(false);
                } else {
                    throw new Error("No quiz data found");
                }
            })
            .catch(err => {
                console.error("Error fetching quiz:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);
    

    const handleAnswerSelect = (optionIndex) => {
        if (!quizSubmitted) {
            const newAnswers = [...selectedAnswers];
            newAnswers[currentQuestion] = optionIndex;
            setSelectedAnswers(newAnswers);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < quizData?.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const calculateScore = () => {
        return quizData?.questions.reduce(
            (acc, question, index) =>
                acc + (selectedAnswers[index] === question.correct - 1 ? 1 : 0),
            0
        );
    };

    if (loading) return <div>Loading quiz...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!quizData) return <div>No quiz found</div>;

    const currentQ = quizData.questions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

    return (
        <div className="quiz-section">
            <div className="quiz-header">
                <h4>Interactive Quiz</h4>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="quiz-meta">
                    <span>
                        Question {currentQuestion + 1} of {quizData.questions.length}
                    </span>
                    {quizSubmitted && (
                        <span className="score">
                            Score: {calculateScore()}/{quizData.questions.length}
                        </span>
                    )}
                </div>
            </div>

            {!quizSubmitted ? (
                <>
                    <div className="question-card">
                        <h5>{currentQ.text}</h5>
                        <div className="quiz-options">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`quiz-btn ${
                                        selectedAnswers[currentQuestion] === index ? "selected" : ""
                                    }`}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={quizSubmitted}
                                >
                                    {option.text}
                                    {quizSubmitted && (
                                        <span
                                            className={`answer-status ${
                                                selectedAnswers[currentQuestion] === index
                                                    ? index === currentQ.correct - 1
                                                        ? "correct"
                                                        : "wrong"
                                                    : ""
                                            }`}
                                        >
                                            {index === currentQ.correct - 1 ? "✓" : selectedAnswers[currentQuestion] === index ? "✗" : ""}
                                        </span>
                                    )}

                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quiz-navigation">
                        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                            ← Previous
                        </button>

                        {currentQuestion === quizData.questions.length - 1 ? (
                            <button
                                onClick={() => setQuizSubmitted(true)}
                                disabled={!isAnswered}
                                className="submit-btn"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <button onClick={handleNextQuestion} disabled={!isAnswered}>
                                Next →
                            </button>
                        )}
                    </div>
                    <br />
                </>
            ) : (
                <div className="quiz-results">
                    <h4>Quiz Results</h4>
                    <div className="score-circle">
                        {calculateScore()}/{quizData.questions.length}
                    </div>

                    {quizData.questions.map((question, index) => (
                        <div key={index} className="result-item">
                            <div className="question-status">
                                {selectedAnswers[index] === question.correct - 1 ? "✓" : "✗"}
                            </div>
                            <div>
                                <p>
                                    <strong>Question {index + 1}:</strong> {question.text}
                                </p>
                                <p>
                                    Your answer:{" "}
                                    {question.options[selectedAnswers[index]]?.text || "Not answered"}
                                </p>
                                <p>Correct answer: {question.options[question.correct - 1]?.text}</p>
                                <div className="explanation">
                                    <h5>Explanation:</h5>
                                    <p>{question.explanation}</p>
                                </div>
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
                        Generate More from AI
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
