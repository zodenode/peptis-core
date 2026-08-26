import { Header } from '../components/layout/Header'
import { QuizFlow } from '../components/quiz/QuizFlow'

export function QuizPage() {
  return (
    <div className="quiz-page">
      <Header variant="quiz" />
      <main>
        <QuizFlow />
      </main>
    </div>
  )
}
