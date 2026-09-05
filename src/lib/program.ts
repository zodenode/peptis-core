/* Archetype-based training program generator.
   Education only. Exercise pool maps to self-hosted illustrations
   (Everkinetic / Bryl Lim, CC BY-SA 4.0) in public/images/exercises. */

export type Experience = 'new' | 'returning' | 'regular'
export type Equipment = 'none' | 'dumbbells' | 'gym'
export type Sensitivity = 'knees' | 'back' | 'shoulders'
export type DaysPerWeek = 2 | 3

export type PlanIntake = {
  experience: Experience
  equipment: Equipment
  days: DaysPerWeek
  sensitivities: Sensitivity[]
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
}

export type ProgramDay = {
  title: string
  slots: ProgramSlot[]
}

export type Program = {
  archetype: string
  days: ProgramDay[]
  weeklyNotes: string[]
  progression: string[]
  appetiteRules: string[]
  stopRules: string[]
}

const EX: Record<string, Exercise> = {
  gobletSquat: {
    slug: 'goblet-squat',
    name: 'Goblet squat',
    cue: 'Hold one weight at your chest, sit down between your hips, stand tall.',
    hevyTitle: 'Goblet Squat',
  },
  bodyweightSquat: {
    slug: 'bodyweight-squat',
    name: 'Bodyweight squat to a chair',
    cue: 'Lower under control until you lightly touch the chair, then stand.',
    hevyTitle: 'Squat (Bodyweight)',
  },
  legPress: {
    slug: 'leg-press',
    name: 'Leg press',
    cue: 'Feet shoulder width, lower until knees are near 90 degrees, press smoothly.',
    hevyTitle: 'Leg Press (Machine)',
  },
  rdl: {
    slug: 'romanian-deadlift',
    name: 'Romanian deadlift',
    cue: 'Soft knees, push hips back, keep the weight close, stand by squeezing glutes.',
    hevyTitle: 'Romanian Deadlift (Dumbbell)',
  },
  gluteBridge: {
    slug: 'glute-bridge',
    name: 'Glute bridge',
    cue: 'Heels close to hips, press through heels, squeeze at the top, lower slowly.',
    hevyTitle: 'Glute Bridge',
  },
  dbBench: {
    slug: 'dumbbell-bench-press',
    name: 'Dumbbell bench press',
    cue: 'Wrists over elbows, lower with control, press without locking out hard.',
    hevyTitle: 'Bench Press (Dumbbell)',
  },
  machinePress: {
    slug: 'machine-chest-press',
    name: 'Machine chest press',
    cue: 'Adjust the seat so handles sit mid-chest, press smoothly, control the return.',
    hevyTitle: 'Chest Press (Machine)',
  },
  inclinePushUp: {
    slug: 'incline-push-up',
    name: 'Incline push-up',
    cue: 'Hands on a counter or bench, body in one line, chest to the edge, press away.',
    hevyTitle: 'Push Up',
  },
  wallPushUp: {
    slug: 'wall-push-up',
    name: 'Wall push-up',
    cue: 'Stand a step from the wall, lower your chest toward it, press back.',
    hevyTitle: 'Push Up',
  },
  latPulldown: {
    slug: 'lat-pulldown',
    name: 'Lat pulldown',
    cue: 'Pull the bar to your collarbone, elbows down and back, control the return.',
    hevyTitle: 'Lat Pulldown (Cable)',
  },
  seatedRow: {
    slug: 'seated-row',
    name: 'Seated cable row',
    cue: 'Tall posture, pull handles to your ribs, squeeze shoulder blades, return slowly.',
    hevyTitle: 'Seated Cable Row - V Grip (Cable)',
  },
  oneArmRow: {
    slug: 'one-arm-dumbbell-row',
    name: 'One-arm dumbbell row',
    cue: 'Support yourself on a bench or chair, pull the weight to your hip, lower slowly.',
    hevyTitle: 'Dumbbell Row',
  },
  bandRow: {
    slug: 'banded-row',
    name: 'Band row',
    cue: 'Anchor a band at chest height, pull to your ribs, squeeze, return with control.',
    hevyTitle: 'Band Row',
  },
  superman: {
    slug: 'superman',
    name: 'Superman hold',
    cue: 'Lying face down, lift chest and thighs a little, hold briefly, lower.',
    hevyTitle: 'Superman',
  },
  farmerCarry: {
    slug: 'farmer-carry',
    name: 'Farmer carry',
    cue: 'Carry a weight in each hand, tall posture, walk steadily for the distance.',
    hevyTitle: 'Farmers Walk',
  },
  plank: {
    slug: 'plank',
    name: 'Plank',
    cue: 'Elbows under shoulders, body in one line, breathe steadily.',
    hevyTitle: 'Plank',
  },
  deadBug: {
    slug: 'dead-bug',
    name: 'Dead bug',
    cue: 'Lower back gently pressed down, extend opposite arm and leg, return slowly.',
    hevyTitle: 'Dead Bug',
  },
  birdDog: {
    slug: 'bird-dog',
    name: 'Bird dog',
    cue: 'From hands and knees, reach opposite arm and leg, pause, switch sides.',
    hevyTitle: 'Bird Dog',
  },
  stepUp: {
    slug: 'step-up',
    name: 'Step-up',
    cue: 'Use a low step, drive through the front heel, control the way down.',
    hevyTitle: 'Step Up',
  },
  calfRaise: {
    slug: 'standing-calf-raise',
    name: 'Standing calf raise',
    cue: 'Rise onto the balls of your feet, pause at the top, lower slowly.',
    hevyTitle: 'Standing Calf Raise',
  },
}

