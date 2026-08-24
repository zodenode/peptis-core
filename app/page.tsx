"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CompositionStudyGraph,
  RecompositionHeroCluster,
  RegainStudyGraph,
  TwelveWeekGraph,
} from "@/components/cinematic-experience";
import { ProblemSolutionTheatre } from "@/components/problem-solution-theatre";
import { blogPosts, problemSolutionPairs } from "@/lib/peptis-content";

type BodyReference = "male" | "female";
type UnitSystem = "metric" | "imperial";
type Goal = "leaner" | "recomp" | "muscle";
type Equipment = "gym" | "dumbbells" | "home";
type TrainingExperience = "new" | "returning" | "trained";
type SessionLength = 30 | 45 | 60;
type Step =
  | "intro"
  | "reference"
  | "current"
  | "target"
  | "measurements"
  | "training"
  | "email"
  | "result";

type WorkoutExercise = {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  effort: string;
  cue: string;
  alternative: string;
};

type WorkoutDay = {
  day: string;
  weekday: string;
  title: string;
  focus: string;
  warmup: string;
  exercises: WorkoutExercise[];
  finisher: string;
};

type PlanPhase = {
  weeks: string;
  title: string;
  detail: string;
};

type WorkoutPlan = {
  days: WorkoutDay[];
  trainingNote: string;
  progression: string;
  recoveryNote: string;
  warmup: string;
  weeklyMovement: string;
  phases: PlanPhase[];
};

const bodyStates = [
  { label: "Lean / slimmer", description: "You may want more strength, shape or confidence." },
  { label: "Balanced", description: "A mix of muscle and softness." },
  { label: "Softer", description: "You would like to shift fat gradually." },
  { label: "Athletic", description: "You already carry — or want to build — more muscle." },
] as const;

const bodyFatRanges: Record<BodyReference, readonly [number, number][]> = {
  male: [
    [10, 16],
    [17, 23],
    [24, 33],
    [11, 18],
  ],
  female: [
    [19, 25],
    [26, 33],
    [34, 42],
    [21, 29],
  ],
};

const steps: Step[] = [
  "reference",
  "current",
  "target",
  "measurements",
  "training",
  "email",
];

const goalCopy: Record<Goal, { label: string; description: string }> = {
  leaner: {
    label: "Get leaner",
    description: "Prioritise fat loss while keeping strength work in place.",
  },
  recomp: {
    label: "Recompose",
    description: "Reduce fat gradually while building strength and consistency.",
  },
  muscle: {
    label: "Build muscle",
    description: "Prioritise progressive training and enough energy to grow.",
  },
};

function clamp(value: number, lower: number, upper: number) {
  return Math.min(Math.max(value, lower), upper);
}

function round(value: number, digits = 0) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function BodyPicker({
  reference,
  value,
  onChange,
}: {
  reference: BodyReference;
  value: number | null;
  onChange: (value: number) => void;
}) {
  const imagePrefix = reference === "female" ? "women" : "men";

  return (
    <div className="human-body-grid" role="radiogroup" aria-label="Select the closest body-composition starting point">
      {bodyStates.map((state, index) => {
        const selected = value === index;
        return (
          <button
            className={`human-body-option ${selected ? "selected" : ""}`}
            key={state.label}
            onClick={() => onChange(index)}
            role="radio"
            aria-checked={selected}
            type="button"
          >
            <span
              className="human-body-art"
              style={{ backgroundImage: `url(/quiz/${imagePrefix}-${index}.png)` }}
              aria-hidden="true"
            />
            <span className="human-body-label">{state.label}</span>
            <span className="human-body-description">{state.description}</span>
          </button>
        );
      })}
    </div>
  );
}

function derivePlanGoal(
  currentBody: number | null,
  targetBody: number | null,
  selectedGoal: Goal,
): Goal {
  if (currentBody === null || targetBody === null || currentBody === targetBody) {
    return selectedGoal;
  }

  if (targetBody === 3 && currentBody !== 3) return "muscle";
  if (targetBody < currentBody) return "leaner";
  if (currentBody === 0 && targetBody >= 2) return "muscle";

  return selectedGoal;
}

