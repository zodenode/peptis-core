import { useState } from 'react'
import { images } from '../../data/images'
import { track } from '../../lib/analytics'
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
          <h3>A two minute check of what matters now</h3>
          <p>Answer eight straightforward questions. Your progress saves automatically if you step away.</p>
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => {
              track('quiz_cta_clicked', { location: 'embed' })
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
