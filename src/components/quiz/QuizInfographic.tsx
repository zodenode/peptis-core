import { useId } from 'react'

type Props = {
  stepId: string
  dark?: boolean
}

type InfographicConfig = {
  title: string
  caption: string
  center: string
  items: string[]
  tone: 'sage' | 'coral' | 'berry'
}

const configurations: Record<string, InfographicConfig> = {
  explain_q1: {
    title: 'Build a useful timeline',
    caption: 'Organize what is happening now and what may need attention next.',
    center: 'Timeline',
    items: ['Now', 'Changes', 'Questions'],
    tone: 'sage',
  },
  explain_q2: {
    title: 'Keep the whole picture visible',
    caption: 'These priorities can overlap, so the quiz records them together.',
    center: 'Continuity',
    items: ['Strength', 'Energy', 'Comfort', 'Maintenance'],
    tone: 'coral',
  },
  explain_q3: {
    title: 'Track function in daily life',
    caption: 'Everyday tasks can provide useful context alongside body weight.',
    center: 'Function',
    items: ['Stairs', 'Carrying', 'Rising'],
    tone: 'sage',
  },
  explain_q4: {
    title: 'Give energy more context',
    caption: 'Timing and routine notes can make fatigue easier to discuss.',
    center: 'Energy',
    items: ['Sleep', 'Fluids', 'Food', 'Timing'],
    tone: 'berry',
  },
  explain_q5: {
    title: 'Record digestive patterns',
    caption: 'Simple observations can help organize a future conversation.',
    center: 'Comfort',
    items: ['Meals', 'Timing', 'Symptoms'],
    tone: 'coral',
  },
  explain_q6: {
    title: 'Connect the strength basics',
    caption: 'Training, food and recovery each add useful planning context.',
    center: 'Strength',
    items: ['Train', 'Protein', 'Recover'],
    tone: 'sage',
  },
  explain_q7: {
    title: 'Notice patterns around clarity',
    caption: 'Routine observations can help separate a moment from a pattern.',
    center: 'Clarity',
    items: ['Routine', 'Sleep', 'Timing'],
    tone: 'berry',
  },
  explain_q8: {
    title: 'Prepare a clearer handoff',
    caption: 'Keep observations together so they are easier to review.',
    center: 'Record',
    items: ['Observe', 'Organize', 'Discuss'],
    tone: 'coral',
  },
  stop_a: {
    title: 'Make strength part of the plan',
    caption: 'Track function, resistance activity and practical protein habits.',
    center: 'Strength',
    items: ['Function', 'Training', 'Protein'],
    tone: 'coral',
  },
  stop_b: {
    title: 'Map the context around energy',
    caption: 'Fatigue can have more than one contributing factor.',
    center: 'Energy',
    items: ['Sleep', 'Nutrition', 'Fluids', 'Therapy'],
    tone: 'berry',
  },
  stop_c: {
    title: 'Turn symptoms into useful notes',
    caption: 'Record meals, timing and comfort without guessing at the cause.',
    center: 'Comfort',
    items: ['Meals', 'Timing', 'Notes'],
    tone: 'coral',
  },
  proof_muscle: {
    title: 'A practical strength record',
    caption: 'Bring together changes in function, training and food.',
    center: 'Record',
    items: ['Function', 'Training', 'Food'],
    tone: 'sage',
  },
  proof_energy: {
    title: 'A practical energy record',
    caption: 'Look for patterns across the day and across your routine.',
    center: 'Pattern',
    items: ['Morning', 'Afternoon', 'Evening'],
    tone: 'berry',
  },
  proof_gi: {
    title: 'A practical comfort record',
    caption: 'Connect meal timing with what you notice afterward.',
    center: 'Pattern',
    items: ['Before', 'Meal', 'After'],
    tone: 'coral',
  },
  reassure: {
    title: 'You remain in control',
    caption: 'A reservation saves your place. Enrollment remains your choice.',
    center: '$0 today',
    items: ['Reserve', 'Updates', 'Decide'],
    tone: 'sage',
  },
}

const fallback: InfographicConfig = {
  title: 'Build a clearer record',
  caption: 'Organize the details that may matter in a future conversation.',
  center: 'Plan',
  items: ['Observe', 'Record', 'Discuss'],
  tone: 'sage',
}

export function QuizInfographic({ stepId, dark = false }: Props) {
  const titleId = useId()
  const descriptionId = useId()
  const config = configurations[stepId] ?? fallback

  return (
    <figure
      className={`quiz-infographic is-${config.tone}${dark ? ' is-dark' : ''}`}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="quiz-infographic-canvas" aria-hidden="true">
        <svg viewBox="0 0 400 230" preserveAspectRatio="none">
          <path d="M200 115 L88 58" />
          <path d="M200 115 L312 58" />
          <path d="M200 115 L88 178" />
          <path d="M200 115 L312 178" />
        </svg>
        <div className="quiz-infographic-center">
          <span>{config.center}</span>
        </div>
        <div className="quiz-infographic-nodes">
          {config.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <figcaption>
        <strong id={titleId}>{config.title}</strong>
        <span id={descriptionId}>{config.caption}</span>
      </figcaption>
    </figure>
  )
}