function getWorkoutPlan(
  goal: Goal,
  equipment: Equipment,
  sessions: number,
  experience: TrainingExperience,
  sessionLength: SessionLength,
): WorkoutPlan {
  const movement = (name: string, cue: string, alternative: string) => ({ name, cue, alternative });
  const movements =
    equipment === "gym"
      ? {
          squat: movement("Leg press or back squat", "Brace first; keep the full foot planted and use a controlled lowering.", "Hack squat or goblet squat"),
          hinge: movement("Romanian deadlift", "Push hips back with a long spine; stop when hamstrings are loaded.", "45-degree back extension"),
          glute: movement("Hip thrust", "Tuck ribs, pause briefly at the top and avoid arching through the low back.", "Glute bridge"),
          horizontalPush: movement("Dumbbell bench press", "Keep shoulder blades set and lower the dumbbells under control.", "Chest press machine"),
          verticalPush: movement("Seated dumbbell overhead press", "Keep ribs down and finish with biceps near ears.", "Machine shoulder press"),
          horizontalPull: movement("Cable row", "Pull elbows toward hips and pause without shrugging.", "Chest-supported row"),
          verticalPull: movement("Lat pulldown", "Lead with elbows and keep your torso mostly still.", "Assisted pull-up"),
          unilateral: movement("Rear-foot-elevated split squat", "Use a long stride; let the front knee travel naturally over the toes.", "Walking lunge"),
          shoulder: movement("Cable lateral raise", "Raise in the scapular plane and stop before shoulders shrug.", "Dumbbell lateral raise"),
          arm: movement("Cable curl + rope press-down", "Use a full comfortable range and keep elbows largely still.", "Dumbbell curl + overhead triceps extension"),
          core: movement("Pallof press or dead bug", "Keep the trunk quiet; breathe out as you extend.", "Front plank"),
          carry: movement("Farmer carry", "Walk tall with slow, controlled steps and ribs stacked over hips.", "Suitcase carry"),
        }
      : equipment === "dumbbells"
        ? {
            squat: movement("Goblet squat", "Keep the dumbbell close to your chest and let knees travel with control.", "Split squat"),
            hinge: movement("Dumbbell Romanian deadlift", "Send hips back; keep dumbbells close to legs and stop before the back rounds.", "Single-leg Romanian deadlift"),
            glute: movement("Dumbbell hip thrust", "Pause at lockout while keeping ribs down.", "Glute bridge"),
            horizontalPush: movement("Dumbbell floor press", "Keep elbows about 30–45 degrees from the torso and control the descent.", "Incline push-up"),
            verticalPush: movement("Seated dumbbell press", "Press in a comfortable path with the ribs down.", "Half-kneeling single-arm press"),
            horizontalPull: movement("Single-arm dumbbell row", "Brace with the free hand and pull elbow toward the back pocket.", "Supported rear-delt row"),
            verticalPull: movement("Dumbbell pullover", "Keep arms slightly bent and stop before the shoulders feel strained.", "Band pulldown"),
            unilateral: movement("Reverse lunge", "Step back softly and drive through the full front foot.", "Split squat"),
            shoulder: movement("Dumbbell lateral raise", "Use a light load and a smooth arc; do not swing.", "Lean-away lateral raise"),
            arm: movement("Dumbbell curl + overhead triceps extension", "Keep your upper arm quiet and own the full range.", "Hammer curl + close-grip floor press"),
            core: movement("Dead bug or plank", "Keep the lower back controlled; breathe as you move.", "Side plank"),
            carry: movement("Suitcase carry", "Carry one dumbbell and resist leaning toward it.", "Farmer carry"),
          }
        : {
            squat: movement("Tempo bodyweight squat", "Use a three-second lowering and keep your whole foot grounded.", "Chair squat"),
            hinge: movement("Hip hinge or good morning", "Send hips back and keep the neck neutral.", "Banded Romanian deadlift"),
            glute: movement("Glute bridge", "Pause at the top without over-arching the low back.", "Single-leg glute bridge"),
            horizontalPush: movement("Incline push-up", "Keep a straight line from head to heels and lower with control.", "Knee push-up"),
            verticalPush: movement("Pike push-up or band press", "Keep ribs down and move through a pain-free range.", "Wall press"),
            horizontalPull: movement("Band row or towel row", "Pull elbows toward the ribs and avoid shrugging.", "Prone reverse fly"),
            verticalPull: movement("Band pulldown or prone Y-raise", "Keep shoulders down away from ears.", "Band straight-arm pulldown"),
            unilateral: movement("Reverse lunge", "Use a stable stance and push through the front foot.", "Supported split squat"),
            shoulder: movement("Band lateral raise or wall slide", "Use a smooth range that keeps the neck relaxed.", "Prone Y-raise"),
            arm: movement("Band curl + triceps press-down", "Keep elbows still and move slowly through the end range.", "Close-grip incline push-up"),
            core: movement("Dead bug or plank", "Keep the torso still and breathe slowly.", "Side plank"),
            carry: movement("Loaded-bag suitcase carry", "Hold the bag at one side and resist leaning.", "March in place with a loaded bag"),
          };

  const effort = experience === "new" ? "Stop with ~3 reps left" : experience === "returning" ? "Stop with 2–3 reps left" : "Stop with 1–2 reps left";
  const primarySets = experience === "new" ? "2" : experience === "returning" ? "3" : goal === "muscle" ? "4" : "3–4";
  const accessorySets = experience === "new" ? "2" : goal === "muscle" && experience === "trained" ? "3–4" : "3";
  const primaryReps = goal === "muscle" ? "6–10" : goal === "leaner" ? "6–10" : "7–10";
  const accessoryReps = goal === "muscle" ? "10–15" : "8–12";
  const primary = (item: ReturnType<typeof movement>): WorkoutExercise => ({
    name: item.name,
    sets: primarySets,
    reps: primaryReps,
    rest: "90–150 sec",
    effort,
    cue: item.cue,
    alternative: item.alternative,
  });
  const accessory = (item: ReturnType<typeof movement>): WorkoutExercise => ({
    name: item.name,
    sets: accessorySets,
    reps: accessoryReps,
    rest: "60–90 sec",
    effort,
    cue: item.cue,
    alternative: item.alternative,
  });
  const core = (item: ReturnType<typeof movement>): WorkoutExercise => ({
    name: item.name,
    sets: experience === "new" ? "2" : "2–3",
    reps: "8–12 / side",
    rest: "45–60 sec",
    effort: "Quality reps only",
    cue: item.cue,
    alternative: item.alternative,
  });
  const carry = (item: ReturnType<typeof movement>): WorkoutExercise => ({
    name: item.name,
    sets: experience === "new" ? "2" : "3",
    reps: "30–45 sec",
    rest: "60 sec",
    effort: "Finish with posture intact",
    cue: item.cue,
    alternative: item.alternative,
  });
  const exerciseLimit = sessionLength === 30 ? 4 : sessionLength === 45 ? 5 : 6;
  const generalWarmup = "5–7 minutes of easy cardio or marching, then 2 lighter ramp-up sets for your first lift.";
  const lowerWarmup = "5–7 minutes easy movement, then 2 lighter ramp-up sets for the first squat or hinge.";
  const upperWarmup = "5 minutes easy movement, shoulder circles and 2 lighter ramp-up sets for the first press or row.";
  const leanerFinisher = "Optional: 8–12 minutes of easy incline walking or cycling. Keep it conversational, not punishing.";
  const recompFinisher = "Finish with 5 minutes easy movement, then leave the gym with energy for tomorrow.";
  const muscleFinisher = "If recovery is good, do 1–2 easy technique sets of the first exercise; otherwise finish and recover.";
  const finisher = goal === "leaner" ? leanerFinisher : goal === "muscle" ? muscleFinisher : recompFinisher;
  const makeDay = (
    day: string,
    weekday: string,
    title: string,
    focus: string,
    warmup: string,
    exercises: WorkoutExercise[],
  ): WorkoutDay => ({
    day,
    weekday,
    title,
    focus,
    warmup,
    exercises: exercises.slice(0, exerciseLimit),
    finisher,
  });

  const days: WorkoutDay[] =
    sessions === 3
      ? [
          makeDay("Day 1", "Monday", "Full body A", "Squat · press · pull", generalWarmup, [primary(movements.squat), primary(movements.horizontalPush), primary(movements.horizontalPull), accessory(movements.hinge), accessory(movements.shoulder), core(movements.core)]),
          makeDay("Day 2", "Wednesday", "Full body B", "Hinge · upper body · single leg", generalWarmup, [primary(movements.hinge), primary(movements.verticalPush), primary(movements.verticalPull), accessory(movements.unilateral), accessory(movements.glute), carry(movements.carry)]),
          makeDay("Day 3", "Friday", "Full body C", "Repeat practice · glutes · core", generalWarmup, [primary(movements.squat), primary(movements.horizontalPush), primary(movements.horizontalPull), accessory(movements.glute), accessory(movements.arm), core(movements.core)]),
        ]
      : sessions === 4
        ? [
            makeDay("Day 1", "Monday", "Lower A", "Squat · hinge · single leg", lowerWarmup, [primary(movements.squat), primary(movements.hinge), accessory(movements.unilateral), accessory(movements.glute), core(movements.core)]),
            makeDay("Day 2", "Tuesday", "Upper A", "Press · row · shoulders", upperWarmup, [primary(movements.horizontalPush), primary(movements.horizontalPull), accessory(movements.verticalPush), accessory(movements.verticalPull), accessory(movements.shoulder), core(movements.core)]),
            makeDay("Day 3", "Thursday", "Lower B", "Glutes · quads · core", lowerWarmup, [primary(movements.glute), primary(movements.squat), accessory(movements.hinge), accessory(movements.unilateral), carry(movements.carry)]),
            makeDay("Day 4", "Friday", "Upper B", "Vertical press · pull · arms", upperWarmup, [primary(movements.verticalPush), primary(movements.verticalPull), accessory(movements.horizontalPush), accessory(movements.horizontalPull), accessory(movements.arm), core(movements.core)]),
          ]
        : [
            makeDay("Day 1", "Monday", "Lower strength", "Squat · hinge · trunk", lowerWarmup, [primary(movements.squat), primary(movements.hinge), accessory(movements.unilateral), accessory(movements.glute), core(movements.core)]),
            makeDay("Day 2", "Tuesday", "Upper push", "Press · shoulders · triceps", upperWarmup, [primary(movements.horizontalPush), primary(movements.verticalPush), accessory(movements.shoulder), accessory(movements.arm), core(movements.core)]),
            makeDay("Day 3", "Wednesday", "Upper pull", "Rows · vertical pull · carries", upperWarmup, [primary(movements.horizontalPull), primary(movements.verticalPull), accessory(movements.arm), carry(movements.carry), core(movements.core)]),
            makeDay("Day 4", "Friday", "Lower volume", "Glutes · single leg · quads", lowerWarmup, [primary(movements.glute), primary(movements.unilateral), accessory(movements.squat), accessory(movements.hinge), core(movements.core)]),
            makeDay("Day 5", "Saturday", "Full body", "Repeat the basics · keep quality high", generalWarmup, [primary(movements.squat), primary(movements.horizontalPush), primary(movements.horizontalPull), accessory(movements.hinge), accessory(movements.shoulder), carry(movements.carry)]),
          ];

  return {
    days,
    trainingNote:
      goal === "leaner"
        ? "Your visual target points toward a leaner phase. Keep the lifts challenging, add two easy cardio walks, and avoid turning every session into punishment."
        : goal === "muscle"
          ? "Your visual target points toward building more muscle. Train close to technical effort, log your reps, and add a rep or a small amount of load when form stays controlled."
          : "Your plan centres on recomposition: build strength first, keep daily steps high, and use small food adjustments rather than crash dieting.",
    progression:
      experience === "new"
        ? "For the first two weeks, stop with 2–3 good reps still available. Then add one rep before adding load."
        : experience === "returning"
          ? "Start slightly easier than your best recent training. Add a rep until the top of the range, then add a small amount of load."
          : "Use a log. When every set reaches the top of the range with controlled form, make the smallest practical load increase next time.",
    recoveryNote: sessionLength + "-minute strength sessions. Leave 1–3 reps in reserve and use non-lifting days for easy movement, mobility, or rest.",
    warmup: generalWarmup,
    weeklyMovement:
      goal === "leaner"
        ? "On two non-lifting days, take a 20–30 minute conversational walk or easy bike ride. Keep daily steps steady rather than relying on punishing workouts."
        : goal === "muscle"
          ? "Keep non-lifting movement easy: regular walks, mobility and sleep are more useful than adding hard conditioning that compromises recovery."
          : "Aim for regular daily walking, plus two 20–30 minute easy cardio sessions if they support your energy and routine.",
    phases: [
      { weeks: "Weeks 1–2", title: "Learn the pattern", detail: "Use conservative loads, stop before form degrades and make the sessions automatic." },
      { weeks: "Weeks 3–6", title: "Build", detail: "Add reps until you reach the top of the range, then make the smallest practical load increase." },
      { weeks: "Week 7", title: "Consolidate", detail: "Keep the movements but do one fewer set per exercise and leave an extra rep or two in reserve." },
      { weeks: "Weeks 8–12", title: "Progress", detail: "Return to normal sets, use the log and keep progression slow enough that recovery stays good." },
    ],
  };
}

function workoutAsText(workout: WorkoutPlan) {
  return [
    "Peptis 12-week starting routine",
    "",
    "YOUR FOCUS",
    workout.trainingNote,
    "",
    "SESSION SETUP",
    workout.warmup,
    "",
    "WEEKLY MOVEMENT",
    workout.weeklyMovement,
    "",
    "12-WEEK PROGRESSION",
    ...workout.phases.map((phase) => phase.weeks + ": " + phase.title + " — " + phase.detail),
    "",
    ...workout.days.flatMap((day) => [
      day.weekday + " · " + day.title + " — " + day.focus,
      "Warm-up: " + day.warmup,
      ...day.exercises.flatMap((exercise) => [
        "• " + exercise.name + ": " + exercise.sets + " sets × " + exercise.reps + "; rest " + exercise.rest + "; " + exercise.effort,
        "  Cue: " + exercise.cue,
        "  Alternative: " + exercise.alternative,
      ]),
      "Finish: " + day.finisher,
      "",
    ]),
  ].join("\n");
}