const PATTERN_LABELS: Record<Pattern, string> = {
  squat: 'Squat / sit-to-stand',
  hinge: 'Hinge',
  push: 'Push',
  pull: 'Pull',
  brace: 'Carry / brace',
  finisher: 'Step / calf',
}

type Pools = Record<Pattern, Exercise[]>

function poolsFor(equipment: Equipment, sensitivities: Sensitivity[]): Pools {
  const knees = sensitivities.includes('knees')
  const back = sensitivities.includes('back')
  const shoulders = sensitivities.includes('shoulders')

  const squat: Exercise[] =
    equipment === 'gym'
      ? knees
        ? [EX.legPress, EX.gobletSquat]
        : [EX.gobletSquat, EX.legPress]
      : equipment === 'dumbbells'
        ? [EX.gobletSquat, EX.bodyweightSquat]
        : [EX.bodyweightSquat, EX.stepUp]

  const hinge: Exercise[] = back
    ? [EX.gluteBridge, EX.birdDog]
    : equipment === 'none'
      ? [EX.gluteBridge, EX.superman]
      : [EX.rdl, EX.gluteBridge]

  const push: Exercise[] = shoulders
    ? [EX.inclinePushUp, EX.wallPushUp]
    : equipment === 'gym'
      ? [EX.machinePress, EX.dbBench]
      : equipment === 'dumbbells'
        ? [EX.dbBench, EX.inclinePushUp]
        : [EX.inclinePushUp, EX.wallPushUp]

  const pull: Exercise[] =
    equipment === 'gym'
      ? [EX.latPulldown, EX.seatedRow]
      : equipment === 'dumbbells'
        ? [EX.oneArmRow, EX.bandRow]
        : [EX.bandRow, EX.superman]

  const brace: Exercise[] = back
    ? [EX.deadBug, EX.birdDog]
    : equipment === 'none'
      ? [EX.plank, EX.deadBug]
      : [EX.farmerCarry, EX.plank]

  const finisher: Exercise[] = knees
    ? [EX.calfRaise, EX.calfRaise]
    : [EX.stepUp, EX.calfRaise]

  return { squat, hinge, push, pull, brace, finisher }
}

function setsRepsFor(experience: Experience, pattern: Pattern): { sets: number; reps: string } {
  const isBrace = pattern === 'brace'
  if (experience === 'new') {
    return { sets: 2, reps: isBrace ? '20 to 30 seconds' : '8 to 12' }
  }
  if (experience === 'returning') {
    return { sets: 3, reps: isBrace ? '30 to 40 seconds' : '8 to 12' }
  }
  return { sets: 3, reps: isBrace ? '40 to 60 seconds' : '6 to 10' }
}

const PATTERN_ORDER: Pattern[] = ['squat', 'hinge', 'push', 'pull', 'brace', 'finisher']

