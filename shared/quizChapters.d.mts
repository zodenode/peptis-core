import type { Answers } from '../src/data/quiz'
export const QUIZ_CHAPTERS: Array<{ id: string; label: string; reward: string; next: string }>
export function quizChapterState(step: string, answers?: Answers, microProgress?: number): { index: number; progress: number; complete: boolean; position: number }
export const ROUTINE_FIELDS: string[]
export function routineReady(answers?: Answers): boolean
