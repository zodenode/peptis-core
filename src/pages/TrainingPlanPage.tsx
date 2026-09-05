import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { track } from '../lib/analytics'
import {
  calendarIcs,
  exerciseImage,
  generateProgram,
  hevyRoutines,
  type DaysPerWeek,
  type Equipment,
  type Experience,
  type PlanIntake,
  type Sensitivity,
} from '../lib/program'
import { postQuizProgress } from '../lib/reservations'
import { QUIZ_STORAGE_KEY } from '../hooks/useQuizEngine'

const INTAKE_KEY = 'peptis.plan.intake'

const experienceOptions: { id: Experience; label: string; hint: string }[] = [
  { id: 'new', label: 'New to resistance training', hint: 'Little or no structured lifting so far' },
  { id: 'returning', label: 'Returning after a break', hint: 'Trained before, out of routine lately' },
  { id: 'regular', label: 'Training regularly', hint: 'Lifting most weeks already' },
]

const equipmentOptions: { id: Equipment; label: string; hint: string }[] = [
  { id: 'none', label: 'No equipment', hint: 'Home, bodyweight, maybe a light band' },
  { id: 'dumbbells', label: 'Dumbbells at home', hint: 'A pair of dumbbells or adjustable set' },
  { id: 'gym', label: 'Full gym', hint: 'Machines, cables and free weights' },
]

const sensitivityOptions: { id: Sensitivity; label: string }[] = [
  { id: 'knees', label: 'Knees' },
  { id: 'back', label: 'Lower back' },
  { id: 'shoulders', label: 'Shoulders' },
]

function loadIntake(): PlanIntake | null {
  try {
    const raw = localStorage.getItem(INTAKE_KEY)
    return raw ? (JSON.parse(raw) as PlanIntake) : null
  } catch {
    return null
  }
}

