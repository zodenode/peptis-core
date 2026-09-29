import type { Answers } from '../src/data/quiz'
import type { PlanIntake, Program } from '../src/lib/program'
export const PROFILE_VERSION: number
export const CONSENT_VERSION: string
export function cleanAnswers(input: unknown): Answers
export function derivePathways(input: unknown): string[]
export function planIntakeFromAnswers(input: unknown): PlanIntake | null
export function cleanPlanIntake(input: unknown): PlanIntake | null
export function programText(program: Program): string
