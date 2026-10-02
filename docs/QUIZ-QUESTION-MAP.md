# Peptis quiz: questions, routing and personalisation

Updated 1 October 2026. This describes the implementation, not measured conversion performance.

The flow starts with adult/health-data permission. Q1 is followed by treatment context; Q2 is followed by first-name/email collection and separate optional email marketing permission. After Q3–Q5 there is an interim summary. Q6–Q8 are followed by routine planning, the personalised reveal, final saving and optional callback permission.

## Core questions

### Q1: Where are you in your current GLP-1 treatment timeline?

- I started less than one month ago.
- I have been in treatment for one to three months.
- I have been in treatment for three to six months.
- I have been in treatment for six to twelve months.
- I have been in treatment for more than a year.
- I have not started GLP-1 treatment.
- I recently stopped treatment.
- I am not sure of my timeline or dose schedule.

### Q2: What would you most like to understand or support right now?

- Changes in strength, muscle tone or everyday function
- Low energy, trouble concentrating or slower recovery
- Nausea, bloating or digestive discomfort
- Keeping my progress and building a maintenance routine

### Q3: Have everyday strength tasks felt different since your weight began to change?

- No. My strength and daily function feel steady.
- I feel stronger or have more endurance.
- I have not paid much attention to strength or function.
- Yes. Some everyday tasks or workouts feel harder.

### Q4: How has your energy felt during a typical day?

- I often feel drained, and rest does not fully help.
- My energy feels steady most days.
- I have mild dips that improve with food, fluids, rest or movement.
- I have plenty of energy but have trouble winding down.

### Q5: How often do meals leave you uncomfortably full, bloated or nauseated?

- Rarely or never.
- Only after certain foods or unusually large meals.
- Regularly. Discomfort can last well after I eat.
- Occasionally, and it resolves quickly.

### Q6: What would make your body composition progress feel more complete?

- Seeing the scale move as quickly as possible.
- Protecting strength and staying capable in daily life.
- Making my appetite even smaller.
- Focusing mainly on appearance and skin changes.

### Q7: Which change would help your day feel more manageable?

- Less soreness and stiffness after everyday activity.
- Better sleep and an easier wind down at night.
- Fewer energy dips in the afternoon.
- Clearer thinking and steadier energy through the day.

### Q8: What would better digestive comfort make easier for you?

- Digestive comfort is not a concern for me.
- Eating comfortable portions and meeting nutrition needs more consistently.
- Planning meals with less worry about symptoms.
- Feeling more comfortable being active after meals.
- Enjoying meals away from home with more confidence.

## Treatment context after Q1

| Question | Choices or format | How it is used |
|---|---|---|
| Current medication | Named medicines, another/unsure, none, prefer not to say | Record context only; no medication-specific prescribing or dosing recommendation. Hidden and cleared for not-started users. |
| Dose and frequency | Optional text copied from prescription | Record only; removed when no medicine or prefer not to say is selected. |
| Current provider | Named providers, another, none, prefer not to say | Identifies the current care setting; does not imply a provider partnership. |
| Weight change | Stable; under 5%; 5–10%; over 10%; gained; unsure; prefer not to say | Over 10% adds a strength/nutrition review prompt; no numerical outcome prediction. |

## Routine planning after Q8

| Question | Choices | Effect on the plan |
|---|---|---|
| Resistance-training experience | New; returning; regular | Starting sets and repetition ranges. |
| Current weekly strength sessions | None; one; two; three or more | Starting-habit explanation; gradual scheduling when moving from one to three days. |
| Available equipment | None; dumbbells; full gym | Actual exercise selection; none excludes bands and weights. |
| Planned strength days | Two; three | Number of actual sessions. |
| Protein-containing meals | Rarely; some; most; unsure | Maintain existing consistency, add a familiar protein food or first record meals. |
| Appetite | Manageable; reduced; very low | Nutrition actions; very low appetite also reduces starting volume. |
| Areas to consider (optional) | Knees; back; shoulders; leave blank | Alternative movement selections and an explanation; not an injury assessment. |

## Branching

These branches add educational explanations. They are not mutually exclusive diagnoses, and all users return to the same core-question sequence.

- Strength: Q2 strength priority or Q3 harder everyday tasks.
- Energy: Q2 energy priority or Q4 persistent fatigue.
- Digestive comfort: Q2 digestive priority or Q5 regular discomfort.
- Q8 not a concern skips its digestive explainer. A digestive wish alone never creates a digestive concern when no symptoms or digestive goal were reported.

## Personalisation rules

- Training experience, equipment and available days generate the actual sessions.
- Persistent fatigue, harder daily tasks or very low appetite reduce the starting volume to one set per movement.
- Q1 distinguishes before treatment, early treatment, established treatment, stopped treatment and an uncertain timeline.
- Q6 goals change the explanation; no scale, skin or appetite outcome is invented.
- Q7 produces distinct soreness, sleep, afternoon-energy or thinking/energy recording actions.
- Q5 and Q8 combine to tailor meal planning, comfortable portions, post-meal activity notes or eating-away-from-home notes. No discomfort is inferred from a wish alone.
- All selected priority areas are included in the review milestones, not just the first.
- The final preview, saved plan page and plan email use the same program generator.
- Medication, dose and provider are context only. The check does not diagnose, prescribe or calculate a clinical nutrition target.

## Final reveal and animation

The reveal includes four answer-driven fact tiles, reasons for the plan, expandable actual exercise days and nutrition/routine actions. Its five review points are Today, first seven days, week four, week eight and week twelve. The timeline draws in about two seconds; nodes and result cards enter in short sequences. Reduced-motion preferences disable these effects and leave all content visible. There is no timed loading gate or promised clinical trajectory.

## Final contact choices

Name, email, US state and required confirmations accompany saving the free plan. A phone number and a separate unchecked manual-callback permission are optional. Email marketing and nutrition-box interest remain separate choices.

## Animated chapters and micro stages

The quiz is grouped into Context, Goals, Baseline, Routine and Your Plan. Five animated bars and chapter tokens stay visible through the quiz. Bars reflect completed questions and navigation; they are not health scores. A completed chapter receives a checkmark and a short star-and-confetti banner while the next question remains usable. Returning to a previous chapter does not repeatedly award its celebration in the same session. Restoring a saved check does not replay old celebrations.

Treatment context now uses two or three micro stages: the restored provider logo matrix, medication/dose when applicable, and weight context. Routine planning uses seven micro stages: experience, current habit, equipment, planned days, protein habits, appetite and optional exercise-area preferences. Each has a small segmented animated bar, selection checkmarks and Back/Continue controls. Required plan inputs remain required; provider and exercise-area preferences can be skipped. Chapter and selection animations respect reduced-motion settings. No audio, extra timed gate, health ranking or XP tied to symptoms is introduced.
