"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuestions } from "@/lib/actions/getQuestions";
import { createFlashcardHistory } from "@/lib/actions/createFlashcardHistory";
import { getScores } from "@/lib/actions/getScores";
import jsPDF from "jspdf";

const MCQQuiz = () => {
  useEffect(() => {
    const getAllScores = async () => {
      const response = await getScores();
      console.log(response);
      setFlashcardHistory(response || []);
    };
    getAllScores();
  }, []);

  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<
    {
      question: string;
      choice1: string;
      choice2: string;
      choice3: string;
      choice4: string;
      answer: string;
    }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [flashcardHistory, setFlashcardHistory] = useState<
    {
      id: number;
      createdAt: Date;
      userId: number;
      keyword: string;
      score: number;
      questions: number;
    }[]
  >([]);

  const handleSearch = async () => {
    setLoading(true);
    const mockQuestions = await getQuestions(topic);
    setQuizComplete(false);
    setQuestions(mockQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setLoading(false);
  };

  const handleAnswerClick = (choiceIndex: number): void => {
    if (showAnswer) return;
    setSelectedAnswer(choiceIndex);
    setShowAnswer(true);

    if (choiceIndex === parseInt(questions[currentQuestion].answer)) {
      setScore(score + 1);
    }
  };

  const finishQuiz = async () => {
    await createFlashcardHistory(topic, score, questions.length);
    setQuizComplete(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const startNewQuiz = () => {
    setTopic("");
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Flashcards for ${topic || "Quiz"}`, 10, 10);
    doc.setFontSize(12);
    
    let yPosition = 20;
    
    questions.forEach((question, index) => {
      doc.text(`Question ${index + 1}: ${question.question}`, 10, yPosition);
      yPosition += 10;
      
      const choices = [
        question.choice1,
        question.choice2,
        question.choice3,
        question.choice4,
      ];
      
      choices.forEach((choice, i) => {
        const isCorrect = (i + 1) === parseInt(question.answer);
        if (isCorrect) {
          doc.setTextColor(0, 128, 0); 
        }
        
        doc.text(`${i + 1}. ${choice}`, 15, yPosition);
        yPosition += 7;
        
        if (isCorrect) {
          doc.setTextColor(0); 
        }
      });
      
      yPosition += 5; 
      
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
    });

    doc.save(`${topic || 'flashcards'}-quiz-results.pdf`);
  };

  const renderQuestion = () => {
    if (!questions.length) return null;
    if (quizComplete) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-3xl font-bold text-[#8b5e34]">Quiz Complete!</div>
          <div className="text-xl text-[#8b5e34]">
            You scored {score} out of {questions.length} questions correctly!
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={startNewQuiz}
              className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089] transition-colors"
              size="lg"
            >
              Create New Flashcards
            </Button>
            <Button
              onClick={generatePdf}
              className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089] transition-colors"
              size="lg"
            >
              Download PDF
            </Button>
          </div>
        </div>
      );
    }

    const question = questions[currentQuestion];
    const choices = [
      { number: 1, text: question.choice1 },
      { number: 2, text: question.choice2 },
      { number: 3, text: question.choice3 },
      { number: 4, text: question.choice4 },
    ];

    return (
      <div className="space-y-6">
        <div className="text-xl font-semibold text-[#8b5e34] mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="text-lg text-[#8b5e34] mb-6">{question.question}</div>
        <div className="grid gap-4">
          {choices.map((choice, index) => (
            <Button
              key={index}
              className={`w-full text-left justify-start py-6 rounded-lg transition-colors
                ${
                  showAnswer
                    ? parseInt(question.answer) === choice.number
                      ? "bg-green-100 border-2 border-green-500"
                      : selectedAnswer === choice.number
                      ? "bg-red-100 border-2 border-red-500"
                      : "bg-white/80 border border-[#e6c199]"
                    : "bg-white/80 border border-[#e6c199] hover:border-[#d4b089]"
                }
                text-[#8b5e34] hover:bg-white/90`}
              variant="ghost"
              onClick={() => handleAnswerClick(choice.number)}
            >
              {choice.text}
            </Button>
          ))}
        </div>

        {showAnswer && !quizComplete && (
          <div className="flex justify-end mt-6">
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={finishQuiz}
                className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089]"
              >
                Finish Questions
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089]"
              >
                Next Question
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#8b5e34]">Generate Flashcards</h1>

      <Card className="bg-white/50 backdrop-blur-sm rounded-lg shadow">
        <CardContent className="p-6">
          {!questions.length ? (
            <div>
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 space-y-8">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic to generate flashcards..."
                  className="w-full max-w-xl p-4 text-lg border rounded-lg shadow-sm focus:ring-2 focus:ring-[#e6c199] focus:border-[#e6c199]"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-8 py-3 bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089] transition-colors text-lg"
                >
                  {loading ? "Generating..." : "Generate Flashcards"}
                </Button>
              </div>
              <Card className="bg-[#fef5e7] border border-[#8b5e34] rounded-lg shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl  font-semibold text-[#8b5e34]">Recent Quiz</h2>
                  <div className="flex justify-between gap-5">
                    {flashcardHistory.slice(-4).map((history) => (
                      <div
                        key={history.id}
                        className="p-4 bg-[#fdf1e1] w-full border border-[#d4b089] rounded-lg shadow-sm"
                      >
                        <div className="text-lg font-medium text-[#8b5e34]">
                          Score: {history.score}/{history.questions}
                        </div>
                        <div className="text-sm text-[#8b5e34]">Keyword: {history.keyword}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">{renderQuestion()}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MCQQuiz;