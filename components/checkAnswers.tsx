"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuestions } from "@/lib/actions/getQuestions";
import { createFlashcardHistory } from "@/lib/actions/createFlashcardHistory";
import { getScores } from "@/lib/actions/getScores";
import jsPDF from "jspdf";
import { updateAura } from "@/lib/actions/updateAura";

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
  const [placeholderText, setPlaceholderText] = useState("Enter a topic to generate flashcards...");
  
  const placeholders = [
    "Learn about Ancient Egypt...",
    "Explore Quantum Physics...",
    "Study World War II...",
    "Discover Human Anatomy...",
    "Master JavaScript Basics...",
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setPlaceholderText(placeholders[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
  const [aura, setAura] = useState(0);
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
    setAura((score/questions.length)*5);
    console.log(aura);
    await updateAura(aura);
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
    window.location.reload();
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

      <div className="relative backdrop-blur-sm py-8">
        {!questions.length ? (
          <div className="space-y-16">
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 space-y-12">
              <div className="w-full max-w-3xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e6c199] to-[#d4b089] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={placeholderText}
                  className="relative w-full p-8 text-2xl text-center rounded-2xl shadow-[0_0_15px_rgba(230,193,153,0.3)] border-2 border-[#e6c199]/50 focus:border-[#e6c199] focus:ring-4 focus:ring-[#e6c199]/30 transition-all duration-300 bg-white/5 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(230,193,153,0.4)]"
                />
              </div>
              <div className="relative group w-fit mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e6c199] to-[#d4b089] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="relative px-16 py-6 bg-white/5 backdrop-blur-sm text-[#8b5e34] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(230,193,153,0.4)] transition-all duration-300 text-xl font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-[#8b5e34] to-[#6d4a2f] bg-clip-text text-transparent">
                      Generate Flashcards
                    </span>
                  )}
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#fef5e7]/50 to-[#fef5e7]/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-[#e6c199]/30">
              <h2 className="text-2xl font-bold text-[#8b5e34] mb-6">Recent Quizzes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashcardHistory.slice(-4).map((history) => (
                  <div
                    key={history.id}
                    className="p-6 bg-white/10 backdrop-blur-sm border border-[#e6c199]/30 rounded-xl shadow-[0_4px_12px_rgba(230,193,153,0.15)] hover:shadow-[0_4px_16px_rgba(230,193,153,0.25)] transition-all duration-300"
                  >
                    <div className="text-lg font-semibold text-[#8b5e34]">
                      Score: {history.score}/{history.questions}
                    </div>
                    <div className="text-sm text-[#8b5e34]/80">Keyword: {history.keyword}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            {renderQuestion()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQQuiz;