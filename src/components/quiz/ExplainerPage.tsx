import { useEffect, useRef } from 'react'
import type { ContinuityTerms } from '../../data/continuityConfig'
import { stopBlocks, type ResolvedExplainer } from '../../data/quiz'
import { track } from '../../lib/analytics'
import { QuizInfographic } from './QuizInfographic'
import { StopBlock } from './StopBlock'

type Props = {
  content: ResolvedExplainer
  terms: ContinuityTerms | null
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

export function ExplainerPage({ content, terms, onContinue, onBack, canGoBack }: Props) {
  const finished = useRef(false)

  useEffect(() => {
    finished.current = false
    track('quiz_explainer_viewed', {
      step_id: content.stepId,
      word_count: content.wordCount,
    })
    if (content.kind === 'social_proof' && content.proofId) {
      track('quiz_social_proof_viewed', {
        proof_id: content.proofId,
        word_count: content.wordCount,
        pathway: content.pathway ?? 'general',
      })
    }
  }, [content.kind, content.pathway, content.proofId, content.stepId, content.wordCount])

  const finish = () => {
    if (finished.current) return
    finished.current = true
    onContinue()
  }

  if (content.kind === 'stop_block' && content.block) {
    return (
      <StopBlock
        step={stopBlocks[content.block]}
        terms={terms}
        onContinue={finish}
        onBack={onBack}
        canGoBack={canGoBack}
      />
    )
  }

  return (
    <div className="quiz-card explainer-card">
      <QuizInfographic stepId={content.stepId} />
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
          <button type="button" className="btn btn-solid" onClick={finish}>
            {content.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