export function generateProgram(intake: PlanIntake): Program {
  const pools = poolsFor(intake.equipment, intake.sensitivities)
  const dayNames =
    intake.days === 2 ? ['Day A', 'Day B'] : ['Day A', 'Day B', 'Day C']

  const days: ProgramDay[] = dayNames.map((title, dayIndex) => ({
    title,
    slots: PATTERN_ORDER.map((pattern) => {
      const pool = pools[pattern]
      // Alternate primary and secondary picks across days so sessions vary.
      const exercise = pool[dayIndex % pool.length]
      const { sets, reps } = setsRepsFor(intake.experience, pattern)
      return {
        pattern,
        patternLabel: PATTERN_LABELS[pattern],
        exercise,
        sets,
        reps,
        note:
          pattern === 'brace' && exercise.slug === 'farmer-carry'
            ? 'Walk 20 to 30 steps per set instead of counting repetitions.'
            : undefined,
      }
    }),
  }))

  const archetype = `${intake.days}day_${intake.equipment}_${intake.experience}`

  return {
    archetype,
    days,
    weeklyNotes: [
      `Train ${intake.days} days per week with at least one rest day between sessions.`,
      'Leave 2 to 3 repetitions in reserve on every set while technique is settling.',
      'Rest 60 to 90 seconds between sets, longer if you need it.',
      'Pair each session with a protein-forward meal or drink within a few hours.',
    ],
    progression: [
      'When every set reaches the top of the repetition range with steady technique, add a small amount of weight or 1 to 2 repetitions next session.',
      'Progress one movement at a time. It is normal for some lifts to move faster than others.',
      'Every fourth week, reduce to one set per movement if fatigue is building. Keep the habit, lower the dose.',
    ],
    appetiteRules: [
      'Low appetite day: keep the session but cut every movement to one set. Showing up matters more than volume.',
      'Stomach feels unsettled: skip the finisher, slow the pace, and choose the gentler option for each pattern.',
      'Missed a session: do not double up. Continue with the next scheduled day.',
    ],
    stopRules: [
      'Stop and contact a clinician for severe or persistent abdominal pain, fainting, inability to keep fluids down, rapidly worsening weakness, new falls, or marked functional decline.',
      'This program is education only and is not medical care or a substitute for advice from your clinician. Review it with them, especially if you have heart, kidney, joint or other medical conditions.',
    ],
  }
}

export function exerciseImage(slug: string, frame: 1 | 2 = 1) {
  return `/images/exercises/${slug}-${frame}.png`
}

/* Hevy public API routine payloads (title-based; template ids are account-specific). */
export function hevyRoutines(program: Program) {
  return program.days.map((day) => ({
    routine: {
      title: `Peptis ${day.title}`,
      folder_id: null,
      notes:
        'Peptis continuity starter program. Education only, not medical advice. Leave 2 to 3 reps in reserve.',
      exercises: day.slots.map((slot) => ({
        exercise_name: slot.exercise.hevyTitle,
        exercise_template_id: null,
        superset_id: null,
        notes: slot.exercise.cue,
        sets: Array.from({ length: slot.sets }, () => ({
          type: 'normal',
          weight_kg: null,
          reps: null,
          rep_range: slot.pattern === 'brace' ? null : { start: 8, end: 12 },
          duration_seconds: null,
          distance_meters: null,
        })),
      })),
    },
  }))
}

/* Weekly recurring calendar (8 weeks) for the chosen training days. */
export function calendarIcs(program: Program): string {
  const dayCodes = program.days.length === 2 ? ['MO', 'TH'] : ['MO', 'WE', 'FR']
  const now = new Date()
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Peptis//Continuity Starter Program//EN',
  ]
  program.days.forEach((day, i) => {
    // First occurrence: next matching weekday at 07:30 local time.
    const target = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf(dayCodes[i]) + 1
    const start = new Date(now)
    start.setDate(start.getDate() + ((target + 7 - ((start.getDay() + 6) % 7 + 1)) % 7 || 7))
    start.setHours(7, 30, 0, 0)
    const fmt = (d: Date) =>
      `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`
    const end = new Date(start.getTime() + 45 * 60000)
    lines.push(
      'BEGIN:VEVENT',
      `UID:peptis-plan-${day.title.toLowerCase().replace(/\s/g, '')}-${stamp}@peptis.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${dayCodes[i]};COUNT=8`,
      `SUMMARY:Peptis strength session (${day.title})`,
      `DESCRIPTION:${day.slots.map((s) => `${s.exercise.name} ${s.sets} sets`).join(', ')}. Education only.`,
      'END:VEVENT',
    )
  })
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
