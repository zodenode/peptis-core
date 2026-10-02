import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Answers } from '../../data/quiz'
import { QUIZ_CHAPTERS, quizChapterState } from '../../../shared/quizChapters.mjs'

export function ChapterProgress({ step, answers, microProgress }: { step: string; answers: Answers; microProgress: number }) {
  const state = quizChapterState(step, answers, microProgress)
  const previous = useRef(state.position)
  const earned = useRef(new Set(Array.from({ length: state.position }, (_, index) => index)))
  const [reward, setReward] = useState<number | null>(null)
  const expiry = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (state.position > previous.current) {
      const completed = state.position - 1
      if (!earned.current.has(completed)) {
        earned.current.add(completed)
        setReward(completed)
        if (expiry.current) clearTimeout(expiry.current)
        expiry.current = setTimeout(() => setReward(null), 3200)
      }
    }
    previous.current = state.position
  }, [state.position])
  useEffect(() => () => { if (expiry.current) clearTimeout(expiry.current) }, [])

  return <section className="chapter-progress" aria-label="Quiz chapters">
    <div className="chapter-heading"><span>{state.complete ? 'Your check is complete' : `Chapter ${state.index + 1} of ${QUIZ_CHAPTERS.length}`}</span><strong>{QUIZ_CHAPTERS[state.index].label}</strong></div>
    <ol className="chapter-track">{QUIZ_CHAPTERS.map((chapter, index) => {
      const done = state.complete || index < state.index
      const active = !state.complete && index === state.index
      const fill = done ? 100 : active ? state.progress : 0
      return <li key={chapter.id} className={`${done ? 'is-done' : active ? 'is-active' : ''}`} aria-current={active ? 'step' : undefined}>
        <span className="chapter-token" aria-hidden="true">{done ? '✓' : index + 1}</span><span className="chapter-label">{chapter.label}<span className="visually-hidden">{done ? ', complete' : active ? ', current chapter' : ', upcoming'}</span></span>
        <div className="chapter-bar" role="progressbar" aria-label={`${chapter.label} chapter`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={fill}><span style={{ width: `${fill}%` }} /></div>
      </li>
    })}</ol>
    <div className="chapter-reward-slot" role="status" aria-live="polite" aria-atomic="true">{reward !== null ? <div className="chapter-reward" key={reward}><span className="chapter-reward-star" aria-hidden="true">★</span><div><strong>{QUIZ_CHAPTERS[reward].reward}</strong><span>{QUIZ_CHAPTERS[reward].next}</span></div><span className="chapter-sparks" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ '--spark-index': index } as CSSProperties} />)}</span></div> : null}</div>
  </section>
}
