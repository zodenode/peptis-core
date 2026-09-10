import { useCallback, useEffect, useRef, useState } from 'react'
import type { Answers, PlanAnswerKey } from '../../data/quiz'
import {
  medicationOptions,
  providerOptions,
  trainingSettingOptions,
  type RefinementOption,
} from '../../data/planBuild'
import { track } from '../../lib/analytics'

type Props = {
  answers: Answers
  onAnswer: (key: PlanAnswerKey, value: string) => void
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

type PromptId = PlanAnswerKey

type Stage = {
  id: string
  label: string
  start: number
  end: number
  done: boolean
}

function startingProgress(answers: Answers) {
  if (answers.training_setting) return 82
  if (answers.current_medication) return 61
  if (answers.care_provider) return 36
  return 8
}

function stageFill(stage: Stage, progress: number) {
  if (stage.done) return 100
  return Math.max(0, Math.min(100, ((progress - stage.start) / (stage.end - stage.start)) * 100))
}

function RefinementChoices({
  options,
  selected,
  onSelect,
  groupLabel,
}: {
  options: RefinementOption[]
  selected?: string
  onSelect: (id: string) => void
  groupLabel: string
}) {
  return (
    <div className="refinement-options" role="radiogroup" aria-label={groupLabel}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`refinement-option${selected === option.id ? ' is-selected' : ''}`}
          role="radio"
          aria-checked={selected === option.id}
          onClick={() => onSelect(option.id)}
        >
          <span>{option.label}</span>
          {option.detail ? <small>{option.detail}</small> : null}
        </button>
      ))}
    </div>
  )
}

