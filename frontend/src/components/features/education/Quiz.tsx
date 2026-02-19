"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const questions = [
  {
    question: "Which of these is a red flag in a phishing email?",
    options: [
      "The sender's email matches the company domain",
      "The email creates extreme urgency",
      "The email includes your full name",
      "The email has a professional signature",
    ],
    correct: 1,
    explanation: "Phishing emails often create false urgency to make you act without thinking.",
  },
  {
    question: "What should you do if you receive a suspicious email from your bank?",
    options: [
      "Click the link to check if it's real",
      "Reply asking if it's legitimate",
      "Go directly to your bank's website without clicking",
      "Forward it to your friends to warn them",
    ],
    correct: 2,
    explanation: "Never click links in suspicious emails. Always navigate to websites directly.",
  },
  {
    question: "Which password is the most secure?",
    options: [
      "password123",
      "MyDog'sName2024",
      "Tr0ub4dor&3",
      "xK9#mP2$vL5@nQ8*",
    ],
    correct: 3,
    explanation: "Long, random passwords with mixed characters are most secure. Use a password manager!",
  },
  {
    question: "What is 'smishing'?",
    options: [
      "Phishing through social media",
      "Phishing through SMS text messages",
      "Phishing through video calls",
      "Phishing through gaming platforms",
    ],
    correct: 1,
    explanation: "Smishing combines SMS + Phishing. Always be cautious of text messages with links.",
  },
  {
    question: "Why is two-factor authentication (2FA) important?",
    options: [
      "It makes logging in faster",
      "It adds a second layer of security beyond passwords",
      "It encrypts your emails",
      "It blocks all phishing emails",
    ],
    correct: 1,
    explanation: "2FA ensures that even if your password is stolen, attackers can't access your account.",
  },
  {
    question: "What should you check before clicking a link in an email?",
    options: [
      "If the email has images",
      "The actual URL by hovering over it",
      "If the email is in color",
      "The email's file size",
    ],
    correct: 1,
    explanation: "Always hover over links to see the real URL. Phishers often hide malicious URLs behind legitimate-looking text.",
  },
]

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswer = (index: number) => {
    if (showResult) return
    
    setSelectedAnswer(index)
    setShowResult(true)
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setIsComplete(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Security Quiz</h2>
          <p className="text-muted-foreground">Test your knowledge about phishing and cybersecurity.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="glass text-center">
            <CardContent className="py-12">
              <div className="inline-flex p-4 rounded-full bg-brand-500/10 text-brand-500 mb-6">
                <Trophy className="h-12 w-12" />
              </div>
              
              <h3 className="text-3xl font-bold mb-2">Quiz Complete!</h3>
              
              <p className="text-5xl font-bold gradient-text mb-4">
                {score} / {questions.length}
              </p>
              
              <p className="text-muted-foreground mb-6">
                {percentage >= 80 
                  ? "Excellent! You're well-prepared to spot phishing attacks!" 
                  : percentage >= 60 
                  ? "Good job! Review the tips to improve your score." 
                  : "Keep learning! Review the education materials and try again."}
              </p>

              <Button onClick={resetQuiz} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Take Quiz Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const current = questions[currentQuestion]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Security Quiz</h2>
        <p className="text-muted-foreground">
          Test your knowledge about phishing and cybersecurity.
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">{current.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {current.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                showResult
                  ? index === current.correct
                    ? "bg-green-500/20 border-green-500"
                    : index === selectedAnswer
                    ? "bg-red-500/20 border-red-500"
                    : "bg-muted/50 opacity-50"
                  : "bg-muted/50 hover:bg-muted hover:border-brand-500"
              } border`}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3">
                {showResult && (
                  index === current.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  ) : index === selectedAnswer ? (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  ) : null
                )}
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className={`glass ${
              selectedAnswer === current.correct 
                ? "border-green-500/50" 
                : "border-red-500/50"
            }`}>
              <CardContent className="py-4">
                <p className={`font-semibold mb-2 ${
                  selectedAnswer === current.correct ? "text-green-500" : "text-red-500"
                }`}>
                  {selectedAnswer === current.correct ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">{current.explanation}</p>
              </CardContent>
            </Card>

            <Button onClick={nextQuestion} className="w-full mt-4">
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}