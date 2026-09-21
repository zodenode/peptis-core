import { useState } from 'react'
import { images } from '../../data/images'
import { setQuizSource, track } from '../../lib/analytics'
import { QuizFlow } from './QuizFlow'

export function QuizEmbed() {
  const [started, setStarted] = useState(false)

  if (!started) {
    return (
      <div className="quiz-gate">
        <img
          src={images.quizWelcome}
          alt="Approachable adult seated with a blank planning card in a colorful studio"
        />
        <div>
          <p className="quiz-kicker">Continuity quiz</p>
          <h3>A short check of what matters now</h3>
          <p>
            Answer eight questions. After the first two we save your summary email. We send written
            priorities and the free starter plan.
          </p>
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => {
              setQuizSource('embed')
              track('quiz_cta_clicked', { location: 'embed' })
              track('quiz_embed_started')
              setStarted(true)
            }}
          >
            Start the quiz
          </button>
        </div>
      </div>
    )
  }

  return <QuizFlow embedded />
}