function download(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function TrainingPlanPage() {
  const [intake, setIntake] = useState<PlanIntake | null>(() => loadIntake())
  const [experience, setExperience] = useState<Experience | null>(intake?.experience ?? null)
  const [equipment, setEquipment] = useState<Equipment | null>(intake?.equipment ?? null)
  const [days, setDays] = useState<DaysPerWeek | null>(intake?.days ?? null)
  const [sensitivities, setSensitivities] = useState<Sensitivity[]>(intake?.sensitivities ?? [])
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    track('plan_page_viewed', { has_saved_plan: Boolean(intake) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const program = useMemo(() => (intake ? generateProgram(intake) : null), [intake])

  const generate = () => {
    if (!experience || !equipment || !days) return
    const next: PlanIntake = { experience, equipment, days, sensitivities }
    setIntake(next)
    try {
      localStorage.setItem(INTAKE_KEY, JSON.stringify(next))
    } catch {
      // private mode
    }
    const built = generateProgram(next)
    track('plan_generated', { archetype: built.archetype })
    // Attach plan generation to the quiz progress record when a quiz exists.
    try {
      const raw = localStorage.getItem(QUIZ_STORAGE_KEY)
      if (raw) {
        const snapshot = JSON.parse(raw)
        if (snapshot?.quizId) {
          postQuizProgress({
            quizId: snapshot.quizId,
            step: 'plan_generated',
            pathways: [],
            answers: { plan_archetype: built.archetype },
          })
        }
      }
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exportPlan = (type: 'pdf' | 'ics' | 'hevy') => {
    if (!program) return
    track('plan_exported', { type, archetype: program.archetype })
    if (type === 'pdf') {
      window.print()
    } else if (type === 'ics') {
      download('peptis-strength-sessions.ics', calendarIcs(program), 'text/calendar')
    } else {
      download(
        'peptis-hevy-routines.json',
        JSON.stringify(hevyRoutines(program), null, 2),
        'application/json',
      )
    }
  }

  return (
    <div className="site plan-page">
      <Header />
      <main id="main">
        {!program ? (
          <section className="section">
            <div className="section-inner plan-intake">
              <p className="eyebrow">Continuity starter program</p>
              <h1>Build your strength program in one minute</h1>
              <p className="plan-intro">
                Four questions shape a progressive full-body program you can run at home or in a
                gym, designed around lower appetite and steady progress. It works with the apps
                and calendar you already use. Education only, not medical advice.
              </p>

              <fieldset className="plan-field">
                <legend>How experienced are you with resistance training?</legend>
                <div className="plan-options">
                  {experienceOptions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`plan-option${experience === o.id ? ' is-selected' : ''}`}
                      onClick={() => setExperience(o.id)}
                    >
                      <strong>{o.label}</strong>
                      <span>{o.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="plan-field">
                <legend>What equipment do you have?</legend>
                <div className="plan-options">
                  {equipmentOptions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`plan-option${equipment === o.id ? ' is-selected' : ''}`}
                      onClick={() => setEquipment(o.id)}
                    >
                      <strong>{o.label}</strong>
                      <span>{o.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="plan-field">
                <legend>How many days per week can you commit?</legend>
                <div className="plan-options plan-options-compact">
                  {([2, 3] as DaysPerWeek[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`plan-option${days === d ? ' is-selected' : ''}`}
                      onClick={() => setDays(d)}
                    >
                      <strong>{d} days</strong>
                      <span>{d === 2 ? 'A credible minimum' : 'More practice and volume'}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="plan-field">
                <legend>Any sensitive areas? (optional)</legend>
                <div className="plan-options plan-options-compact">
                  {sensitivityOptions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`plan-option${sensitivities.includes(o.id) ? ' is-selected' : ''}`}
                      onClick={() =>
                        setSensitivities((s) =>
                          s.includes(o.id) ? s.filter((x) => x !== o.id) : [...s, o.id],
                        )
                      }
                    >
                      <strong>{o.label}</strong>
                    </button>
                  ))}
                </div>
                <p className="plan-field-note">
                  We swap in gentler movement options. Persistent pain belongs with a clinician,
                  not a template.
                </p>
              </fieldset>

              <button
                type="button"
                className="btn btn-primary plan-generate"
                disabled={!experience || !equipment || !days}
                onClick={generate}
              >
                Build my program
              </button>
            </div>
          </section>
        ) : (
          <section className="section">
            <div className="section-inner plan-result">
              <div className="plan-result-head">
                <div>
                  <p className="eyebrow">Your continuity starter program</p>
                  <h1>
                    {program.days.length} full-body sessions a week, built for steady strength
                  </h1>
                  <p className="plan-intro">
                    Every session covers the six movement patterns that protect everyday
                    function. Alternate the days, rest at least one day between sessions, and
                    progress one small step at a time.
                  </p>
                </div>
                <div className="plan-actions no-print">
                  <button type="button" className="btn btn-primary" onClick={() => exportPlan('pdf')}>
                    Save as PDF
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => exportPlan('ics')}>
                    Add to calendar
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => exportPlan('hevy')}>
                    Export for Hevy
                  </button>
                  <button
                    type="button"
                    className="plan-restart"
                    onClick={() => {
                      setIntake(null)
                      try {
                        localStorage.removeItem(INTAKE_KEY)
                      } catch {
                        // ignore
                      }
                    }}
                  >
                    Rebuild with different answers
                  </button>
                </div>
              </div>

              {program.days.map((day) => (
                <article className="plan-day" key={day.title}>
                  <h2>{day.title}</h2>
                  <ol className="plan-slots">
                    {day.slots.map((slot) => (
                      <li className="plan-slot" key={`${day.title}-${slot.pattern}`}>
                        <div className="plan-slot-media" aria-hidden="true">
                          <img
                            src={exerciseImage(slot.exercise.slug, 1)}
                            alt=""
                            loading="lazy"
                            width={512}
                            height={512}
                          />
                          <img
                            className="plan-frame-2"
                            src={exerciseImage(slot.exercise.slug, 2)}
                            alt=""
                            loading="lazy"
                            width={512}
                            height={512}
                          />
                        </div>
                        <div className="plan-slot-copy">
                          <span className="plan-pattern">{slot.patternLabel}</span>
                          <h3>{slot.exercise.name}</h3>
                          <p className="plan-dose">
                            {slot.sets} sets of {slot.reps}
                          </p>
                          <p className="plan-cue">{slot.exercise.cue}</p>
                          {slot.note ? <p className="plan-cue">{slot.note}</p> : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}

              <div className="plan-guidance">
                <div>
                  <h2>Weekly rhythm</h2>
                  <ul>
                    {program.weeklyNotes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>How to progress</h2>
                  <ul>
                    {program.progression.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>Low appetite and rough days</h2>
                  <ul>
                    {program.appetiteRules.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="plan-legal">
                {program.stopRules.map((n) => (
                  <p key={n}>{n}</p>
                ))}
                <p>
                  Want the full picture of strength, protein and maintenance?{' '}
                  <Link to="/quiz" className="no-print-link">
                    Take the three minute continuity check.
                  </Link>
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <div className="plan-attribution">
        Exercise illustrations by{' '}
        <a href="https://github.com/everkinetic/data" rel="noreferrer" target="_blank">
          Everkinetic
        </a>{' '}
        and{' '}
        <a href="https://bryllim.com" rel="noreferrer" target="_blank">
          Bryl Lim
        </a>
        , licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          rel="noreferrer"
          target="_blank"
        >
          CC BY-SA 4.0
        </a>
        .
      </div>
      <Footer />
    </div>
  )
}
