import { useEffect, useRef } from 'react'
import { medicationLabel, providerLabel } from '../../data/planBuild'
import type { Answers } from '../../data/quiz'
import { track } from '../../lib/analytics'

type Props = {
  answers: Answers
  pathways: string[]
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

type FocusDetail = {
  label: string
  weekFour: string
}

const focusDetails: Record<string, FocusDetail> = {
  muscle_protection: {
    label: 'strength and function',
    weekFour: 'Review completed sessions, reps, loads and changes in everyday function.',
  },
  cellular_energy: {
    label: 'energy and recovery',
    weekFour: 'Review energy timing, recovery, sleep, meals and fluid tolerance.',
  },
  gi_repair: {
    label: 'digestive comfort',
    weekFour: 'Review meal size, timing and digestive comfort notes for useful patterns.',
  },
  rebound_protection: {
    label: 'maintenance',
    weekFour: 'Review routine consistency and the barriers that are worth adjusting.',
  },
}

const settingPhrases: Record<string, string> = {
  home: 'at home',
  gym: 'at a gym',
  both: 'across home and gym',
  undecided: 'in the setting you choose',
}

function currentProviderSentence(answers: Answers) {
  const provider = providerLabel(answers.care_provider)
  if (!provider || answers.care_provider === 'prefer_not') {
    return 'Your licensed clinician remains responsible for prescribing and medication decisions.'
  }
  if (answers.care_provider === 'none') {
    return 'A licensed clinician must remain responsible for any prescribing and medication decisions.'
  }
  return `${provider} stays in view as your current care setting. Its licensed clinician remains responsible for prescribing and medication decisions.`
}

export function TrajectoryReveal({ answers, pathways, onContinue, onBack, canGoBack }: Props) {
  const viewedRef = useRef(false)
  const focus = focusDetails[pathways[0]] ?? {
    label: 'continuity readiness',
    weekFour: 'Review what you completed, what felt realistic and what needs adjusting.',
  }
  const medication = medicationLabel(answers.current_medication)
  const setting = answers.training_setting ? settingPhrases[answers.training_setting] : undefined
  const showMedication =
    Boolean(medication) && answers.current_medication !== 'none' && answers.current_medication !== 'prefer_not'

  useEffect(() => {
    if (viewedRef.current) return
    viewedRef.current = true
    track('trajectory_viewed', { pathways })
  }, [pathways])

  const milestones = [
    {
      time: 'Today',
      title: 'Record your baseline',
      body: 'Capture strength, usual intake, energy and digestive comfort alongside weight.',
    },
    {
      time: 'First 7 days',
      title: 'Choose the minimum',
      body: `Set realistic strength slots${setting ? ` ${setting}` : ''} and one protein fallback for lower-appetite days.`,
    },
    {
      time: 'Week 4',
      title: `Check ${focus.label}`,
      body: focus.weekFour,
    },
    {
      time: 'Week 8',
      title: 'Adjust from evidence',
      body: 'Use what you actually completed to shape the next block. Do not change medication on your own.',
    },
    {
      time: 'Week 12',
      title: 'Prepare the handoff',
      body: 'Create a concise review for your next care conversation and the next programme block.',
    },
  ]

  return (
    <div className="quiz-card trajectory-card">
      <div className="quiz-body trajectory-body">
        <div className="trajectory-ready-mark" aria-hidden="true">
          <span>✓</span> Map ready
        </div>
        <p className="quiz-kicker">Your Peptis continuity map</p>
        <h1 className="quiz-title">You are here. Here is what you can build in 12 weeks.</h1>
        <p className="trajectory-intro">
          Your route follows practical actions and records. It is not a forecast of weight, muscle or symptoms.
        </p>

        <figure className="trajectory-figure">
          <div className="trajectory-anchor is-start">
            <span>You are here</span>
            <strong>Today</strong>
          </div>
          <div className="trajectory-anchor is-end">
            <span>Your next review</span>
            <strong>Week 12</strong>
          </div>
          <svg viewBox="0 0 540 230" role="img" aria-label="A rising route from today's baseline to a clearer 12-week review">
            <defs>
              <linearGradient id="trajectory-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7e8f6e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7e8f6e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="trajectory-area"
              d="M32 190 C92 185 112 162 150 154 C208 141 218 124 268 116 C330 105 347 80 390 73 C446 63 472 38 508 32 L508 214 L32 214 Z"
            />
            <path
              className="trajectory-line-base"
              d="M32 190 C92 185 112 162 150 154 C208 141 218 124 268 116 C330 105 347 80 390 73 C446 63 472 38 508 32"
            />
            <path
              className="trajectory-line"
              pathLength="1"
              d="M32 190 C92 185 112 162 150 154 C208 141 218 124 268 116 C330 105 347 80 390 73 C446 63 472 38 508 32"
            />
            {[
              [32, 190],
              [150, 154],
              [268, 116],
              [390, 73],
              [508, 32],
            ].map(([cx, cy], index) => (
              <g key={`${cx}-${cy}`} className="trajectory-node" style={{ animationDelay: `${0.35 + index * 0.24}s` }}>
                <circle className="trajectory-node-ring" cx={cx} cy={cy} r="10" />
                <circle cx={cx} cy={cy} r="4" />
              </g>
            ))}
          </svg>
          <figcaption>
            A programme framework for review points, not a guaranteed clinical outcome.
          </figcaption>
        </figure>

        <ol className="trajectory-milestones">
          {milestones.map((milestone) => (
            <li key={milestone.time}>
              <span>{milestone.time}</span>
              <div>
                <strong>{milestone.title}</strong>
                <p>{milestone.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="care-bridge">
          <span>Built to sit alongside current care</span>
          <strong>{currentProviderSentence(answers)}</strong>
          <p>
            Peptis adds the strength, nutrition and continuity record around that care
            {showMedication ? `, with ${medication} recorded as context` : ''}.
          </p>
        </aside>

        <div className="quiz-actions trajectory-actions">
          <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="button" className="btn btn-solid" onClick={onContinue}>
            Continue to my reservation
          </button>
        </div>
      </div>
    </div>
  )
}