function csvEscape(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function workoutAsCsv(workout: WorkoutPlan) {
  const rows = [
    ["Day", "Scheduled day", "Workout", "Focus", "Warm-up", "Exercise", "Sets", "Reps", "Rest", "Effort target", "Coaching cue", "Alternative", "Session finisher"],
    ...workout.days.flatMap((day) =>
      day.exercises.map((exercise) => [
        day.day,
        day.weekday,
        day.title,
        day.focus,
        day.warmup,
        exercise.name,
        exercise.sets,
        exercise.reps,
        exercise.rest,
        exercise.effort,
        exercise.cue,
        exercise.alternative,
        day.finisher,
      ]),
    ),
  ];

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function getNextMonday() {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() + ((8 - start.getDay()) % 7));
  return start;
}

function formatCalendarDate(date: Date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function escapeCalendarValue(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replace(/\r?\n/g, "\\n");
}

function workoutAsCalendar(workout: WorkoutPlan) {
  const firstMonday = getNextMonday();
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dayOffsets: Record<string, number> = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5, Sunday: 6 };
  const events = workout.days.flatMap((day, index) => {
    const start = new Date(firstMonday);
    start.setDate(firstMonday.getDate() + dayOffsets[day.weekday]);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    const description = [
      "Warm-up: " + day.warmup,
      day.focus,
      ...day.exercises.map((exercise) => exercise.name + ": " + exercise.sets + " sets × " + exercise.reps + "; rest " + exercise.rest + "; " + exercise.effort),
      "Finish: " + day.finisher,
    ].join("\n");
    return [
      "BEGIN:VEVENT",
      `UID:peptis-${Date.now()}-${index}@peptis`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${formatCalendarDate(start)}`,
      `DTEND;VALUE=DATE:${formatCalendarDate(end)}`,
      "RRULE:FREQ=WEEKLY;COUNT=12",
      `SUMMARY:${escapeCalendarValue(`Peptis · ${day.title}`)}`,
      `DESCRIPTION:${escapeCalendarValue(description)}`,
      "END:VEVENT",
    ];
  });

  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Peptis//Starting Plan//EN", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR", ""].join("\r\n");
}

type PdfPlanSummary = {
  goal: string;
  target: string;
  protein: number;
  calorieLow: number;
  calorieHigh: number;
  sessions: number;
  sessionLength: SessionLength;
};

type PdfLine = {
  text: string;
  kind: "title" | "section" | "body" | "subtle";
};

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function downloadText(filename: string, content: string, mimeType: string) {
  downloadBlob(filename, new Blob([content], { type: mimeType }));
}

function pdfSafeText(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/×/g, "x")
    .replace(/•/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdfText(value: string) {
  return pdfSafeText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapPdfText(value: string, maximumLength = 86) {
  const words = pdfSafeText(value).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? current + " " + word : word;
    if (candidate.length <= maximumLength || !current) {
      current = candidate;
      return;
    }
    lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  return lines;
}

function workoutAsPdf(workout: WorkoutPlan, summary: PdfPlanSummary) {
  const lines: PdfLine[] = [];
  const add = (text: string, kind: PdfLine["kind"] = "body") => {
    const wrapped = kind === "title" ? [pdfSafeText(text)] : wrapPdfText(text);
    wrapped.forEach((line, index) => lines.push({ text: line, kind: index === 0 ? kind : "body" }));
  };

  add("Peptis 12-week starting plan", "title");
  add(summary.goal + " focus · " + summary.target + " visual target", "subtle");
  add(summary.sessions + "-day plan · " + summary.sessionLength + "-minute sessions", "subtle");
  add("");

  add("STARTING TARGETS", "section");
  add("Protein: " + summary.protein + " g/day");
  add("Starting energy range: " + summary.calorieLow + "–" + summary.calorieHigh + " kcal/day");
  add("");

  add("SESSION SETUP", "section");
  add(workout.warmup);
  add("Effort guide: use the rep range, stop with the stated reps in reserve, and prioritise a pain-free, controlled range.");
  add("");

  add("WEEKLY MOVEMENT", "section");
  add(workout.weeklyMovement);
  add("");

  add("12-WEEK PROGRESSION", "section");
  workout.phases.forEach((phase) => add(phase.weeks + " — " + phase.title + ": " + phase.detail));
  add("");

  workout.days.forEach((day) => {
    add(day.weekday.toUpperCase() + " · " + day.title, "section");
    add(day.focus, "subtle");
    add("Warm-up: " + day.warmup);
    day.exercises.forEach((exercise) => {
      add(exercise.name + " — " + exercise.sets + " sets x " + exercise.reps + "; rest " + exercise.rest + "; " + exercise.effort);
      add("Cue: " + exercise.cue, "subtle");
      add("Alternative: " + exercise.alternative, "subtle");
    });
    add("Finish: " + day.finisher);
    add("");
  });

  add("NOTE", "section");
  add("This is general fitness education, not medical advice or an individual treatment plan.", "subtle");

  const maximumLinesPerPage = 43;
  const pages: PdfLine[][] = [];
  for (let index = 0; index < lines.length; index += maximumLinesPerPage) {
    pages.push(lines.slice(index, index + maximumLinesPerPage));
  }

  const pageObjectIds = pages.map((_, index) => 5 + index * 2);
  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [" + pageObjectIds.map((id) => id + " 0 R").join(" ") + "] /Count " + pages.length + " >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];

  pages.forEach((page, index) => {
    let verticalPosition = 744;
    const commands: string[] = [];
    page.forEach((line) => {
      const font = line.kind === "title" || line.kind === "section" ? "F2" : "F1";
      const size = line.kind === "title" ? 20 : line.kind === "section" ? 10.5 : line.kind === "subtle" ? 8 : 9.2;
      const lineHeight = line.kind === "title" ? 27 : line.kind === "section" ? 17 : line.kind === "subtle" ? 12 : 13;
      if (!line.text) {
        verticalPosition -= 7;
        return;
      }
      commands.push("BT", "/" + font + " " + size + " Tf", "1 0 0 1 54 " + verticalPosition + " Tm", "(" + escapePdfText(line.text) + ") Tj", "ET");
      verticalPosition -= lineHeight;
    });

    const content = commands.join("\n");
    const pageObjectId = 5 + index * 2;
    const contentObjectId = pageObjectId + 1;
    objects[pageObjectId - 1] = "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /MediaBox [0 0 612 792] /Contents " + contentObjectId + " 0 R >>";
    objects[contentObjectId - 1] = "<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream";
  });

  let document = "%PDF-1.4\n%Peptis\n";
  const offsets: number[] = [0];
  objects.forEach((object, index) => {
    offsets.push(document.length);
    document += index + 1 + " 0 obj\n" + object + "\nendobj\n";
  });

  const xrefOffset = document.length;
  document += "xref\n0 " + (objects.length + 1) + "\n";
  document += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    document += String(offset).padStart(10, "0") + " 00000 n \n";
  });
  document += "trailer\n<< /Size " + (objects.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF";

  return document;
}

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [reference, setReference] = useState<BodyReference | null>(null);
  const [currentBody, setCurrentBody] = useState<number | null>(null);
  const [targetBody, setTargetBody] = useState<number | null>(null);
  const [units, setUnits] = useState<UnitSystem>("metric");
  const [age, setAge] = useState(31);
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(80);
  const [waistCm, setWaistCm] = useState<number | null>(null);
  const [goal, setGoal] = useState<Goal>("recomp");
  const [equipment, setEquipment] = useState<Equipment>("gym");
  const [sessions, setSessions] = useState(3);
  const [experience, setExperience] = useState<TrainingExperience>("new");
  const [sessionLength, setSessionLength] = useState<SessionLength>(45);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "saving" | "saved" | "unavailable">("idle");
  const [exportStatus, setExportStatus] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("start") === "1") {
      const startTimer = window.setTimeout(() => setStep("reference"), 0);
      return () => window.clearTimeout(startTimer);
    }
  }, []);

  const progress = step === "intro" || step === "result" ? 0 : ((steps.indexOf(step) + 1) / steps.length) * 100;

  const result = useMemo(() => {
    const activeReference = reference ?? "male";
    const bodyIndex = currentBody ?? 1;
    const targetIndex = targetBody ?? bodyIndex;
    const planGoal = derivePlanGoal(currentBody, targetBody, goal);
    let [low, high] = bodyFatRanges[activeReference][bodyIndex];
    const [targetBodyFatLow, targetBodyFatHigh] = bodyFatRanges[activeReference][targetIndex];
    const waistToHeight = waistCm ? waistCm / heightCm : null;
    if (waistToHeight) {
      const adjustment = waistToHeight > 0.56 ? 3 : waistToHeight > 0.51 ? 1.5 : waistToHeight < 0.43 ? -1 : 0;
      low = clamp(round(low + adjustment), 5, 55);
      high = clamp(round(high + adjustment), 6, 58);
    }
    const leanLow = weightKg * (1 - high / 100);
    const leanHigh = weightKg * (1 - low / 100);
    const bmi = weightKg / (heightCm / 100) ** 2;
    const bmr = activeReference === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    const activityFactor = sessions <= 2 ? 1.35 : sessions <= 4 ? 1.5 : 1.65;
    const maintenance = bmr * activityFactor;
    const calorieRange =
      planGoal === "leaner"
        ? [maintenance - 450, maintenance - 300]
        : planGoal === "muscle"
          ? [maintenance + 150, maintenance + 300]
          : [maintenance - 200, maintenance - 50];
    const protein = planGoal === "muscle" ? weightKg * 2 : weightKg * 1.8;
    return {
      bodyFatLow: low,
      bodyFatHigh: high,
      targetBodyFatLow,
      targetBodyFatHigh,
      leanLow,
      leanHigh,
      bmi,
      maintenance,
      calorieRange,
      protein,
      planGoal,
      currentLabel: bodyStates[bodyIndex].label,
      targetLabel: bodyStates[targetIndex].label,
      visualPath: `${bodyStates[bodyIndex].label} → ${bodyStates[targetIndex].label}`,
    };
  }, [age, currentBody, goal, heightCm, reference, sessions, targetBody, waistCm, weightKg]);

  const workout = useMemo(
    () => getWorkoutPlan(result.planGoal, equipment, sessions, experience, sessionLength),
    [equipment, experience, result.planGoal, sessionLength, sessions],
  );

  const goBack = () => {
    const current = steps.indexOf(step);
    if (current <= 0) {
      setStep("intro");
      return;
    }
    setStep(steps[current - 1]);
  };

  const goNext = () => {
    const current = steps.indexOf(step);
    if (current >= 0 && current < steps.length - 1) setStep(steps[current + 1]);
  };

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || !email.trim()) return;
    setLeadStatus("saving");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, goal: result.planGoal, source: "peptis-body-composition-quiz" }),
      });
      setLeadStatus(response.ok ? "saved" : "unavailable");
    } catch {
      setLeadStatus("unavailable");
    }
    setStep("result");
  }

  function exportCsv() {
    downloadText("peptis-12-week-workout.csv", workoutAsCsv(workout), "text/csv;charset=utf-8");
    setExportStatus("Your spreadsheet-friendly workout CSV is downloading.");
  }

  function exportCalendar() {
    downloadText("peptis-12-week-schedule.ics", workoutAsCalendar(workout), "text/calendar;charset=utf-8");
    setExportStatus("Your 12-week calendar schedule is downloading.");
  }

  function exportPdf() {
    const pdf = workoutAsPdf(workout, {
      goal: goalCopy[result.planGoal].label,
      target: result.targetLabel,
      protein: round(result.protein),
      calorieLow: round(result.calorieRange[0]),
      calorieHigh: round(result.calorieRange[1]),
      sessions,
      sessionLength,
    });
    downloadBlob("peptis-12-week-starting-plan.pdf", new Blob([pdf], { type: "application/pdf" }));
    setExportStatus("Your detailed PDF plan is downloading.");
  }

  async function copyWorkout() {
    const planText = workoutAsText(workout);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(planText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = planText;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand("copy");
        textArea.remove();
        if (!copied) throw new Error("Copy failed");
      }
      setExportStatus("Workout copied. You can paste it into your preferred training tracker.");
    } catch {
      setExportStatus("Copy is unavailable in this browser. Download the CSV instead.");
    }
  }

  const metricWeight = round(weightKg, 1);
  const imperialWeight = round(weightKg * 2.20462, 1);
  const roundedTotalInches = Number.isFinite(heightCm) ? Math.round(heightCm / 2.54) : 0;
  const feet = Math.floor(roundedTotalInches / 12);
  const inches = roundedTotalInches % 12;

  return (
    <main className="app-shell">
      <div className="ambient orb-one" />
      <div className="ambient orb-two" />
      <nav className="topbar apple-chrome" aria-label="Peptis navigation">
        <div className="topbar-shell">
          <button className="wordmark" onClick={() => setStep("intro")} type="button" aria-label="Return to Peptis start">
            <span aria-hidden="true" />
          </button>
          <div className="topbar-site-links">
            <button aria-current={step === "intro" ? "page" : undefined} onClick={() => setStep("intro")} type="button">Recomposition</button>
            <Link href="/glp-continuity">GLP-1 continuity</Link>
            <Link href="/blog">Evidence</Link>
          </div>
          <div className="topbar-actions">
            <span className="clinical-signal"><i />Evidence-led</span>
            <button className="topbar-quiz-cta" data-pressable onClick={() => setStep("reference")} type="button">Build my plan <span>↗</span></button>
          </div>
        </div>
      </nav>

      {step !== "intro" && step !== "result" ? (
        <div className="progress-shell" aria-label={`Quiz progress: ${Math.round(progress)}% complete`}>
          <div className="progress-label"><span>YOUR STARTING POINT</span><span>{Math.round(progress)}%</span></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        </div>
      ) : null}

      {step === "intro" ? (
        <div className="landing-page">
          <section className="peptis-hero" id="quiz-start" aria-labelledby="hero-title">
            <div className="hero-image" data-parallax style={{ backgroundImage: "url(/peptis-hero-recomposition.webp)" }} aria-hidden="true" />
            <div className="hero-copy hero-copy-overlay">
              <div className="hero-label-row"><p className="eyebrow">PEPTIS · BODY RECOMPOSITION</p><span><i className="hero-live-dot" />QUIZ · 3 MINUTES</span></div>
              <h1 id="hero-title">Don&apos;t just lose weight. Rebuild what helps you keep it off.</h1>
              <p className="hero-body">Peptis turns your body-composition direction, training experience and real week into a practical 12-week starting plan — with strength work, protein targets and a routine you can actually repeat.</p>
              <div className="hero-actions">
                <button className="primary-button" data-pressable onClick={() => setStep("reference")} type="button">Build my starting plan <span>↗</span></button>
                <p>No progress photos · PDF included</p>
              </div>
              <a className="hero-secondary-link" href="#inside-plan">See exactly what&apos;s inside <span>↓</span></a>
              <div className="hero-proof-row" aria-label="Peptis plan features"><span>Body direction</span><i>•</i><span>Training plan</span><i>•</i><span>Calendar-ready</span></div>
              <p className="hero-safety">For adults only. General fitness education — not a diagnosis, prescription or change to a clinician-led plan.</p>
            </div>
            <RecompositionHeroCluster />
          </section>

          <section className="trust-strip reveal-on-scroll" aria-label="The Peptis approach">
            <p><strong>THE PEPTIS APPROACH</strong><span>Body composition is more than a target weight.</span></p>
            <div><span>Strength</span><i>+</i><span>Protein</span><i>+</i><span>Consistency</span><i>+</i><span>Recovery</span></div>
          </section>

          <section className="pathway-switcher reveal-on-scroll" aria-labelledby="pathway-switcher-title">
            <div className="pathway-switcher-heading">
              <p className="eyebrow">CHOOSE THE SUPPORT YOU NEED TODAY</p>
              <h2 id="pathway-switcher-title">One body. Two starting paths.</h2>
            </div>
            <div className="pathway-switcher-options">
              <button data-pressable onClick={() => setStep("reference")} type="button">
                <span>01 · PERSONAL PLAN</span>
                <strong>Build my body-recomposition starting plan.</strong>
                <p>Turn your direction, equipment, training experience and real week into a detailed 12-week routine.</p>
                <b>Start the 3-minute quiz <i>↗</i></b>
              </button>
              <Link data-pressable href="/glp-continuity">
                <span>02 · TREATMENT JOURNEY</span>
                <strong>I need support around GLP-1 treatment.</strong>
                <p>Explore nutrition, strength, tolerability and maintenance support across starts, changes and transitions.</p>
                <b>See continuity care <i>↗</i></b>
              </Link>
            </div>
          </section>

          <section className="research-section" id="why">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">THE PROBLEM WITH A SCALE-ONLY PLAN</p>
              <h2>Rapid change needs more than a smaller number.</h2>
              <p>When weight changes quickly, a deliberate routine can help keep strength, protein intake and recovery in view. Peptis makes those pieces visible before you chase a target.</p>
            </div>
            <div className="research-grid">
              <article className="research-card composition-card reveal-on-scroll cinematic-card">
                <p className="card-kicker">BODY COMPOSITION · TIRZEPATIDE</p>
                <strong className="research-number" data-count-to="75" data-count-prefix="~" data-count-suffix=" / 25">~75 / 25</strong>
                <p>In a 160-person DXA substudy, roughly 75% of weight lost was fat mass and 25% was lean mass.</p>
                <CompositionStudyGraph />
                <small>Lean mass includes more than muscle, so this is not a muscle-loss percentage.</small>
              </article>
              <article className="research-card regain-card reveal-on-scroll cinematic-card">
                <p className="card-kicker">THE NEXT PHASE · SEMAGLUTIDE</p>
                <strong className="research-number">2/3</strong>
                <p>One year after stopping semaglutide and the study lifestyle programme, the extension group regained about two-thirds of the weight they had lost.</p>
                <RegainStudyGraph />
                <small>Exploratory extension: 327 participants. It describes that study — not every person.</small>
              </article>
              <article className="research-card lean-card reveal-on-scroll cinematic-card">
                <p className="card-kicker">WHAT PEPTIS MAKES VISIBLE</p>
                <strong className="research-number" data-count-to="12" data-count-suffix=" wk">12 wk</strong>
                <p>A phased starting plan gives you a weekly rhythm, progression rules, easy-movement targets and a recovery week — not just another generic workout list.</p>
                <TwelveWeekGraph />
                <small>Use it as a practical starting point, then adjust from adherence, energy and performance.</small>
              </article>
            </div>
          </section>

          <section className="home-evidence-zigzag" aria-labelledby="evidence-path-title">
            <div className="section-heading compact reveal-on-scroll">
              <p className="eyebrow">FROM CONCERN TO A USEFUL NEXT ACTION</p>
              <h2 id="evidence-path-title">The quality of weight loss is built between the scale and real life.</h2>
              <p>Four evidence-led priorities turn a vague body-composition goal into something a person can practise and measure.</p>
            </div>
            <article className="home-feature-row reveal-on-scroll">
              <div className="home-feature-image" data-parallax style={{ backgroundImage: "url(/peptis-strength-scene.webp)" }} role="img" aria-label="An adult performing a controlled squat while a trainer observes" />
              <div className="home-feature-copy"><span>01 · LEAN TISSUE AND FUNCTION</span><h3>Progressive strength gives the body a reason to keep capability.</h3><p>Resistance training is the highest-confidence behavioural tool for preserving lean tissue and strength during weight loss. Peptis translates that evidence into exact sessions, substitutions and a progression rule.</p><Link href="/blog/does-ozempic-cause-muscle-loss">What the trials actually measured <b>→</b></Link></div>
            </article>
            <article className="home-feature-row reverse reveal-on-scroll">
              <div className="home-feature-image" data-parallax style={{ backgroundImage: "url(/peptis-nutrition-ritual.webp)" }} role="img" aria-label="A small protein-forward breakfast and clear peach drink" />
              <div className="home-feature-copy"><span>02 · LOW-APPETITE NUTRITION</span><h3>Protein becomes harder—not less important—when appetite falls.</h3><p>The answer is not an enormous shake. It is a repeatable food-first rhythm, smaller protein-forward eating occasions and a convenient complete protein only when it closes a real gap.</p><Link href="/blog/how-much-protein-on-glp-1">Build a realistic protein target <b>→</b></Link></div>
            </article>
            <article className="home-feature-row reveal-on-scroll">
              <div className="home-feature-image" data-parallax style={{ backgroundImage: "url(/peptis-skin-transition.webp)" }} role="img" aria-label="An adult calmly caring for skin while looking in a mirror" />
              <div className="home-feature-copy"><span>03 · SKIN, FACE AND CONFIDENCE</span><h3>Support skin health without pretending exercise removes excess skin.</h3><p>Major volume loss, age, skin quality, genetics, smoking and sun exposure all affect retraction. Peptis helps build the shape beneath and routes significant concerns to honest specialist options.</p><Link href="/blog/ozempic-face-loose-skin-science">Separate skin science from hype <b>→</b></Link></div>
            </article>
            <article className="home-feature-row reverse reveal-on-scroll">
              <div className="home-feature-image" data-parallax style={{ backgroundImage: "url(/peptis-glp-continuity-hero.webp)" }} role="img" aria-label="An adult planning a healthy week at home" />
              <div className="home-feature-copy"><span>04 · MAINTENANCE FROM DAY ONE</span><h3>A target weight is a transition point, not the end of the system.</h3><p>Withdrawal evidence makes maintenance planning commercially and clinically relevant. Routine, strength, nutrition and monitoring should exist before a supply gap or clinician-led medication change.</p><Link href="/glp-continuity">Explore GLP-1 Continuity Care <b>→</b></Link></div>
            </article>
          </section>

          <section className="reality-section reveal-on-scroll" aria-labelledby="reality-title">
            <div className="reality-image" data-parallax style={{ backgroundImage: "url(/peptis-hero-recomposition.webp)" }} aria-hidden="true" />
            <div className="reality-copy">
              <p className="eyebrow">BUILT FOR THE MOMENT AFTER “LOSE WEIGHT”</p>
              <h2 id="reality-title">You do not need another plan that treats your body like a number.</h2>
              <p>Whether you are easing back into training, noticing that appetite has changed, or simply tired of starting over, the first job is to create a week you can repeat.</p>
              <div className="reality-checks">
                <p><strong>“I do not know where to start.”</strong><span>Begin with the amount of time, equipment and experience you actually have.</span></p>
                <p><strong>“I want shape, not just a lower weight.”</strong><span>Use strength progression, protein and recovery as inputs alongside the scale.</span></p>
                <p><strong>“I cannot maintain an extreme routine.”</strong><span>Set a sustainable starting target, then adjust from real adherence.</span></p>
              </div>
              <button className="text-action" onClick={() => setStep("reference")} type="button">Build from my real week <span>→</span></button>
            </div>
          </section>

          <section className="system-section" aria-label="How the Peptis system works">
            <div className="section-heading centered-heading reveal-on-scroll">
              <p className="eyebrow">ONE SYSTEM, BUILT AROUND YOUR ACTUAL WEEK</p>
              <h2>The plan is the product.</h2>
              <p>There is no single ideal body or magic split. Peptis starts from the inputs that genuinely change a programme.</p>
            </div>
            <div className="system-grid collective-grid" data-reveal>
              <article className="system-card body-system-card reveal-on-scroll">
                <span className="system-number">01</span>
                <div className="system-image-strip" style={{ backgroundImage: "url(/quiz/women-starting-points.png)" }} aria-hidden="true" />
                <h3>Start from today.</h3>
                <p>Choose a broad visual starting point and a realistic direction — leaner, more athletic, more strength or simply more consistent.</p>
              </article>
              <article className="system-card calendar-system-card reveal-on-scroll">
                <span className="system-number">02</span>
                <div className="system-calendar" aria-hidden="true"><small>MON</small><small>TUE</small><small>WED</small><small>THU</small><small>FRI</small><i /><i /><i /></div>
                <h3>Make the week work.</h3>
                <p>Gym or home. Three, four or five days. Thirty, forty-five or sixty minutes. Every answer changes the training prescription.</p>
              </article>
              <article className="system-card ritual-system-card reveal-on-scroll">
                <span className="system-number">03</span>
                <div className="system-ritual" aria-hidden="true"><b>PROTEIN</b><span>+</span><b>PLAN</b><span>+</span><b>CHECK-IN</b></div>
                <h3>Keep the habit simple.</h3>
                <p>Get a daily protein starting point and a routine that can sit alongside food, a clear protein shake and your real schedule.</p>
              </article>
            </div>
          </section>

          <section className="journey-section reveal-on-scroll" aria-labelledby="journey-title">
            <div className="section-heading compact">
              <p className="eyebrow">FROM A THREE-MINUTE QUIZ TO MONDAY&apos;S SESSION</p>
              <h2 id="journey-title">A useful plan should make the next decision easier.</h2>
              <p>Peptis gives the first version of your programme enough detail to remove the usual friction between good intentions and a real training week.</p>
            </div>
            <ol className="journey-steps collective-sequence" data-reveal>
              <li><span>01</span><div><strong>Choose a broad starting direction.</strong><p>A visual reference makes the starting context clearer without pretending to diagnose body fat.</p></div></li>
              <li><span>02</span><div><strong>Tell us what your week can hold.</strong><p>Equipment, experience, sessions and time change the programme structure.</p></div></li>
              <li><span>03</span><div><strong>Get a phased, detailed routine.</strong><p>Exercises, sets, rep ranges, rest, effort targets, substitutions and a recovery week.</p></div></li>
              <li><span>04</span><div><strong>Take it where you will use it.</strong><p>Download a PDF, a workout CSV or a 12-week calendar file — then start with the next session.</p></div></li>
            </ol>
          </section>

          <section className="programme-section reveal-on-scroll" id="inside-plan">
            <div className="programme-image" data-parallax style={{ backgroundImage: "url(/peptis-hero-recomposition.webp)" }} aria-hidden="true" />
            <div className="programme-copy">
              <p className="eyebrow">A PLAN YOU CAN FOLLOW, NOT JUST DOWNLOAD</p>
              <h2>Detailed enough for your first real session.</h2>
              <p>Every Peptis plan includes a warm-up, exact exercises, sets, rep ranges, rest, effort targets, coaching cues and substitutions for the equipment you have.</p>
              <div className="session-preview" aria-label="Example Peptis training session">
                <div><span>MONDAY · LOWER A</span><strong>45 min</strong></div>
                <ul><li><b>Leg press or squat</b><span>3 × 6–10</span></li><li><b>Romanian deadlift</b><span>3 × 6–10</span></li><li><b>Split squat</b><span>3 × 8–12</span></li></ul>
                <p>Includes rest, effort target, form cue and an equipment swap for every movement.</p>
              </div>
              <button className="text-action" onClick={() => setStep("reference")} type="button">See how your answers change this <span>→</span></button>
            </div>
          </section>

          <section className="plan-contents-section" aria-labelledby="plan-contents-title">
            <div className="section-heading centered-heading reveal-on-scroll">
              <p className="eyebrow">WHAT YOU LEAVE WITH</p>
              <h2 id="plan-contents-title">The first version of your body-recomposition operating system.</h2>
              <p>It is not a diagnosis or a promise of a particular outcome. It is a transparent starting point with enough structure to be useful on day one.</p>
            </div>
            <div className="plan-contents-grid collective-grid" data-reveal>
              <article className="contents-card direction-card"><span className="contents-label">YOUR DIRECTION</span><strong>Body composition context</strong><p>A broad visual starting point, a target direction and an estimate with clear limitations.</p><div className="contents-path" aria-hidden="true"><i /><span>today</span><b>→</b><i /><span>direction</span></div></article>
              <article className="contents-card training-card"><span className="contents-label">YOUR TRAINING</span><strong>Sessions that fit</strong><p>Three, four or five days; gym, dumbbells or home; and the session length you can actually protect.</p><div className="contents-bars" aria-hidden="true"><i /><i /><i /><i /></div></article>
              <article className="contents-card nutrition-contents-card"><span className="contents-label">YOUR STARTING TARGETS</span><strong>Protein and energy range</strong><p>A practical calculation that you can discuss with a qualified professional when appropriate — never a substitute for clinical care.</p><div className="contents-metrics" aria-hidden="true"><b>PROTEIN</b><span>+</span><b>RECOVERY</b></div></article>
              <article className="contents-card exports-card"><span className="contents-label">YOUR NEXT STEP</span><strong>Exports you can use</strong><p>A detailed PDF, spreadsheet-friendly workout CSV and a calendar file to place the twelve-week rhythm into your week.</p><div className="contents-files" aria-hidden="true"><i>PDF</i><i>CSV</i><i>CAL</i></div></article>
            </div>
          </section>

          <section className="adapt-section">
            <div className="section-heading compact reveal-on-scroll">
              <p className="eyebrow">PERSONAL, NOT PERFORMATIVE</p>
              <h2>Your answers should change the output.</h2>
              <p>That is the difference between a visual quiz and a genuinely useful starting plan.</p>
            </div>
            <div className="adapt-grid collective-grid" data-reveal>
              <article><span>IF YOU CHOOSE</span><h3>Lean / slimmer → athletic</h3><p>Peptis shifts toward muscle-building volume, modest energy support and visible progression.</p></article>
              <article><span>IF YOU CHOOSE</span><h3>Softer → balanced</h3><p>Peptis prioritises sustainable strength work, protein and an energy range that does not demand a crash diet.</p></article>
              <article><span>IF YOU HAVE</span><h3>30 minutes at home</h3><p>Peptis uses fewer high-value movements, simple swaps and a plan you can complete before life gets in the way.</p></article>
              <article><span>IF YOU HAVE</span><h3>Four gym days</h3><p>Peptis opens a progressive upper/lower rhythm with enough recovery to make the next session better, not harder.</p></article>
            </div>
          </section>

          <section className="member-proof-section reveal-on-scroll" aria-labelledby="member-proof-title">
            <div className="member-proof-copy">
              <p className="eyebrow">PROOF THAT HAS TO BE EARNED</p>
              <h2 id="member-proof-title">We will not manufacture transformation stories.</h2>
              <p>Peptis is being built for a founding cohort. Until there are real, consented member stories, this page will not borrow someone else&apos;s before-and-after photo or write a testimonial that has not happened.</p>
              <p>That is deliberate: future proof should show the habits people could sustain, the training they completed and the context behind any result — not just a dramatic number on a scale.</p>
            </div>
            <div className="member-proof-grid">
              <article><span>FOUNDING COHORT</span><h3>Early access, built in the open.</h3><p>Join the quiz list to be considered for the first tracked Peptis programme cohort.</p></article>
              <article><span>VERIFIED STORIES</span><h3>Real people, with permission.</h3><p>Member feedback will be credited only with explicit consent and clear context around what their experience did — and did not — show.</p></article>
              <article><span>USEFUL PROOF</span><h3>More than “before” and “after.”</h3><p>The evidence we want to earn includes completed sessions, strength progress, confidence and a routine that survives real life.</p></article>
            </div>
          </section>

          <section className="considerations-section">
            <div className="section-heading compact reveal-on-scroll">
              <p className="eyebrow">GOOD PROGRAMMES HAVE GUARDRAILS</p>
              <h2>Support the parts that a rapid-loss plan can miss.</h2>
              <p>These are practical things to plan around — not reasons to self-diagnose or change medication without the clinician managing it.</p>
            </div>
            <div className="considerations-grid collective-grid" data-reveal>
              <article><span>01</span><h3>Protein can become harder to hit.</h3><p>Reduced appetite or a busy day can make adequate food less automatic. A simple daily target makes the gap visible.</p></article>
              <article><span>02</span><h3>The scale cannot see strength.</h3><p>Weight and BMI cannot tell you whether you are retaining muscle, training consistently or becoming more capable.</p></article>
              <article><span>03</span><h3>Recovery decides what you can repeat.</h3><p>Smart effort targets and easy movement days protect the habit better than trying to turn every session into punishment.</p></article>
              <article><span>04</span><h3>Maintenance deserves a plan too.</h3><p>Changing or stopping any clinician-led treatment is a separate conversation. A body-composition plan should not end at a target weight.</p></article>
            </div>
          </section>

          <section className="problem-solution-section home-problem-solution" aria-labelledby="home-problem-title">
            <div className="section-heading compact reveal-on-scroll">
              <p className="eyebrow">SIX PROBLEMS · SIX PROPORTIONATE RESPONSES</p>
              <h2 id="home-problem-title">Not every problem is solved by a product.</h2>
              <p>The Peptis system separates the programme layer, the product layer and the point where qualified clinical or specialist care belongs.</p>
            </div>
            <ProblemSolutionTheatre pairs={problemSolutionPairs} />
          </section>

          <section className="comparison-section" aria-labelledby="comparison-title">
            <div className="section-heading centered-heading reveal-on-scroll">
              <p className="eyebrow">A DIFFERENT STARTING POINT</p>
              <h2 id="comparison-title">A plan should give you more than a target weight and a generic PDF.</h2>
            </div>
            <div className="comparison-table reveal-on-scroll" role="table" aria-label="Scale-only plan compared with Peptis starting plan">
              <div className="comparison-row comparison-head" role="row"><span role="columnheader">THE DECISION</span><span role="columnheader">SCALE-ONLY PLAN</span><span role="columnheader">PEPTIS STARTING PLAN</span></div>
              <div className="comparison-row" role="row"><strong role="rowheader">What changes the output?</strong><span>Usually a target weight.</span><span>Visual direction, equipment, experience, weekly capacity and training time.</span></div>
              <div className="comparison-row" role="row"><strong role="rowheader">What do you do on Monday?</strong><span>Often unclear.</span><span>A named session with warm-up, sets, reps, rest, cues and swaps.</span></div>
              <div className="comparison-row" role="row"><strong role="rowheader">How does it progress?</strong><span>“Work harder.”</span><span>Clear rep and load rules, plus a planned consolidation week.</span></div>
              <div className="comparison-row" role="row"><strong role="rowheader">Can you take it with you?</strong><span>Usually another bookmarked page.</span><span>PDF, CSV and a calendar file built from the plan.</span></div>
            </div>
          </section>

          <section className="proof-section collective-grid" data-reveal aria-label="Peptis principles">
            <div className="proof-card"><p className="card-kicker">BUILT FOR CLARITY</p><h3>No black-box score.</h3><p>See the inputs, see the calculation assumptions and use your own performance to decide what changes next.</p></div>
            <div className="proof-card"><p className="card-kicker">BUILT FOR REAL LIFE</p><h3>Export it and use it.</h3><p>Download the detailed PDF, export workout CSV or add the 12-week schedule to a calendar.</p></div>
            <div className="proof-card"><p className="card-kicker">BUILT WITH CARE</p><h3>Your data stays yours.</h3><p>Only your email and broad plan focus are saved for the current lead flow; measurement and training answers stay in your browser.</p></div>
          </section>

          <section className="home-blog-preview" aria-labelledby="home-blog-title">
            <div className="home-blog-heading reveal-on-scroll">
              <div><p className="eyebrow">THE PEPTIS EVIDENCE LIBRARY</p><h2 id="home-blog-title">Read past the headline.</h2></div>
              <Link href="/blog">Explore all sections <span>→</span></Link>
            </div>
            <div className="home-blog-grid collective-grid" data-reveal>
              {blogPosts.slice(0, 3).map((post) => (
                <article key={post.slug}>
                  <Link className="home-blog-image" data-parallax href={`/blog/${post.slug}`} style={{ backgroundImage: `url(${post.image})` }} aria-label={`Read ${post.title}`} />
                  <span>{post.category} · {post.readTime}</span>
                  <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.dek}</p>
                  <Link href={`/blog/${post.slug}`}>Read guide <b>→</b></Link>
                </article>
              ))}
            </div>
          </section>

          <section className="faq-section reveal-on-scroll" aria-labelledby="faq-title">
            <div className="section-heading compact">
              <p className="eyebrow">THE IMPORTANT QUESTIONS</p>
              <h2 id="faq-title">Before you start.</h2>
              <p>Peptis is intentionally straightforward about what this quiz can do, what it cannot determine and where a clinician or qualified coach belongs in the process.</p>
            </div>
            <div className="faq-list">
              <details open><summary>Does the body-shape choice actually change the plan?</summary><p>Yes. It helps set the broad body-composition estimate and, together with the target direction, can shift the plan toward getting leaner, recomposition or building muscle. It is a rough context tool, not a scan or diagnosis.</p></details>
              <details><summary>Is this a body-fat measurement?</summary><p>No. The visual selection and optional waist input produce a broad estimate only. The most useful early feedback is usually consistency, strength performance, energy and how you feel — not a false sense of precision.</p></details>
              <details><summary>Do I need to be using a GLP-1 medicine?</summary><p>No. Peptis is designed for everyday body recomposition. If you are using, starting, stopping or changing clinician-led treatment, keep those decisions with the clinician managing your care.</p></details>
              <details><summary>Can I use the plan with a home set-up?</summary><p>Yes. Choose home or dumbbells in the quiz. The plan swaps movements and uses the time you have available rather than forcing a gym-only routine.</p></details>
              <details><summary>What information is saved?</summary><p>In the current lead flow, only the email address and broad plan focus are submitted. Measurement and training selections are used in the browser to create the plan and are not submitted with that form.</p></details>
              <details><summary>Can I add the routine to my calendar or favourite workout app?</summary><p>The result includes a calendar file that can be imported into many calendar apps, a workout CSV and copyable plan text. Direct account integrations can be added later; the current version keeps the export portable.</p></details>
            </div>
          </section>

          <section className="landing-cta reveal-on-scroll">
            <div>
              <p className="eyebrow">START WITH YOUR REAL LIFE</p>
              <h2>Build the first version of a body you can live in.</h2>
              <p>Choose a visual starting point, tell us what your week can hold and leave with a clear 12-week plan — not a judgement. Join the founding list when you save it.</p>
            </div>
            <button className="primary-button" onClick={() => setStep("reference")} type="button">Start the Peptis quiz <span>→</span></button>
          </section>

          <section className="sources-section" aria-label="Research sources">
            <p className="card-kicker">RESEARCH NOTES</p>
            <ol>
              <li><a href="https://dom-pubs.onlinelibrary.wiley.com/doi/10.1111/dom.16275" target="_blank" rel="noreferrer">SURMOUNT-1 DXA substudy: body composition changes with tirzepatide.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/35441470/" target="_blank" rel="noreferrer">STEP 1 extension: weight regain after semaglutide withdrawal.</a></li>
              <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8089287/" target="_blank" rel="noreferrer">STEP 1 exploratory DXA analysis: semaglutide and body composition.</a></li>
              <li><a href="https://www.wegovy.com/prescribing-information.html" target="_blank" rel="noreferrer">Approved semaglutide prescribing information: common and serious safety information.</a></li>
            </ol>
          </section>
        </div>
      ) : null}

      {step === "reference" ? (
        <QuestionFrame eyebrow="STEP 1 OF 6" title="Choose the visual set that feels most useful." detail="Use whichever collection best represents you. It only calibrates the broad starting estimate — it does not define your identity or what you can achieve." onBack={goBack} onNext={goNext} nextDisabled={!reference}>
          <div className="reference-choice visual-reference-choice">
            {(["male", "female"] as const).map((option) => (
              <button className={`reference-option ${reference === option ? "selected" : ""}`} key={option} onClick={() => setReference(option)} type="button">
                <span className="reference-photo" style={{ backgroundImage: `url(/quiz/${option === "male" ? "men" : "women"}-starting-points.png)` }} aria-hidden="true" />
                <span className="reference-copy"><strong>{option === "male" ? "Masculine reference" : "Feminine reference"}</strong><small>Four human starting-point photos, from leaner through athletic.</small></span>
              </button>
            ))}
          </div>
        </QuestionFrame>
      ) : null}

      {step === "current" && reference ? (
        <QuestionFrame eyebrow="STEP 2 OF 6" title="Which starting point feels closest today?" detail="Choose broadly. It helps us set the visual context and nutrition emphasis; it is not a diagnosis or a measurement of your worth." onBack={goBack} onNext={goNext} nextDisabled={currentBody === null}>
          <BodyPicker reference={reference} value={currentBody} onChange={setCurrentBody} />
        </QuestionFrame>
      ) : null}

      {step === "target" && reference ? (
        <QuestionFrame eyebrow="STEP 3 OF 6" title="Which direction would feel good to work toward?" detail="Pick a realistic first direction, not a perfect destination. This can shift the training and nutrition emphasis behind your plan." onBack={goBack} onNext={goNext} nextDisabled={targetBody === null}>
          <BodyPicker reference={reference} value={targetBody} onChange={setTargetBody} />
        </QuestionFrame>
      ) : null}

      {step === "measurements" ? (
        <QuestionFrame eyebrow="STEP 4 OF 6" title="A few measures, then we can make the maths useful." detail="Waist is optional. It makes the estimate more useful, but no single number can measure your health." onBack={goBack} onNext={goNext} nextDisabled={!Number.isFinite(age) || !Number.isFinite(heightCm) || !Number.isFinite(weightKg) || age < 18 || heightCm < 120 || weightKg < 35}>
          <div className="unit-toggle" aria-label="Choose measurement units">
            <button className={units === "metric" ? "selected" : ""} onClick={() => setUnits("metric")} type="button">Metric</button>
            <button className={units === "imperial" ? "selected" : ""} onClick={() => setUnits("imperial")} type="button">US / Imperial</button>
          </div>
          <div className="field-grid">
            <label className="field-label">Age<input type="number" min="18" max="85" value={Number.isFinite(age) ? age : ""} onChange={(event) => setAge(event.target.value === "" ? Number.NaN : Number(event.target.value))} /><span>years</span></label>
            {units === "metric" ? (
              <label className="field-label">Height<input type="number" min="120" max="230" value={Number.isFinite(heightCm) ? heightCm : ""} onChange={(event) => setHeightCm(event.target.value === "" ? Number.NaN : Number(event.target.value))} /><span>cm</span></label>
            ) : (
              <div className="split-field">
                <label className="field-label">Height<input type="number" min="4" max="7" value={feet} onChange={(event) => setHeightCm((Number(event.target.value) * 12 + inches) * 2.54)} /><span>ft</span></label>
                <label className="field-label field-spacer"><input type="number" min="0" max="11" value={inches} onChange={(event) => setHeightCm((feet * 12 + Number(event.target.value)) * 2.54)} /><span>in</span></label>
              </div>
            )}
            <label className="field-label">Weight<input type="number" min="35" max="250" step="0.1" value={Number.isFinite(weightKg) ? units === "metric" ? metricWeight : imperialWeight : ""} onChange={(event) => setWeightKg(event.target.value === "" ? Number.NaN : units === "metric" ? Number(event.target.value) : Number(event.target.value) / 2.20462)} /><span>{units === "metric" ? "kg" : "lb"}</span></label>
            <label className="field-label">Waist <em>optional</em><input type="number" min="45" max="180" step="0.1" value={waistCm === null ? "" : units === "metric" ? round(waistCm, 1) : round(waistCm / 2.54, 1)} onChange={(event) => setWaistCm(event.target.value ? units === "metric" ? Number(event.target.value) : Number(event.target.value) * 2.54 : null)} /><span>{units === "metric" ? "cm" : "in"}</span></label>
          </div>
        </QuestionFrame>
      ) : null}

      {step === "training" ? (
        <QuestionFrame eyebrow="STEP 5 OF 6" title="Make the plan fit your actual week." detail="You will get a simple routine you can repeat, progress and recover from." onBack={goBack} onNext={goNext}>
          <div className="training-stack">
            <div className="training-visual" style={{ backgroundImage: "url(/peptis-hero-recomposition.webp)" }}><span>THE DETAILS BECOME YOUR PLAN</span><p>Equipment, time and experience all change your split, exercise choices and weekly workload.</p></div>
            <fieldset>
              <legend>Primary focus</legend>
              <div className="choice-row three-up">
                {(Object.keys(goalCopy) as Goal[]).map((option) => (
                  <button className={goal === option ? "selected" : ""} key={option} onClick={() => setGoal(option)} type="button"><strong>{goalCopy[option].label}</strong><small>{goalCopy[option].description}</small></button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Training access</legend>
              <div className="choice-row">
                {(["gym", "dumbbells", "home"] as const).map((option) => (
                  <button className={equipment === option ? "selected" : ""} key={option} onClick={() => setEquipment(option)} type="button">{option === "gym" ? "Full gym" : option === "dumbbells" ? "Dumbbells" : "Home / bodyweight"}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Training days each week</legend>
              <div className="choice-row days-row">
                {[3, 4, 5].map((dayCount) => <button className={sessions === dayCount ? "selected" : ""} key={dayCount} onClick={() => setSessions(dayCount)} type="button">{dayCount} days</button>)}
              </div>
            </fieldset>
            <fieldset>
              <legend>Recent resistance-training experience</legend>
              <div className="choice-row three-up">
                <button className={experience === "new" ? "selected" : ""} onClick={() => setExperience("new")} type="button"><strong>New</strong><small>I am starting or have not trained consistently.</small></button>
                <button className={experience === "returning" ? "selected" : ""} onClick={() => setExperience("returning")} type="button"><strong>Returning</strong><small>I have trained before and am rebuilding a habit.</small></button>
                <button className={experience === "trained" ? "selected" : ""} onClick={() => setExperience("trained")} type="button"><strong>Consistent</strong><small>I already know the basics and train regularly.</small></button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Time you can give each session</legend>
              <div className="choice-row days-row">
                {([30, 45, 60] as SessionLength[]).map((duration) => <button className={sessionLength === duration ? "selected" : ""} key={duration} onClick={() => setSessionLength(duration)} type="button">{duration} min</button>)}
              </div>
            </fieldset>
          </div>
        </QuestionFrame>
      ) : null}

      {step === "email" ? (
        <QuestionFrame eyebrow="STEP 6 OF 6" title="Save your Peptis starting plan." detail="We will show your result immediately. Your email puts you on the Peptis plan list as the full programme develops." onBack={goBack} hideNext>
          <form className="email-form" onSubmit={submitLead}>
            <label>Email address<input type="email" placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>I agree to receive Peptis body-composition education and occasional product updates. I can unsubscribe at any time.</span></label>
            <p className="privacy-note">We save your email and broad plan focus—not your height, weight, waist, body-selection, training-experience or workout answers. Those stay in this browser unless you export them.</p>
            <button className="primary-button" disabled={!consent || !email || leadStatus === "saving"} type="submit">{leadStatus === "saving" ? "Saving…" : "Show my plan"} <span>→</span></button>
          </form>
        </QuestionFrame>
      ) : null}

      {step === "result" ? (
        <section className="results-section">
          <div className="results-header">
            <div><p className="eyebrow">YOUR 12-WEEK STARTING PLAN</p><h1>{goalCopy[result.planGoal].label}, built around your {result.targetLabel.toLowerCase()} target.</h1><p>{result.planGoal !== goal ? `Your visual target shifted the plan emphasis from “${goalCopy[goal].label.toLowerCase()}” to “${goalCopy[result.planGoal].label.toLowerCase()}.”` : "Your target reference shapes the visual destination; your selected focus sets the nutrition and training emphasis."} Use this as a practical starting point, then adjust from energy, performance and measurements—not a single app score.</p></div>
            <button className="secondary-button" type="button" onClick={() => window.print()}>Print / save PDF</button>
          </div>
          {leadStatus === "saved" ? <p className="saved-note">You are on the Peptis plan list. We only stored your email and broad plan focus.</p> : null}
          <div className="result-metrics">
            <article><span>Your selected direction</span><strong>{result.visualPath}</strong><small>{result.currentLabel} is the starting reference; {result.targetLabel} is the visual destination you selected.</small></article>
            <article><span>Estimated current body-fat range</span><strong>~{result.bodyFatLow}–{result.bodyFatHigh}%</strong><small>Self-selection plus simple measurements—not a DEXA result.</small></article>
            <article><span>Target visual reference</span><strong>~{result.targetBodyFatLow}–{result.targetBodyFatHigh}%</strong><small>A broad reference for the chosen illustration, not a body-fat diagnosis, promise or required destination.</small></article>
            <article><span>Estimated fat-free mass</span><strong>{round(result.leanLow, 1)}–{round(result.leanHigh, 1)} kg</strong><small>This includes all non-fat tissue; it is not muscle-only.</small></article>
          </div>
          <div className="results-grid">
            <article className="plan-card nutrition-card"><p className="card-kicker">NUTRITION START</p><h2>Make food support the training.</h2><dl><div><dt>Protein</dt><dd>{round(result.protein)} g/day</dd></div><div><dt>Starting energy range</dt><dd>{round(result.calorieRange[0])}–{round(result.calorieRange[1])} kcal/day</dd></div><div><dt>Estimated maintenance</dt><dd>~{round(result.maintenance)} kcal/day</dd></div></dl><p>{result.planGoal === "muscle" ? "This range gives a modest energy surplus to support progressive training." : result.planGoal === "leaner" ? "This range sets a modest deficit while keeping protein and resistance work in view." : "This range keeps energy close to maintenance so training and everyday consistency can drive the first recomposition block."} Reassess gently after two weeks from adherence, gym performance and waist/weight trends.</p></article>
            <article className="plan-card training-card">
              <p className="card-kicker">TRAINING START</p>
              <h2>{sessions}-day plan, built for {sessionLength} minutes.</h2>
              <p>{workout.trainingNote}</p>

              <div className="training-setup">
                <div>
                  <span>Before every session</span>
                  <p>{workout.warmup}</p>
                </div>
                <div>
                  <span>Outside the gym</span>
                  <p>{workout.weeklyMovement}</p>
                </div>
              </div>

              <div className="phase-grid" aria-label="Your 12-week progression">
                {workout.phases.map((phase) => (
                  <article key={phase.weeks}>
                    <span>{phase.weeks}</span>
                    <strong>{phase.title}</strong>
                    <p>{phase.detail}</p>
                  </article>
                ))}
              </div>

              <div className="workout-list">
                {workout.days.map((day) => (
                  <article className="workout-day" key={day.day}>
                    <header>
                      <div>
                        <strong>{day.day} · {day.weekday}</strong>
                        <h3>{day.title}</h3>
                      </div>
                      <span>{day.focus}</span>
                    </header>
                    <p className="day-warmup"><strong>Warm-up</strong>{day.warmup}</p>
                    <ul>
                      {day.exercises.map((exercise) => (
                        <li key={exercise.name}>
                          <div className="exercise-copy">
                            <strong>{exercise.name}</strong>
                            <small><b>Effort:</b> {exercise.effort}</small>
                            <small><b>Cue:</b> {exercise.cue}</small>
                            <small><b>Swap:</b> {exercise.alternative}</small>
                          </div>
                          <span>{exercise.sets} sets · {exercise.reps} · rest {exercise.rest}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="day-finisher"><strong>Finish</strong>{day.finisher}</p>
                  </article>
                ))}
              </div>

              <p className="progression-note"><strong>How to progress:</strong> {workout.progression}</p>
              <div className="export-actions">
                <button className="secondary-button" onClick={exportPdf} type="button">Download detailed PDF</button>
                <button className="secondary-button" onClick={exportCsv} type="button">Download workout CSV</button>
                <button className="secondary-button" onClick={exportCalendar} type="button">Add 12-week schedule</button>
                <button className="secondary-button" onClick={copyWorkout} type="button">Copy workout</button>
              </div>
              <p className="export-note">The PDF is a complete, printable plan. The CSV includes exercises, sets, reps, rest, coaching cues and substitutions for spreadsheet or manual tracker import; the .ics file adds the sessions to a calendar.</p>
              {exportStatus ? <p className="export-status" role="status">{exportStatus}</p> : null}
            </article>
          </div>
          <div className="result-footer"><p>{workout.recoveryNote}</p><small>This is general fitness education, not medical advice or a treatment plan. If you are pregnant, managing a medical condition, using a GLP-1 or any medication that affects weight/appetite, or have pain/injury, get individual guidance from the clinician managing your care.</small></div>
          <button className="link-button" type="button" onClick={() => setStep("intro")}>Start a new assessment</button>
        </section>
      ) : null}
    </main>
  );
}

function QuestionFrame({
  eyebrow,
  title,
  detail,
  children,
  onBack,
  onNext,
  nextDisabled = false,
  hideNext = false,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  hideNext?: boolean;
}) {
  return (
    <section className="question-section">
      <div className="question-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{detail}</p></div>
      <div className="question-body">{children}</div>
      <div className="question-actions"><button className="back-button" onClick={onBack} type="button">← Back</button>{!hideNext ? <button className="primary-button" disabled={nextDisabled} onClick={onNext} type="button">Continue <span>→</span></button> : null}</div>
    </section>
  );
}
