import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { QuizFlow } from '../components/quiz/QuizFlow'

export function QuizPage() {
  return (
    <div className="quiz-page">
      <Header variant="quiz" />
      <main>
        <QuizFlow />
        <p className="quiz-page-note">
          The founding reservation is a waitlist, not medical care. It does not include clinician
          review, prescribing, medication or pharmacy fulfillment. Quiz answers are used to build
          your summary and improve this experience. Peptis is operated by Information Edge
          Insights LLC. See our <Link to="/privacy">Privacy Notice</Link> and{' '}
          <Link to="/health-data">Consumer Health Data Notice</Link>.
        </p>
      </main>
    </div>
  )
}
