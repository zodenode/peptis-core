import { cleanAnswers, planIntakeFromAnswers, PROFILE_VERSION } from '../../shared/profile.mjs'
import type { PlanIntake } from './program'
export const QUIZ_STORAGE_KEY = 'peptis.continuity.quiz'
export const INTAKE_KEY = 'peptis.plan.intake'
export function quizPlan(): PlanIntake | null {
  try {
    const saved = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) || 'null')
    if (saved?.version !== PROFILE_VERSION || !saved?.checkout?.healthConsent) return null
    return planIntakeFromAnswers(cleanAnswers(saved.answers))
  } catch { return null }
}
