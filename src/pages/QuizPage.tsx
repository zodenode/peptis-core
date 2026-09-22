import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { QuizFlow } from '../components/quiz/QuizFlow'
import { setQuizSource, track } from '../lib/analytics'

export function QuizPage() {
  const [params] = useSearchParams()

  useEffect(() => {
    const source = params.get('source')
    if (source) setQuizSource(source)
    track('quiz_start', { source: source || 'quiz' })
  }, [params])

  return (
    <div className="quiz-page">
      <Header variant="quiz" />
      <main>
        <QuizFlow />
        <p className="quiz-page-note">
          Eight core questions, then a few planning details. Email is requested after question two. See our{' '}
          <Link to="/terms">Terms</Link>, <Link to="/privacy">Privacy Notice</Link> and{' '}
          <Link to="/health-data">Consumer Health Data Notice</Link>.
        </p>
      </main>
    </div>
  )
}
