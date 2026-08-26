export type ArticleSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type Article = {
  slug: string
  category: 'Muscle and body composition' | 'Protein and nutrition' | 'Training' | 'Skin and appearance' | 'Maintenance'
  title: string
  description: string
  takeaway: string
  readingMinutes: number
  sections: ArticleSection[]
  cannotTellUs: string[]
  sources: string[]
}

export const EVIDENCE_REVIEW_DATE = 'August 21, 2026'

export const articles: Article[] = [
  {
    slug: 'does-ozempic-cause-muscle-loss',
    category: 'Muscle and body composition',
    title: 'Does Ozempic cause muscle loss? What the trials actually measured',
    description:
      'GLP-1 weight loss can include lean tissue, but the viral claim that the medicine simply burns muscle is too crude. Here is what the body composition substudies really showed.',
    takeaway:
      'GLP-1 assisted weight loss can include lean tissue, but lean mass is not the same as muscle, fat generally falls more, and function must be measured rather than inferred from a scan.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'What the substudies measured',
        paragraphs: [
          'In the STEP 1 DEXA substudy of adults without diabetes taking semaglutide 2.4 mg, total fat mass fell by 19.3%, visceral fat by 27.4% and total lean mass by 9.7%. Lean mass as a proportion of body weight actually increased by about 3 percentage points. This was a small exploratory substudy, not the main trial outcome.',
          'In the SURMOUNT-1 DEXA substudy of tirzepatide, a set of 160 paired scans showed that roughly 75% of the weight lost was fat mass and about 25% was lean mass. A 2025 network meta-analysis of 22 randomized trials with 2,258 participants reached a similar estimate: lean mass loss was about 25% of total weight lost, while relative lean mass was not adversely changed.',
        ],
      },
      {
        heading: 'Why lean mass is not the same as muscle',
        paragraphs: [
          'DEXA lean mass includes body water, organs, connective tissue, bone mineral and skeletal muscle. When lean mass falls during weight loss, some of that change is water and glycogen rather than contractile muscle tissue. This is why headlines that translate a lean mass change directly into muscle loss overstate the evidence.',
          'A 2026 proof-of-concept clinical study added an important counterweight to alarmist messaging: people using GLP-1 medicines improved body composition without a measured deterioration in strength, even where absolute lean values declined. This does not settle the question in older or frail populations, but it shows why function needs to be measured, not assumed.',
        ],
      },
      {
        heading: 'Who deserves the most attention',
        paragraphs: [
          'Concern and monitoring are most justified for adults over roughly 60 to 65, people starting treatment with low muscle mass or a long history of inactivity, people losing weight very rapidly or skipping meals, and anyone noticing declining strength, worsening balance or new difficulty with everyday tasks. Those changes deserve a conversation with your current clinician.',
        ],
      },
      {
        heading: 'What actually helps',
        paragraphs: [
          'Resistance training has the strongest behavioral evidence for retaining lean tissue and strength during weight loss. In an overview of 12 systematic reviews covering 149 studies of general weight loss, resistance training reduced lean mass loss by about 0.8 kg. That evidence comes from general weight loss research rather than GLP-1 specific trials, and protein supports training but does not replace it.',
        ],
      },
    ],
    cannotTellUs: [
      'These substudies cannot say how much of any individual lean mass change was skeletal muscle.',
      'Study averages describe groups under trial conditions, not what one person should expect.',
      'No supplement has been shown in a large randomized trial to prevent muscle loss specifically during semaglutide or tirzepatide treatment.',
    ],
    sources: [
      'Wilding et al., STEP 1, New England Journal of Medicine, 2021, dossier [1]',
      'King et al., STEP 1 DEXA substudy, 2021, dossier [11]',
      'Look et al., SURMOUNT-1 DEXA substudy, Diabetes, Obesity and Metabolism, 2025, dossier [12]',
      'Karakasis et al., network meta-analysis of 22 trials, 2025, dossier [13]',
      'Langer et al., Cell Metabolism, 2026, dossier [16]',
      'Bellicha et al., Obesity Reviews, 2021, dossier [21]',
    ],
  },
  {
    slug: 'lean-mass-vs-muscle-mass',
    category: 'Muscle and body composition',
    title: 'Lean mass vs muscle mass: why DEXA headlines can mislead',
    description:
      'A DEXA lean mass change is not a direct measurement of contractile muscle. Understanding what a scan includes makes body composition news much easier to read.',
    takeaway:
      'A DEXA lean mass estimate includes water, organs, connective tissue and bone mineral alongside skeletal muscle. Trend consistency and functional measures tell you more than any single scan.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'What each term means',
        paragraphs: [
          'Fat mass is adipose tissue estimated by DEXA, MRI, CT, air displacement or bioimpedance. Fat-free mass, often reported as lean mass, is everything that is not fat: skeletal muscle, organs, bone mineral, connective tissue and body water. Skeletal muscle mass is the contractile tissue itself, best assessed regionally by MRI or CT, and it is not identical to total DEXA lean mass.',
          'Muscle strength is a separate quantity again, measured by grip strength or exercise performance, and mass and strength can change in different directions. Physical function, such as stair climbing or rising from a chair, is what most people actually care about day to day.',
        ],
      },
      {
        heading: 'Why scans move for reasons other than muscle',
        paragraphs: [
          'Glycogen and the water stored with it, extracellular fluid shifts, organ size and connective tissue all contribute to a lean mass estimate. During an energy deficit, early lean mass changes often reflect water and glycogen. Consumer bioimpedance scales are especially hydration-sensitive, and even DEXA estimates tissue rather than measuring contractile muscle directly.',
        ],
      },
      {
        heading: 'A more useful way to track',
        paragraphs: [
          'Use the same device under the same conditions and watch the trend rather than a single reading. Pair any body composition estimate with functional measures: load or repetitions in core movements, grip strength where practical, a timed chair rise and whether everyday tasks feel easier or harder. Strength can stay stable while a scan changes, and a stable scan does not guarantee good function.',
        ],
      },
    ],
    cannotTellUs: [
      'No consumer scan can validate a muscle-preservation claim with the rigor of a designed clinical study.',
      'A single reading cannot distinguish water shifts from tissue change.',
    ],
    sources: [
      'Tinsley and Heymsfield, Journal of the Endocrine Society, 2024, dossier [15]',
      'Look et al., SURMOUNT-1 DEXA substudy, 2025, dossier [12]',
      'Langer et al., Cell Metabolism, 2026, dossier [16]',
    ],
  },
  {
    slug: 'protein-on-glp1',
    category: 'Protein and nutrition',
    title: 'How much protein do you need on a GLP-1?',
    description:
      'Appetite suppression makes protein harder to obtain, not less important. Here is the evidence behind common targets and why the right number depends on you.',
    takeaway:
      'Reviews support roughly 1.2 to 1.6 g/kg/day and 25 to 30 g per meal for many active weight loss contexts, but the weight denominator and your medical situation require individual guidance.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Why appetite changes the problem',
        paragraphs: [
          'Semaglutide lowers appetite and energy intake. In controlled appetite studies, ad libitum daily energy intake was 24% lower after 12 weeks at diabetes-range dosing, and a separate semaglutide 2.4 mg study found 35% lower ad libitum meal intake than placebo. These short mechanistic trials do not predict any individual long-term deficit, but they explain why protein-dense foods matter more when total food volume falls.',
          'The problem is not that every user becomes deficient. Lower food volume simply leaves less margin for a diet built around low-protein snacks, alcohol, sweets or skipped meals.',
        ],
      },
      {
        heading: 'What the evidence supports',
        paragraphs: [
          'Higher-protein energy-restricted diets can preserve more fat-free mass than the 0.8 g/kg/day RDA pattern, especially with resistance exercise. Reviews commonly identify 1.2 to 1.6 g/kg/day as a useful range for active weight management, with 25 to 30 g per meal as a practical distribution target.',
        ],
      },
      {
        heading: 'The denominator problem',
        paragraphs: [
          'For people with obesity, multiplying a high target by current body weight can produce an unnecessarily large number. A clinician or dietitian may instead use goal weight, ideal body weight, adjusted body weight or measured lean mass. No single denominator fits everyone, and kidney disease, liver disease, pregnancy and other conditions require individual clinical guidance.',
        ],
      },
      {
        heading: 'Practical structure when food volume is low',
        paragraphs: [
          'Food comes first when you can tolerate it. Smaller, protein-forward eating occasions usually work better than forcing one large meal. Low-volume options include Greek yogurt, eggs, fish, poultry, tofu and cottage cheese. A complete protein serving of about 20 to 25 g can close a gap on days when food does not appeal, and it supports training rather than replacing it.',
        ],
      },
    ],
    cannotTellUs: [
      'These ranges come from general active weight loss research, not GLP-1 specific dosing trials.',
      'No review can set your personal target; medical conditions change the answer.',
    ],
    sources: [
      'Blundell et al., Diabetes, Obesity and Metabolism, 2017, dossier [19]',
      'Friedrichsen et al., Diabetes, Obesity and Metabolism, 2021, dossier [20]',
      'Nunes et al., Sports Medicine, 2022, dossier [24]',
      'Leidy et al., American Journal of Clinical Nutrition, 2015, dossier [25]',
      'Mozaffarian et al., joint nutrition advisory, American Journal of Clinical Nutrition, 2025, dossier [17]',
    ],
  },
  {
    slug: 'two-day-strength-plan',
    category: 'Training',
    title: 'A two-day strength plan for beginners during weight loss',
    description:
      'Two well-designed full-body sessions beat a perfect plan you never start. A simple structure for training the major movement patterns while your weight changes.',
    takeaway:
      'Two progressive full-body sessions each week are a credible minimum for beginners. Train the major movement patterns, leave repetitions in reserve, and progress only when technique is stable.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Why resistance work is the center',
        paragraphs: [
          'Resistance training is the strongest supported behavioral intervention for retaining lean tissue and strength during weight loss. In an overview of systematic reviews covering general weight loss, it reduced lean mass loss by about 0.8 kg. In older adults losing about 10% of body weight, hip bone density also declined less with resistance or combined exercise than with aerobic exercise alone. More cardio is valuable for cardiovascular health, but it is not an adequate muscle-retention strategy on its own.',
        ],
      },
      {
        heading: 'The movement patterns',
        paragraphs: [
          'A simple beginner program trains six patterns. Start with one or two working sets per movement and build toward two to four sets of roughly 6 to 15 repetitions, leaving several repetitions in reserve at first.',
        ],
        bullets: [
          'Squat or sit-to-stand',
          'Hinge, such as a hip bridge or Romanian deadlift pattern',
          'Push, such as an incline push-up or press',
          'Pull, such as a row',
          'Carry or brace for the trunk',
          'A calf or step pattern',
        ],
      },
      {
        heading: 'How to progress and adapt',
        paragraphs: [
          'Progress when technique is stable by adding repetitions, load, range of motion or a harder variation. Two full-body sessions per week are a credible minimum; three offer more practice if recovery is good. Substitute movements for knee pain, back pain, limited equipment or low confidence, and scale sessions down on days when energy or nausea makes training hard.',
          'New functional decline, falls, marked weakness or rapid unintended loss are reasons to speak with your current clinician rather than push through.',
        ],
      },
    ],
    cannotTellUs: [
      'The ideal training dose during modern incretin therapy is inferred mainly from general weight loss and sports science evidence.',
      'A written plan cannot screen your individual injury or medical situation.',
    ],
    sources: [
      'Bellicha et al., Obesity Reviews, 2021, dossier [21]',
      'Villareal et al., New England Journal of Medicine, 2017, dossier [22]',
      'Armamento-Villareal et al., JBMR, 2020, dossier [23]',
    ],
  },
  {
    slug: 'after-stopping-semaglutide',
    category: 'Maintenance',
    title: 'What happens after stopping semaglutide? The STEP 1 extension explained',
    description:
      'Withdrawal studies show that regain is common when treatment stops. That reflects chronic biology, not personal failure, and it is why maintenance planning starts early.',
    takeaway:
      'One year after semaglutide and lifestyle support ended, STEP 1 extension participants regained about two thirds of their prior weight loss. Maintenance habits deserve to begin before discontinuation, not after regain.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'What the withdrawal data showed',
        paragraphs: [
          'In the STEP 1 extension, one year after stopping semaglutide and lifestyle intervention, participants regained about two thirds of their prior weight loss, and many cardiometabolic improvements moved back toward baseline. In STEP 4, participants switched from semaglutide to placebo gained 6.9% of body weight from week 20 to week 68, while those who continued lost a further 7.9%.',
        ],
      },
      {
        heading: 'How to read this honestly',
        paragraphs: [
          'This is not evidence that the medicine breaks metabolism. Obesity is a chronic, relapsing condition, and the biology defending body weight returns when treatment stops. Framing regain as a personal failure misreads the data and makes planning harder.',
        ],
      },
      {
        heading: 'What early maintenance looks like',
        paragraphs: [
          'The practical consequence is that maintenance is not a phase that starts later. Habit formation, progressive strength work, workable protein structure and simple monitoring of weight trend, waist, training performance and everyday function are all more useful when they are established during treatment. Decisions about continuing, changing or stopping therapy belong with your current clinician.',
        ],
      },
    ],
    cannotTellUs: [
      'Withdrawal trials compare stopping with continuing; they do not test tapering strategies or individual plans.',
      'Group regain averages do not predict any single person’s outcome.',
    ],
    sources: [
      'Wilding et al., STEP 1 extension, Diabetes, Obesity and Metabolism, 2022, dossier [9]',
      'Rubino et al., STEP 4, JAMA, 2021, dossier [10]',
    ],
  },
  {
    slug: 'collagen-loose-skin',
    category: 'Skin and appearance',
    title: 'Does collagen prevent loose skin after weight loss?',
    description:
      'Collagen supplements are heavily marketed to people losing weight. The highest quality evidence does not support them for preventing or treating loose skin.',
    takeaway:
      'A 2025 analysis found no clear skin benefit from oral collagen in high-quality or non-industry-funded studies, and no supplement has been shown to prevent loose skin during GLP-1 assisted weight loss.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'What actually drives loose skin',
        paragraphs: [
          'Loose skin mainly reflects how much tissue volume was lost, how fast it was lost, and baseline skin quality. Age, duration of prior obesity, genetics, smoking, sun exposure, prior pregnancies and weight cycling all influence how well skin retracts. Histology studies after massive weight loss report thinner collagen and damaged elastic networks, but those studies do not show that a GLP-1 medicine directly caused the tissue change.',
        ],
      },
      {
        heading: 'What the collagen evidence says',
        paragraphs: [
          'Earlier meta-analyses reported modest improvements in skin hydration and elasticity. A 2025 analysis of 23 randomized trials with 1,474 participants found no benefit in the high-quality or non-industry-funded subsets and concluded that current clinical evidence does not support collagen supplements for preventing or treating skin aging. Collagen has also never been shown to prevent loose skin during GLP-1 assisted weight loss.',
          'Collagen is also an incomplete protein. If the goal is meeting daily protein needs during weight loss, a complete protein source is the more useful choice.',
        ],
      },
      {
        heading: 'What helps, honestly',
        paragraphs: [
          'Time at a stable weight, sun protection, not smoking, adequate nutrition and resistance training support tissue health and the shape beneath the skin. Moisturizers and retinoids can improve surface quality but cannot remove large folds. Substantial excess skin is a medical and sometimes surgical question, and a board-certified plastic surgeon is the right person to assess it. Exercise cannot remove substantial excess skin, and it is misleading to suggest otherwise.',
        ],
      },
    ],
    cannotTellUs: [
      'Skin aging trials do not directly study excess skin after major weight loss.',
      'No randomized trial has tested collagen for loose-skin prevention during GLP-1 treatment.',
    ],
    sources: [
      'Myung and Park, American Journal of Medicine, 2025, dossier [32]',
      'Rocha et al., Aesthetic Surgery Journal, 2021, dossier [33]',
      'Sami et al., Aesthetic Plastic Surgery, 2015, dossier [34]',
      'Ashtary-Larky et al., British Journal of Nutrition, 2020, dossier [46]',
    ],
  },
]

export function findArticle(slug: string | undefined): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
