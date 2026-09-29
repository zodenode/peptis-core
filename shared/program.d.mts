import type { PlanIntake, Program } from '../src/lib/program'
export function generateProgram(intake: PlanIntake): Program
export function exerciseImage(slug: string, frame?: 1 | 2): string
export function calendarIcs(program: Program): string
export function hevyRoutines(program: Program): unknown[]
