import { useEffect, useRef } from 'react'
import type { ContinuityTerms } from '../../data/continuityConfig'
import { stopBlocks, type ResolvedExplainer } from '../../data/quiz'
import { useExplainerTimer } from '../../hooks/useExplainerTimer'
import { track } from '../../lib/analytics'
import { StopBlock } from './StopBlock'

type Props = {
  content: ResolvedExplainer
  terms: ContinuityTerms | null
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

function ExplainerTimer({
  progress,
  reducedMotion,
  secondsLeft,
  dark,
}: {
  progress: number
  reducedMotion: boolean
  secondsLeft: number
  dark?: boolean
}) {
  return (
    <div className={`explainer-timer${dark ? ' is-dark' : ''}`}>
      <div
        className="explainer-timer-track"
        role="progressbar"
        aria-label={reducedMotion ? 'Reading time' : 'Auto-advance'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={reducedMotion ? 0 : Math.round(progress * 100)}
      >
        <div
          className="explainer-timer-bar"
          style={{ transform: `scaleX(${reducedMotion ? 0 : progress})` }}
        />
      </div>
      <p className="explainer-timer-label">
        {reducedMotion ? 'Continue when you are ready.' : `Continuing in ${secondsLeft}s`}
      </p>
    </div>
  )
}

export function ExplainerPage({ content, terms, onContinue, onBack, canGoBack }: Props) {
  const finished = useRef(false)

  useEffect(() => {
    finished.current = false
    track('quiz_explainer_viewed', {
      step_id: content.stepId,
      duration_ms: content.durationMs,
      word_count: content.wordCount,
    })
    if (content.kind === 'social_proof' && content.proofId) {
      track('quiz_social_proof_viewed', {
        proof_id: content.proofId,
        duration_ms: content.durationMs,
        word_count: content.wordCount,
        pathway: content.pathway ?? 'general',
      })
    }
  }, [
    content.durationMs,
    content.kind,
    content.pathway,
    content.proofId,
    content.stepId,
    content.wordCount,
  ])

  const finish = (source: 'auto' | 'cta') => {
    if (finished.current) return
    finished.current = true
    if (source === 'auto') {
      track('quiz_explainer_auto_advanced', {
        step_id: content.stepId,
        duration_ms: content.durationMs,
        word_count: content.wordCount,
      })
      if (content.kind === 'social_proof' && content.proofId) {
        track('quiz_social_proof_auto_advanced', {
          proof_id: content.proofId,
          duration_ms: content.durationMs,
          word_count: content.wordCount,
          pathway: content.pathway ?? 'general',
        })
      }
    }
    onContinue()
  }

  const timer = useExplainerTimer(content.durationMs, () => finish('auto'))

  if (content.kind === 'stop_block' && content.block) {
    return (
      <StopBlock
        step={stopBlocks[content.block]}
        terms={terms}
        onContinue={() => finish('cta')}
        onBack={onBack}
        canGoBack={canGoBack}
      >
        <ExplainerTimer
          progress={timer.progress}
          reducedMotion={timer.reducedMotion}
          secondsLeft={timer.secondsLeft}
          dark
        />
      </StopBlock>
    )
  }

  return (
    <div className="quiz-card explainer-card">
      <ExplainerTimer
        progress={timer.progress}
        reducedMotion={timer.reducedMotion}
        secondsLeft={timer.secondsLeft}
      />
      <div className="quiz-visual">
        <img src={content.image} alt={content.imageAlt} />
      </div>
      <div className="quiz-body">
        <p className="quiz-kicker">{content.eyebrow}</p>
        <h1 className="quiz-title">{content.title}</h1>
        {content.body.map((paragraph, index) => {
          const isHint = content.kind === 'insight' && index === content.body.length - 1
          return (
            <p key={paragraph.slice(0, 48)} className={isHint ? 'quiz-hint' : 'explainer-copy'}>
              {paragraph}
            </p>
          )
        })}
        <div className="quiz-actions">
          <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="button" className="btn btn-solid" onClick={() => finish('cta')}>
            {content.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
