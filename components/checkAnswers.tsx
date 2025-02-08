"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MCQQuiz = () => {
  // ... previous mockQuestions array ...
  const mockQuestions = [
    {
      question: "What was Mahatma Gandhi's birth name?",
      choice1: 'Mohandas Karamchand Gandhi',
      choice2: 'Mahatma Das Gandhi',
      choice3: 'Karamchand Uttamchand Gandhi',
      choice4: 'Mohan Das Gandhi',
      answer: '1'
    },
    {
      question: 'In which country did Gandhi first experience racial discrimination?',
      choice1: 'India',
      choice2: 'England',
      choice3: 'South Africa',
      choice4: 'United States',
      answer: '3'
    },
    {
      question: 'What philosophy of non-violent resistance did Gandhi advocate?',
      choice1: 'Satyagraha',
      choice2: 'Ahimsa',
      choice3: 'Karma Yoga',
      choice4: 'Buddha dharma',
      answer: '1'
    },
    {
      question: 'What was the name of the Ashram established by Gandhi in South Africa?',
      choice1: 'Sabarmati Ashram',
      choice2: 'Phoenix Settlement',
      choice3: 'Sevagram Ashram',
      choice4: 'Wardha Ashram',
      answer: '2'
    },
    {
      question: 'Which movement is Gandhi associated with to protest the British salt tax?',
      choice1: 'Quit India Movement',
      choice2: 'Non-Cooperation Movement',
      choice3: 'Salt Satyagraha (Dandi March)',
      choice4: 'Swadeshi Movement',
      answer: '3'
    },
    {
      question: 'What year did Gandhi return to India from South Africa?',
      choice1: '1912',
      choice2: '1915',
      choice3: '1920',
      choice4: '1905',
      answer: '2'
    },
    {
      question: 'Which British leader did Gandhi correspond with extensively?',
      choice1: 'Lord Curzon',
      choice2: 'Winston Churchill',
      choice3: 'Lord Mountbatten',
      choice4: 'Lord Irwin',
      answer: '4'
    },
    {
      question: "What was Gandhi's profession before becoming a political activist?",
      choice1: 'Doctor',
      choice2: 'Lawyer',
      choice3: 'Teacher',
      choice4: 'Journalist',
      answer: '2'
    },
    {
      question: 'What is Gandhi Jayanti?',
      choice1: "Gandhi's death anniversary",
      choice2: 'Indian Independence Day',
      choice3: "Gandhi's birthday",
      choice4: 'Republic Day',
      answer: '3'
    },
    {
      question: 'Where was Gandhi assassinated?',
      choice1: 'Ahmedabad',
      choice2: 'New Delhi',
      choice3: 'Bombay (Mumbai)',
      choice4: 'Calcutta (Kolkata)',
      answer: '2'
    },
    {
      question: 'Who assassinated Mahatma Gandhi?',
      choice1: 'Jawaharlal Nehru',
      choice2: 'Sardar Vallabhbhai Patel',
      choice3: 'Nathuram Godse',
      choice4: 'Bhagat Singh',
      answer: '3'
    },
    {
      question: "What is the term often used to describe Gandhi's philosophy of self-sufficiency and village industries?",
      choice1: 'Sarvodaya',
      choice2: 'Swadeshi',
      choice3: 'Swaraj',
      choice4: 'Ahimsa',
      answer: '2'
    },
    {
      question: 'What was the main objective of the Non-Cooperation Movement led by Gandhi?',
      choice1: 'Achieving complete independence immediately',
      choice2: 'Boycotting British institutions and goods',
      choice3: 'Promoting violence against the British',
      choice4: 'Demanding separate electorates for Muslims',
      answer: '2'
    },
    {
      question: 'Which of the following books was written by Mahatma Gandhi?',
      choice1: 'The Discovery of India',
      choice2: 'My Experiments with Truth',
      choice3: 'Gitanjali',
      choice4: 'Hind Swaraj',
      answer: '4'
    },
    {
      question: "What title was Gandhi often referred to, meaning 'Great Soul'?",
      choice1: 'Sardar',
      choice2: 'Pandit',
      choice3: 'Mahatma',
      choice4: 'Bapu',
      answer: '3'
    }
  ]

  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<{
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: string;
  }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setQuizComplete(false);
    setTimeout(() => {
      setQuestions(mockQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setLoading(false);
    }, 1000);
  };

  const handleAnswerClick = (choiceIndex: number): void => {
    if (showAnswer) return;
    setSelectedAnswer(choiceIndex);
    setShowAnswer(true);
    
    if (choiceIndex === parseInt(questions[currentQuestion].answer)) {
      setScore(score + 1);
    }
  };

  const finishQuiz = () => {
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
    setTopic('');
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const renderQuestion = () => {
    if (!questions.length) return null;
    if (quizComplete) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-3xl font-bold">
            Quiz Complete!
          </div>
          <div className="text-xl">
            You scored {score} out of {questions.length} questions correctly!
          </div>
          <Button 
            onClick={startNewQuiz}
            className="mt-4"
            size="lg"
          >
            Create New Flashcards
          </Button>
        </div>
      );
    }

    const question = questions[currentQuestion];
    const choices = [
      { number: 1, text: question.choice1 },
      { number: 2, text: question.choice2 },
      { number: 3, text: question.choice3 },
      { number: 4, text: question.choice4 }
    ];

    return (
      <div className="space-y-4">
        <div className="text-xl font-semibold mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="text-lg mb-6">{question.question}</div>
        <div className="grid gap-3">
          {choices.map((choice, index) => (
            <Button
              key={index}
              className={`w-full justify-start px-4 py-6 text-left ${
                showAnswer
                  ? parseInt(question.answer) === choice.number
                    ? 'bg-green-500 hover:bg-green-600'
                    : selectedAnswer === choice.number
                    ? 'bg-red-500 hover:bg-red-600'
                    : ''
                  : ''
              }`}
              variant={selectedAnswer === choice.number ? "secondary" : "outline"}
              onClick={() => handleAnswerClick(choice.number)}
            >
              {choice.text}
            </Button>
          ))}
        </div>
        
        {showAnswer && !quizComplete && (
          <div className="flex justify-end mt-6">
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={finishQuiz}>
                Finish Questions
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                Next Question
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {!questions.length && (
            <div className="flex gap-2">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic..."
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Get Questions
                  </>
                )}
              </Button>
            </div>
          )}
          
          {questions.length > 0 && renderQuestion()}
        </div>
      </CardContent>
    </Card>
  );
};

export default MCQQuiz;