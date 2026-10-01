/* Archetype-based training program generator.
   Education only. Exercise pool maps to self-hosted illustrations
   (Everkinetic / Bryl Lim, CC BY-SA 4.0) in public/images/exercises. */
/* Movements where the member has to choose an external load. */
const WEIGHTED_SLUGS = new Set([
    'goblet-squat',
    'leg-press',
    'romanian-deadlift',
    'dumbbell-bench-press',
    'machine-chest-press',
    'lat-pulldown',
    'seated-row',
    'one-arm-dumbbell-row',
    'banded-row',
    'farmer-carry',
]);
const WEIGHT_NOTE = 'Starting weight: one you are confident you could lift about 15 times with clean form.';
const EX = {
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
    wallSlide: {
        slug: 'wall-slide', name: 'Standing shoulder-blade squeeze',
        cue: 'Stand tall, gently draw shoulder blades together, hold for two seconds, then release. Keep the movement comfortable.',
        hevyTitle: 'Shoulder Blade Squeeze',
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
};
const PATTERN_LABELS = {
    squat: 'Squat / sit-to-stand',
    hinge: 'Hinge',
    push: 'Push',
    pull: 'Pull',
    brace: 'Carry / brace',
    finisher: 'Step / calf',
};
function poolsFor(equipment, sensitivities) {
    const knees = sensitivities.includes('knees');
    const back = sensitivities.includes('back');
    const shoulders = sensitivities.includes('shoulders');
    const squat = equipment === 'gym'
        ? knees
            ? [EX.legPress, EX.gobletSquat]
            : [EX.gobletSquat, EX.legPress]
        : equipment === 'dumbbells'
            ? [EX.gobletSquat, EX.bodyweightSquat]
            : [EX.bodyweightSquat, EX.stepUp];
    const hinge = back
        ? [EX.gluteBridge, EX.birdDog]
        : equipment === 'none'
            ? [EX.gluteBridge, EX.superman]
            : [EX.rdl, EX.gluteBridge];
    const push = shoulders
        ? [EX.inclinePushUp, EX.wallPushUp]
        : equipment === 'gym'
            ? [EX.machinePress, EX.dbBench]
            : equipment === 'dumbbells'
                ? [EX.dbBench, EX.inclinePushUp]
                : [EX.inclinePushUp, EX.wallPushUp];
    const pull = equipment === 'gym'
        ? [EX.latPulldown, EX.seatedRow]
        : equipment === 'dumbbells'
            ? [EX.oneArmRow, EX.oneArmRow]
            : [EX.wallSlide, EX.wallSlide];
    const brace = back
        ? [EX.deadBug, EX.birdDog]
        : equipment === 'none'
            ? [EX.plank, EX.deadBug]
            : [EX.farmerCarry, EX.plank];
    const finisher = knees
        ? [EX.calfRaise, EX.calfRaise]
        : [EX.stepUp, EX.calfRaise];
    return { squat, hinge, push, pull, brace, finisher };
}
function setsRepsFor(experience, pattern) {
    const isBrace = pattern === 'brace';
    if (experience === 'new') {
        return { sets: 2, reps: isBrace ? '20 to 30 seconds' : '8 to 12' };
    }
    if (experience === 'returning') {
        return { sets: 3, reps: isBrace ? '30 to 40 seconds' : '8 to 12' };
    }
    return { sets: 3, reps: isBrace ? '40 to 60 seconds' : '6 to 10' };
}
const PATTERN_ORDER = ['squat', 'hinge', 'push', 'pull', 'brace', 'finisher'];
export function generateProgram(intake) {
    const context = intake.context || {};
    const reducedVolume = context.q4 === 'q4_a' || context.q3 === 'q3_d' || context.appetite === 'very_low';
    const personalisationNotes = [];
    if (context.q1 === 'q1_not_started') personalisationNotes.push('Before treatment: establish a comfortable training routine and a baseline of strength and food intake.');
    else if (['q1_a','q1_e'].includes(context.q1)) personalisationNotes.push('Early treatment: use the first week to check energy, food tolerance and recovery before adding training volume.');
    else if (context.q1 === 'q1_c') personalisationNotes.push('After stopping treatment: keep a repeatable routine and review appetite or weight changes with your prescriber.');
    else if (context.q1 === 'q1_d') personalisationNotes.push('Your treatment timeline is uncertain. Keep a baseline record and confirm your prescription details with your clinician.');
    else if (context.q1) personalisationNotes.push('Established treatment: compare strength and session completion week to week alongside your weight trend.');
    if (reducedVolume) personalisationNotes.push('You reported lower energy, harder daily tasks or very low appetite. Start with one comfortable set per movement; review persistent symptoms with your clinician before increasing effort.');
    if (context.training_habit === '0') personalisationNotes.push('You are starting from no weekly strength sessions. Treat week one as practice and build consistency first.');
    else if (context.training_habit === '1' && intake.days === 3) personalisationNotes.push('You currently train once a week and chose three planned days. Establish two comfortable sessions before adding the third.');
    if (context.q6 === 'q6_a') personalisationNotes.push('You selected faster scale change as a goal. This starter plan tracks completed sessions and everyday function alongside weight; it does not set a weight-loss target.');
    if (context.q6 === 'q6_c') personalisationNotes.push('You selected a smaller appetite as a goal. This plan supports regular nutrition and strength practice; it does not recommend further appetite suppression.');
    if (context.q6 === 'q6_d') personalisationNotes.push('You selected appearance and skin changes as a priority. Use the strength record as another measure of progress; this plan does not predict skin changes.');
    if (context.weight_change === 'over_10') personalisationNotes.push('You reported losing more than 10% of starting weight. Review your strength and nutrition needs with your care team.');
    if (intake.equipment === 'none') personalisationNotes.push('No bands or weights are required. Shoulder-blade squeezes provide gentle upper-back movement; they do not replace a progressively loaded pulling exercise.');
    if (intake.sensitivities.length) personalisationNotes.push(`You flagged ${intake.sensitivities.join(', ')} for extra care. Exercise options reflect those preferences, but this is not an injury assessment or clearance to exercise.`);
    const nutritionNotes = [context.protein_habit === 'most_meals' ? 'Keep the protein-containing meals you already manage and review consistency across the week.' : 'Choose one familiar protein-containing food for a meal you often miss it at; build consistency before chasing a number.',
      context.appetite === 'very_low' || context.appetite === 'reduced' ? 'For lower appetite, try smaller meals that you tolerate. Ask a dietitian or clinician for a personal nutrition target if eating enough is difficult.' : 'Keep a regular pattern of meals, fluids and varied foods that fits your day.'];
    if (context.q5 === 'q5_c') nutritionNotes.push('You reported regular digestive discomfort. Note meal size and symptom timing and ask your clinician for advice; delay strenuous sessions when you feel unwell.');
    if (context.protein_habit === 'unsure') nutritionNotes.push('Record your usual meals for a few days to establish a protein baseline.');
    if (context.q5 === 'q5_b') nutritionNotes.push('You linked discomfort to particular foods or larger meals. Record those foods, portions and timing rather than assuming every meal is a trigger.');
    if (context.q5 === 'q5_d') nutritionNotes.push('You reported occasional, brief discomfort. Note the timing when it occurs and whether the pattern changes.');
    if (context.q7 === 'q7_a') nutritionNotes.push('You want less soreness and stiffness. Record how you feel before and after sessions and leave a rest day between strength sessions.');
    if (context.q7 === 'q7_b' || context.q4 === 'q4_d') nutritionNotes.push('You want an easier wind down. Record bedtime, wake time and evening habits so you can review your sleep pattern.');
    if (context.q7 === 'q7_c' || context.q4 === 'q4_c') nutritionNotes.push('You reported energy dips. Note when they occur alongside meals, fluids, rest and activity, and record what helps.');
    if (context.q7 === 'q7_d') nutritionNotes.push('You want clearer thinking and steadier energy. Record sleep, meals and energy timing; discuss persistent or new changes with your clinician.');
    const digestiveFocus = context.q5 === 'q5_c' || (context.q2 || []).includes('c') || ['q5_b','q5_d'].includes(context.q5);
    if (digestiveFocus && context.q8 === 'q8_a') nutritionNotes.push('Your digestive goal is more consistent nutrition. Keep a short record of comfortable portions and which meals you can manage.');
    if (digestiveFocus && context.q8 === 'q8_b') nutritionNotes.push('Your digestive goal is easier meal planning. Keep a list of meals you tolerate and symptom timing to review with your care team.');
    if (digestiveFocus && context.q8 === 'q8_c') nutritionNotes.push('Your digestive goal is comfort during activity after meals. Record the time between eating and activity and how you feel.');
    if (digestiveFocus && context.q8 === 'q8_d') nutritionNotes.push('Your digestive goal is confidence eating away from home. Note familiar meal options you tolerate and any patterns worth discussing with your clinician.');
    const pools = poolsFor(intake.equipment, intake.sensitivities);
    const dayNames = intake.days === 2 ? ['Day A', 'Day B'] : ['Day A', 'Day B', 'Day C'];
    const days = dayNames.map((title, dayIndex) => ({
        title,
        slots: PATTERN_ORDER.map((pattern) => {
            const pool = pools[pattern];
            // Alternate primary and secondary picks across days so sessions vary.
            const exercise = pool[dayIndex % pool.length];
            const { sets, reps } = setsRepsFor(intake.experience, pattern);
            return {
                pattern,
                patternLabel: pattern === 'pull' && intake.equipment === 'none' ? 'Upper-back movement' : PATTERN_LABELS[pattern],
                exercise,
                sets: reducedVolume ? 1 : sets,
                reps,
                note: pattern === 'brace' && exercise.slug === 'farmer-carry'
                    ? 'Walk 20 to 30 steps per set instead of counting repetitions.'
                    : undefined,
                weightNote: WEIGHTED_SLUGS.has(exercise.slug) ? WEIGHT_NOTE : undefined,
            };
        }),
    }));
    const archetype = `${intake.days}day_${intake.equipment}_${intake.experience}`;
    return {
        archetype,
        days,
        personalisationNotes,
        nutritionNotes,
        weightRules: intake.equipment === 'none' ? [
            'Start with a comfortable range of motion and use a stable chair, wall or counter where shown. No exercise equipment is needed.',
            'Finish each set with 2 or 3 controlled repetitions still possible. Add 1 or 2 repetitions as the movement gets easier.',
            'Record the repetitions you complete. Progress control and consistency before choosing a harder variation.',
        ] : [
            'Treat your first session as a rehearsal. For each weighted movement, pick a weight you are confident you could lift about 15 times with clean form, then do your working sets with it.',
            'End every set feeling you had 2 or 3 clean repetitions left. Grinding to failure is not required for progress.',
            'Felt easy? Add the smallest available increment next set or next session. Form broke down? Go down one step and rebuild.',
            'For machines, start with the lightest comfortable setting. Record the loads you use so your next session builds on your own history.',
        ],
        weeklyNotes: [
            `Train ${intake.days} days per week with at least one rest day between sessions.`,
            'Leave 2 to 3 repetitions in reserve on every set while technique is settling.',
            'Rest 60 to 90 seconds between sets, longer if you need it.',
            'Pair each session with a protein-forward meal or drink within a few hours.',
        ],
        progression: [
            intake.equipment === 'none' ? 'When every set feels controlled and comfortable, add 1 or 2 repetitions or a little time to a hold. Change one thing at a time.' : 'When every set reaches the top of the repetition range with steady technique, add a small amount of weight or 1 to 2 repetitions next session.',
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
    };
}
export function exerciseImage(slug, frame = 1) {
    return `/images/exercises/${slug}-${frame}.png`;
}
/* Hevy public API routine payloads (title-based; template ids are account-specific). */
export function hevyRoutines(program) {
    return program.days.map((day) => ({
        routine: {
            title: `Peptis ${day.title}`,
            folder_id: null,
            notes: 'Peptis continuity starter program. Education only, not medical advice. Leave 2 to 3 reps in reserve.',
            exercises: day.slots.map((slot) => ({
                exercise_name: slot.exercise.hevyTitle,
                exercise_template_id: null,
                superset_id: null,
                notes: slot.weightNote ? `${slot.exercise.cue} ${slot.weightNote}` : slot.exercise.cue,
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
    }));
}
/* Weekly recurring calendar (8 weeks) for the chosen training days. */
export function calendarIcs(program) {
    const dayCodes = program.days.length === 2 ? ['MO', 'TH'] : ['MO', 'WE', 'FR'];
    const now = new Date();
    const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Peptis//Continuity Starter Program//EN',
    ];
    program.days.forEach((day, i) => {
        // First occurrence: next matching weekday at 07:30 local time.
        const target = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf(dayCodes[i]) + 1;
        const start = new Date(now);
        start.setDate(start.getDate() + ((target + 7 - ((start.getDay() + 6) % 7 + 1)) % 7 || 7));
        start.setHours(7, 30, 0, 0);
        const fmt = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
        const end = new Date(start.getTime() + 45 * 60000);
        lines.push('BEGIN:VEVENT', `UID:peptis-plan-${day.title.toLowerCase().replace(/\s/g, '')}-${stamp}@peptis.com`, `DTSTAMP:${stamp}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`, `RRULE:FREQ=WEEKLY;BYDAY=${dayCodes[i]};COUNT=8`, `SUMMARY:Peptis strength session (${day.title})`, `DESCRIPTION:${day.slots.map((s) => `${s.exercise.name} ${s.sets} sets`).join(', ')}. Education only.`, 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
}
