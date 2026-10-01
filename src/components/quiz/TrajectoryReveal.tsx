import { useEffect, useRef } from 'react'
import { medicationLabel, providerLabel } from '../../data/planBuild'
import type { Answers } from '../../data/quiz'
import { track } from '../../lib/analytics'
import { planIntakeFromAnswers } from '../../../shared/profile.mjs'
import { PersonalisedPlanPreview } from './PersonalisedPlanPreview'

type Props = {
  firstName: string
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

export function TrajectoryReveal({ firstName, answers, pathways, onContinue, onBack, canGoBack }: Props) {
  const viewedRef = useRef(false)
  const focuses = pathways.map(pathway => focusDetails[pathway]).filter(Boolean)
  const focus = focuses[0] ?? {
    label: 'continuity readiness',
    weekFour: 'Review what you completed, what felt realistic and what needs adjusting.',
  }
  const intake = planIntakeFromAnswers(answers)
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
      body: answers.training_habit === '0' ? 'Record a comfortable everyday strength task and your usual meals before your first practice session.' : 'Record the sessions you currently complete and one everyday strength task you can repeat.',
    },
    {
      time: 'First 7 days',
      title: 'Choose the minimum',
      body: `Plan ${intake?.days ?? 2} strength slots${setting ? ` ${setting}` : ''}.${answers.training_habit === '1' && intake?.days === 3 ? ' Establish two comfortable sessions before adding the third.' : ''} ${answers.protein_habit === 'most_meals' ? 'Keep the protein-containing meals you already manage.' : 'Choose one familiar protein-containing food for a meal that often lacks it.'}`,
    },
    {
      time: 'Week 4',
      title: focuses.length > 1 ? 'Review your selected priorities' : `Check ${focus.label}`,
      body: focuses.length ? focuses.map(item => item.weekFour).join(' ') : focus.weekFour,
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
        <h1 className="quiz-title">{firstName ? `${firstName}, here` : 'Here'} is your starter plan.</h1>
        <p className="trajectory-intro">
          Your sessions and nutrition actions follow the answers you gave. Start this week, then use the review points below to check what fits.
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
          <svg viewBox="0 0 540 130" role="img" aria-label="Five review points: today, first seven days, week four, week eight and week twelve">
            <path
              className="trajectory-line-base"
              d="M32 65 L508 65"
            />
            <path
              className="trajectory-line"
              pathLength="1"
              d="M32 65 L508 65"
            />
            {[
              [32, 65],
              [150, 65],
              [268, 65],
              [390, 65],
              [508, 65],
            ].map(([cx, cy], index) => (
              <g key={`${cx}-${cy}`} className="trajectory-node" style={{ animationDelay: `${0.35 + index * 0.24}s` }}>
                <circle className="trajectory-node-ring" cx={cx} cy={cy} r="10" />
                <circle cx={cx} cy={cy} r="4" />
                <text x={cx} y={cy + 33} textAnchor="middle">{['Today','7 days','Week 4','Week 8','Week 12'][index]}</text>
              </g>
            ))}
          </svg>
          <figcaption>
            Review points for your routine. These do not predict weight, muscle or symptom changes.
          </figcaption>
        </figure>

        <PersonalisedPlanPreview answers={answers} />

        <ol className="trajectory-milestones">
          {milestones.map((milestone, index) => (
            <li key={milestone.time} style={{ animationDelay: `${0.1 * index}s` }}>
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
            Save my summary
          </button>
        </div>
      </div>
    </div>
  )
}
