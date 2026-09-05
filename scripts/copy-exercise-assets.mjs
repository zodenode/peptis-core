/* Copies the exercise illustration frames used by the program generator
   from @bryllim/workout-guide (CC BY-SA 4.0, Everkinetic-derived) into public/. */
import fs from 'node:fs'
import path from 'node:path'

const SLUGS = [
  'goblet-squat',
  'bodyweight-squat',
  'leg-press',
  'romanian-deadlift',
  'glute-bridge',
  'dumbbell-bench-press',
  'machine-chest-press',
  'incline-push-up',
  'wall-push-up',
  'lat-pulldown',
  'seated-row',
  'one-arm-dumbbell-row',
  'banded-row',
  'superman',
  'farmer-carry',
  'plank',
  'dead-bug',
  'bird-dog',
  'step-up',
  'standing-calf-raise',
]

const src = path.resolve('node_modules/@bryllim/workout-guide/assets')
const dest = path.resolve('public/images/exercises')
fs.mkdirSync(dest, { recursive: true })

let copied = 0
for (const slug of SLUGS) {
  for (const frame of [1, 2]) {
    const from = path.join(src, slug, `frame-${frame}.png`)
    if (!fs.existsSync(from)) {
      console.error(`MISSING: ${slug} frame ${frame}`)
      continue
    }
    fs.copyFileSync(from, path.join(dest, `${slug}-${frame}.png`))
    copied++
  }
}
console.log(`copied ${copied} frames for ${SLUGS.length} exercises`)
