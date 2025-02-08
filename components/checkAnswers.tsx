"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuestions } from "@/lib/actions/getQuestions";
import { createFlashcardHistory } from "@/lib/actions/createFlashcardHistory";
import { getScores } from "@/lib/actions/getScores";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

interface McqItem {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
}

interface FlashcardHistory {
  id: number;
  createdAt: Date;
  userId: number;
  keyword: string;
  score: number;
  questions: number;
}

const MCQQuiz = () => {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<McqItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [flashcardHistory, setFlashcardHistory] = useState<FlashcardHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getScores();
        setFlashcardHistory(response || []);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    loadHistory();
  }, []);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    
    setError(null);
    setLoading(true);
    
    try {
      const generatedQuestions = await getQuestions(topic);
      if (!generatedQuestions?.length) {
        throw new Error("Failed to generate questions");
      }
      
      resetQuizState();
      setQuestions(generatedQuestions);
    } catch (err) {
      handleGenerationError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerationError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes("BAD_PROMPT")) {
        setError("Invalid request. Please contact the National Suicide Prevention Lifeline at 1-800-273-8255 if you're struggling.");
      } else if (error.message.includes("INVALID_FORMAT")) {
        setError("Failed to generate valid questions. Please try a different topic.");
      } else {
        setError("Failed to generate questions. Please try again.");
      }
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
    setQuestions([]);
  };

  const resetQuizState = () => {
    setQuizComplete(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (choiceIndex: number): void => {
    if (showAnswer) return;
    
    setSelectedAnswer(choiceIndex);
    setShowAnswer(true);

    if (choiceIndex === parseInt(questions[currentQuestion].answer)) {
      setScore(prev => prev + 1);
    }
  };

  const finishQuiz = async () => {
    try {
      await createFlashcardHistory(topic, score, questions.length);
      setQuizComplete(true);
    } catch (err) {
      setError("Failed to save quiz results. Please try again.");
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const startNewQuiz = () => {
    setTopic("");
    setQuestions([]);
    resetQuizState();
    router.refresh();
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
      
      const choices = [question.choice1, question.choice2, question.choice3, question.choice4];
      
      choices.forEach((choice, i) => {
        const isCorrect = (i + 1) === parseInt(question.answer);
        if (isCorrect) doc.setTextColor(0, 128, 0);
        
        doc.text(`${i + 1}. ${choice}`, 15, yPosition);
        yPosition += 7;
        
        if (isCorrect) doc.setTextColor(0);
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
            Score: {score}/{questions.length}
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <Button
              onClick={startNewQuiz}
              className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089]"
              size="lg"
            >
              New Flashcards
            </Button>
            <Button
              onClick={generatePdf}
              className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089]"
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
        <div className="text-xl font-semibold text-[#8b5e34]">
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

        {showAnswer && (
          <div className="flex justify-end mt-6">
            <Button
              onClick={currentQuestion === questions.length - 1 ? finishQuiz : nextQuestion}
              className="bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089]"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <h1 className="text-3xl font-bold text-[#8b5e34] text-center">
        Interactive Flashcards Generator
      </h1>

      <Card className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg">
        <CardContent className="p-6">
          {questions.length > 0 ? (
            renderQuestion()
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter topic (e.g., 'Quantum Physics' or 'Renaissance Art')..."
                  className="w-full max-w-xl p-4 text-lg border-2 border-[#e6c199] rounded-lg shadow-sm focus:ring-2 focus:ring-[#8b5e34]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-8 py-3 bg-[#e6c199] text-[#8b5e34] hover:bg-[#d4b089] text-lg font-semibold"
                >
                  {loading ? "Generating..." : "Generate Flashcards"}
                </Button>

                {error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg w-full max-w-xl text-center">
                    {error}
                  </div>
                )}
              </div>

              {flashcardHistory.length > 0 && (
                <Card className="bg-[#fef5e7] border-2 border-[#8b5e34] rounded-lg">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-[#8b5e34] mb-4">
                      Recent Quiz History
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {flashcardHistory.slice(-4).map((history) => (
                        <div
                          key={history.id}
                          className="p-4 bg-[#fdf1e1] border-2 border-[#d4b089] rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-lg font-semibold text-[#8b5e34]">
                              {history.keyword}
                            </div>
                            <div className="text-sm text-[#8b5e34]">
                              {new Date(history.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 text-[#8b5e34]">
                            Score: {history.score}/{history.questions}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MCQQuiz;