export function PlanBuild({ answers, onAnswer, onContinue, onBack, canGoBack }: Props) {
  const initial = startingProgress(answers)
  const [progress, setProgress] = useState(initial)
  const [prompt, setPrompt] = useState<PromptId | null>(null)
  const [ready, setReady] = useState(false)
  const progressRef = useRef(initial)
  const frameRef = useRef<number | null>(null)
  const delayRef = useRef<number | null>(null)
  const runRef = useRef(0)
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const promptRef = useRef<HTMLElement | null>(null)

  const cancelAnimation = useCallback(() => {
    runRef.current += 1
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    if (delayRef.current !== null) window.clearTimeout(delayRef.current)
    frameRef.current = null
    delayRef.current = null
  }, [])

  const animateTo = useCallback(
    (target: number, duration: number, after: () => void) => {
      cancelAnimation()
      const run = runRef.current
      const start = progressRef.current
      const startedAt = performance.now()
      const effectiveDuration = reducedMotionRef.current ? 0 : duration

      const finish = () => {
        progressRef.current = target
        setProgress(target)
        delayRef.current = window.setTimeout(after, reducedMotionRef.current ? 40 : 240)
      }

      if (effectiveDuration === 0) {
        finish()
        return
      }

      const tick = (now: number) => {
        if (run !== runRef.current) return
        const elapsed = Math.min(1, (now - startedAt) / effectiveDuration)
        const eased = 1 - Math.pow(1 - elapsed, 3)
        const next = start + (target - start) * eased
        progressRef.current = next
        setProgress(next)
        if (elapsed < 1) {
          frameRef.current = window.requestAnimationFrame(tick)
        } else {
          finish()
        }
      }

      frameRef.current = window.requestAnimationFrame(tick)
    },
    [cancelAnimation],
  )

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!startedRef.current) {
      startedRef.current = true
      track('plan_build_started')
    }

    if (!answers.care_provider) {
      animateTo(31, 1300, () => setPrompt('care_provider'))
    } else if (!answers.current_medication) {
      animateTo(56, 1100, () => setPrompt('current_medication'))
    } else if (!answers.training_setting) {
      animateTo(78, 950, () => setPrompt('training_setting'))
    } else {
      animateTo(100, 1150, () => setReady(true))
    }

    return cancelAnimation
    // Use the answers present when this plan-building step opens. Selections advance the sequence directly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!prompt) return
    const focusDelay = window.setTimeout(() => {
      const selected = promptRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')
      const firstChoice = promptRef.current?.querySelector<HTMLElement>('button')
      const focusTarget = selected ?? firstChoice
      focusTarget?.focus()
    }, 60)
    return () => window.clearTimeout(focusDelay)
  }, [prompt])

  const completeBuild = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    track('plan_build_completed')
    setReady(true)
  }, [])

  const selectAnswer = (key: PlanAnswerKey, value: string) => {
    onAnswer(key, value)
    track('plan_build_stage_completed', { stage: key })
    setPrompt(null)

    if (key === 'care_provider') {
      animateTo(56, 1050, () => setPrompt('current_medication'))
      return
    }
    if (key === 'current_medication') {
      animateTo(78, 900, () => setPrompt('training_setting'))
      return
    }
    animateTo(100, 1200, completeBuild)
  }

  const goPromptBack = () => {
    cancelAnimation()
    if (prompt === 'training_setting') {
      setPrompt('current_medication')
      return
    }
    if (prompt === 'current_medication') {
      setPrompt('care_provider')
      return
    }
    onBack()
  }

  const stages: Stage[] = [
    {
      id: 'context',
      label: 'Treatment context',
      start: 8,
      end: 31,
      done: Boolean(answers.care_provider),
    },
    {
      id: 'medication',
      label: 'Medication record',
      start: 31,
      end: 56,
      done: Boolean(answers.current_medication),
    },
    {
      id: 'routine',
      label: 'Routine fit',
      start: 56,
      end: 78,
      done: Boolean(answers.training_setting),
    },
    {
      id: 'checkpoints',
      label: '12-week checkpoints',
      start: 78,
      end: 100,
      done: ready,
    },
  ]

  return (
    <div className={`quiz-card plan-builder-card${prompt ? ' has-prompt' : ''}`}>
      <div
        className="visually-hidden"
        role="progressbar"
        aria-label="Building your continuity map"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      />
      <div className="plan-builder-content">
        <div className="quiz-body plan-builder-body">
          <p className="quiz-kicker">Peptis continuity layer</p>
          <h1 className="quiz-title">
            We are shaping <span>your continuity map…</span>
          </h1>
          <p className="plan-builder-intro">
            Connecting your treatment context, daily routine and the priorities you chose.
          </p>

          <div className="build-stages" aria-label="Continuity map progress">
            {stages.map((stage) => {
              const fill = stageFill(stage, progress)
              const active = !stage.done && fill > 0
              return (
                <div
                  key={stage.id}
                  className={`build-stage${stage.done ? ' is-done' : ''}${active ? ' is-active' : ''}`}
                >
                  <div className="build-stage-heading">
                    <strong>{stage.label}</strong>
                    {stage.done ? (
                      <span className="build-stage-check" aria-label="Complete">
                        ✓
                      </span>
                    ) : active ? (
                      <span>{Math.round(progress)}%</span>
                    ) : (
                      <span aria-hidden="true">·</span>
                    )}
                  </div>
                  <div className="build-stage-track" aria-hidden="true">
                    <span style={{ width: `${fill}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="continuity-layer-note">
            <span>The Peptis layer</span>
            <strong>Keep the prescriber. Add the continuity record.</strong>
            <p>
              Peptis organizes strength, nutrition, routine and appointment questions around your
              existing care, even if your provider changes.
            </p>
          </aside>

          {ready ? (
            <div className="plan-builder-actions">
              <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
                ← Back
              </button>
              <button type="button" className="btn btn-solid" onClick={onContinue}>
                View my 12-week map
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {ready
          ? 'Your continuity map is ready.'
          : prompt
            ? 'One more detail will refine your continuity map.'
            : 'Building your continuity map.'}
      </p>

      {prompt ? (
        <div className="plan-prompt-layer">
          <section
            ref={promptRef}
            className="plan-prompt"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`plan-prompt-${prompt}`}
          >
            <p className="plan-prompt-kicker">One detail before we continue</p>

            {prompt === 'care_provider' ? (
              <>
                <h2 id="plan-prompt-care_provider">Who currently manages your GLP-1 prescription?</h2>
                <p className="plan-prompt-copy">Choose the service or care setting that comes closest.</p>
                <div className="provider-grid" role="radiogroup" aria-label="Current prescription provider">
                  {providerOptions.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      className={`provider-option${answers.care_provider === provider.id ? ' is-selected' : ''}`}
                      role="radio"
                      aria-checked={answers.care_provider === provider.id}
                      onClick={() => selectAnswer('care_provider', provider.id)}
                    >
                      <span className={`provider-mark is-${provider.tone}`} aria-hidden="true">
                        {provider.mark}
                      </span>
                      <span>{provider.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="plan-prompt-skip"
                  onClick={() => selectAnswer('care_provider', 'prefer_not')}
                >
                  Prefer not to say
                </button>
                <p className="plan-prompt-legal">
                  Names and marks are for identification only. Peptis is independent, and no affiliation or endorsement is implied.
                </p>
              </>
            ) : null}

            {prompt === 'current_medication' ? (
              <>
                <h2 id="plan-prompt-current_medication">Which prescription are you taking now?</h2>
                <p className="plan-prompt-copy">
                  This is context only. Medication decisions stay with your licensed clinician.
                </p>
                <RefinementChoices
                  options={medicationOptions}
                  selected={answers.current_medication}
                  groupLabel="Current prescription"
                  onSelect={(value) => selectAnswer('current_medication', value)}
                />
              </>
            ) : null}

            {prompt === 'training_setting' ? (
              <>
                <h2 id="plan-prompt-training_setting">Where would a strength routine be most realistic?</h2>
                <p className="plan-prompt-copy">Choose the setting you are most likely to use on an ordinary week.</p>
                <RefinementChoices
                  options={trainingSettingOptions}
                  selected={answers.training_setting}
                  groupLabel="Realistic strength-training setting"
                  onSelect={(value) => selectAnswer('training_setting', value)}
                />
              </>
            ) : null}

            <button type="button" className="plan-prompt-back" onClick={goPromptBack}>
              ← Back
            </button>
          </section>
        </div>
      ) : null}
    </div>
  )
}
