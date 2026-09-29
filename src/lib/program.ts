import * as engine from '../../shared/program.mjs'
export type Experience = 'new' | 'returning' | 'regular'
export type Equipment = 'none' | 'dumbbells' | 'gym'
export type Sensitivity = 'knees' | 'back' | 'shoulders'
export type DaysPerWeek = 2 | 3

export type PlanIntake = {
  experience: Experience
  equipment: Equipment
  days: DaysPerWeek
  sensitivities: Sensitivity[]
  context?: Record<string, string | string[]>
}

export type Pattern = 'squat' | 'hinge' | 'push' | 'pull' | 'brace' | 'finisher'

export type Exercise = {
  slug: string
  name: string
  cue: string
  hevyTitle: string
}

export type ProgramSlot = {
  pattern: Pattern
  patternLabel: string
  exercise: Exercise
  sets: number
  reps: string
  note?: string
  weightNote?: string
}

export type ProgramDay = {
  title: string
  slots: ProgramSlot[]
}

export type Program = {
  archetype: string
  personalisationNotes: string[]
  nutritionNotes: string[]
  days: ProgramDay[]
  weightRules: string[]
  weeklyNotes: string[]
  progression: string[]
  appetiteRules: string[]
  stopRules: string[]
}


export const generateProgram: (intake: PlanIntake) => Program = engine.generateProgram
export const exerciseImage: (slug: string, frame?: 1 | 2) => string = engine.exerciseImage
export const calendarIcs: (program: Program) => string = engine.calendarIcs
export const hevyRoutines = engine.hevyRoutines
