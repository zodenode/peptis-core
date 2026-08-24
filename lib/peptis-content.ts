export const blogCategories = [
  "Muscle & body composition",
  "Protein & nutrition",
  "Training & strength",
  "Skin, face & hair",
  "Side effects & adherence",
  "Continuation & maintenance",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  studyLimit?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  category: BlogCategory;
  readTime: string;
  published: string;
  reviewed: string;
  image: string;
  imageAlt: string;
  keyTakeaway: string;
  sections: ArticleSection[];
  sources: { label: string; url: string }[];
  cta: { label: string; href: string };
};

export const problemSolutionPairs = [
  {
    number: "01",
    problem: "A lower number can hide a lower-quality outcome.",
    evidence: "Large weight-loss trials show fat falls more than lean tissue, but absolute lean mass can still decline. Lean mass is not identical to skeletal muscle.",
    solution: "Track strength, function, waist, routine and weight together instead of treating the scale as the whole result.",
    label: "Scale-only thinking → outcome quality",
  },
  {
    number: "02",
    problem: "Lower appetite leaves less room for nutritional mistakes.",
    evidence: "Controlled semaglutide studies measured materially lower ad-libitum energy intake. Smaller food volume can make protein, fluids, fibre and micronutrients harder to obtain.",
    solution: "Use protein-forward small meals, fluids across the day and a convenient complete protein only when food leaves a real gap.",
    label: "Low appetite → achievable nutrition",
  },
  {
    number: "03",
    problem: "Weight loss does not automatically protect strength.",
    evidence: "Across weight-loss research, resistance training is the clearest behavioural intervention for reducing lean-tissue loss and preserving physical function.",
    solution: "Build two or three progressive full-body sessions into the programme, with realistic substitutions and measurable progression.",
    label: "Lean-tissue concern → progressive loading",
  },
  {
    number: "04",
    problem: "GI symptoms can break the routine.",
    evidence: "Nausea, diarrhoea, vomiting and constipation are common in current semaglutide and tirzepatide labels, particularly during escalation.",
    solution: "Use smaller eating occasions, slower eating, symptom-aware food choices, hydration and clear escalation rules—never self-directed dose changes.",
    label: "Tolerability friction → practical support",
  },
  {
    number: "05",
    problem: "Skin and facial change are easy to exploit.",
    evidence: "Major volume loss, age, prior obesity, smoking, sun exposure, genetics and skin quality all influence laxity. There is no strong evidence that approved GLP-1 medicines directly poison collagen.",
    solution: "Set honest expectations, support general skin health and the shape beneath it, then refer significant concerns to qualified dermatology or plastic-surgery care.",
    label: "Appearance anxiety → honest options",
  },
  {
    number: "06",
    problem: "Maintenance often starts after regain has begun.",
    evidence: "In the STEP 1 extension, participants regained about two-thirds of their prior loss during the year after semaglutide and study lifestyle support stopped.",
    solution: "Begin maintenance readiness during treatment: routines, strength, nutrition, monitoring and a clinician-led plan for any medication change.",
    label: "Stopping or interruption → continuity plan",
  },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "does-ozempic-cause-muscle-loss",
    title: "Does Ozempic cause muscle loss? What the trials actually measured",
    dek: "The concern is legitimate, but the viral version confuses lean mass with skeletal muscle and ignores what happened to fat mass, strength and function.",
    category: "Muscle & body composition",
    readTime: "18 min read",
    published: "23 August 2026",
    reviewed: "Primary-source review completed; independent clinician review pending",
    image: "/peptis-strength-scene.webp",
    imageAlt: "An adult completing a controlled goblet squat while a trainer observes",
    keyTakeaway: "Significant weight loss can include lean tissue, but current evidence does not support the blanket claim that GLP-1 medicines simply burn muscle.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Semaglutide-assisted weight loss can include a reduction in measured lean mass. That matters, particularly for older, frail, sedentary or undernourished people. But a DXA lean-mass number is not a direct measurement of contractile muscle, and fat generally falls substantially more.",
          "The scientifically useful question is not whether every gram of lean tissue can be preserved. It is whether a person is maintaining strength, function, adequate nutrition and a favourable proportion of fat loss while weight falls.",
        ],
      },
      {
        heading: "What STEP 1 measured",
        paragraphs: [
          "In the exploratory STEP 1 DXA substudy, semaglutide 2.4 mg was associated with a 19.3% reduction in total fat mass, a 27.4% reduction in visceral fat mass and a 9.7% reduction in total lean mass. Because fat fell faster, lean mass represented a larger share of the body at the end of the substudy.",
          "That is compatible with two statements being true at once: absolute lean mass declined, and overall body composition improved. Headlines often report only the first.",
        ],
        studyLimit: "The DXA analysis was exploratory and involved a subset of STEP 1. DXA lean mass includes water, organs, connective tissue and other fat-free tissue; it is not a muscle biopsy or direct MRI measurement of all skeletal muscle.",
      },
      {
        heading: "Why lean mass can fall",
        paragraphs: ["Lean tissue can decline during any large energy deficit, including dieting and bariatric surgery. The mechanism is not necessarily a unique toxic effect of the medicine."],
        bullets: [
          "Eating less can reduce total protein and the energy available for muscle-protein synthesis.",
          "A lighter body provides less day-to-day mechanical loading.",
          "Inactivity removes the signal that tells the body to retain performance capacity.",
          "Glycogen and its associated water contribute to measured lean mass.",
          "Age, chronic disease, repeated dieting and low baseline muscle create less reserve.",
        ],
      },
      {
        heading: "Who should take the concern more seriously",
        paragraphs: ["Risk is not evenly distributed. A person with good baseline strength and a progressive training routine is not in the same situation as someone already struggling to rise from a chair."],
        bullets: [
          "Adults over roughly 60–65, especially with falls, slow gait or low grip strength.",
          "People losing very rapidly while skipping meals or repeatedly vomiting.",
          "People with chronic kidney, liver, inflammatory or gastrointestinal disease.",
          "Anyone noticing worsening balance, daily function or sustained gym-performance decline.",
        ],
      },
      {
        heading: "What to do in practice",
        paragraphs: [
          "The most defensible programme combines progressive resistance training, an individualized protein target, enough total nutrition, symptom-aware meal structure and function tracking. Protein supports the training stimulus; it does not replace it.",
          "Measure a few things repeatedly under similar conditions: training loads or repetitions, a chair-rise or push-up variation, walking tolerance, waist and weight trend. Escalate unexplained weakness, falls, dehydration or rapid unintended loss to a clinician.",
        ],
      },
    ],
    sources: [
      { label: "STEP 1 exploratory DXA analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8089287/" },
      { label: "SURMOUNT-1 DXA substudy", url: "https://dom-pubs.onlinelibrary.wiley.com/doi/10.1111/dom.16275" },
      { label: "2025 multi-society nutrition advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
    ],
    cta: { label: "Build a body-recomposition starting plan", href: "/?start=1" },
  },
  {
    slug: "lean-mass-vs-muscle-mass",
    title: "Lean mass vs muscle mass: why DXA headlines can mislead",
    dek: "A lean-mass change is important, but it is not a one-for-one measure of contractile skeletal muscle or physical capability.",
    category: "Muscle & body composition",
    readTime: "15 min read",
    published: "23 August 2026",
    reviewed: "Primary-source review completed; independent clinician review pending",
    image: "/peptis-hero-recomposition.webp",
    imageAlt: "A diverse group of adults in a calm strength-training studio",
    keyTakeaway: "Body-composition tools estimate different compartments; strength and function have to be measured rather than inferred from a single scan.",
    sections: [
      {
        heading: "Four terms that are not interchangeable",
        paragraphs: ["Fat mass is adipose tissue. Fat-free or lean mass is everything that is not fat. Skeletal muscle is the contractile tissue that produces movement. Strength and physical function describe what that tissue—and the rest of the person—can do."],
        bullets: [
          "Lean mass includes skeletal muscle, organs, connective tissue and body water.",
          "Appendicular lean mass estimates tissue in the arms and legs and is closer to, but still not identical with, muscle.",
          "Strength can remain stable even when a scan estimates less lean mass.",
          "A stable scan does not guarantee good function if a person is inactive or deconditioned.",
        ],
      },
      {
        heading: "What DXA is good at",
        paragraphs: ["DXA is useful for estimating fat, lean tissue and bone mineral with relatively low radiation. Repeated on the same machine under similar hydration and preparation conditions, it can show a more credible trend than a consumer scale."],
        studyLimit: "DXA is still an estimate. Hydration, glycogen, recent food, device calibration and analysis choices can shift the result. A small change should not be presented as exact tissue gained or lost.",
      },
      {
        heading: "Why water and glycogen matter",
        paragraphs: ["Muscle stores glycogen, and glycogen is stored with water. A large change in energy intake can alter both. Some of an early lean-mass change may therefore reflect substrate and fluid, not loss of an equivalent amount of muscle protein."],
      },
      {
        heading: "A better monitoring stack",
        paragraphs: ["Use body composition as one layer, not the verdict. Pair it with waist, weight trend, training performance and a simple function test."],
        bullets: [
          "Repeat the same exercises and record load, repetitions and effort.",
          "Use a timed chair-rise, grip dynamometer or consistent push-up variation where appropriate.",
          "Repeat scans under similar conditions and resist overreacting to one result.",
          "Seek clinical assessment when weakness, falls or daily-function decline is new or progressive.",
        ],
      },
    ],
    sources: [
      { label: "STEP 1 exploratory DXA analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8089287/" },
      { label: "SURMOUNT-1 DXA substudy", url: "https://dom-pubs.onlinelibrary.wiley.com/doi/10.1111/dom.16275" },
      { label: "Multi-society GLP-1 nutrition advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
    ],
    cta: { label: "See how Peptis tracks more than weight", href: "/?start=1" },
  },
  {
    slug: "how-much-protein-on-glp-1",
    title: "How much protein should you eat on a GLP-1?",
    dek: "Useful ranges exist, but the right denominator, meal size and medical context matter more than copying one number from social media.",
    category: "Protein & nutrition",
    readTime: "18 min read",
    published: "23 August 2026",
    reviewed: "Primary-source review completed; independent clinician review pending",
    image: "/peptis-nutrition-ritual.webp",
    imageAlt: "A clear peach drink beside a small protein-forward breakfast",
    keyTakeaway: "Many active weight-loss contexts use roughly 1.2–1.6 g/kg/day and 25–30 g per meal, but current body weight is not always the right denominator and medical conditions can change the advice.",
    sections: [
      {
        heading: "Why protein becomes more—not less—important",
        paragraphs: ["Lower appetite can reduce meal size and frequency. That makes it easier for the day to fill with small low-protein foods while total intake falls. Protein supplies essential amino acids, supports maintenance of muscle mass and makes resistance training more productive."],
      },
      {
        heading: "A useful range, not a universal prescription",
        paragraphs: ["Reviews of higher-protein weight-loss diets commonly identify approximately 1.2–1.6 grams per kilogram per day as a useful range for many active adults, often distributed in meals containing around 25–30 grams of protein. Resistance-training literature commonly studies 20–40 gram doses of high-quality protein."],
        studyLimit: "These ranges are drawn mainly from general weight-loss and training research, not large randomized trials designed specifically to find the optimal protein target for every semaglutide or tirzepatide user.",
      },
      {
        heading: "Which body weight should you use?",
        paragraphs: ["Using a high target multiplied by current body weight can produce an unnecessarily large number for someone living with obesity. A clinician or dietitian may instead use goal weight, adjusted body weight, ideal body weight or measured lean mass."],
        bullets: [
          "Current body weight may be reasonable for some active people near their target range.",
          "Goal or adjusted weight may make the target more realistic at a higher starting weight.",
          "Older adults may benefit from particular attention to per-meal protein quality and distribution.",
          "Kidney or liver disease, pregnancy and complex medical conditions require individualized guidance.",
        ],
      },
      {
        heading: "Food first, then close a real gap",
        paragraphs: ["Build small eating occasions around eggs, Greek yogurt, cottage cheese, fish, poultry, tofu, legumes or another tolerated protein. A clear whey serving can be useful when a large milky shake feels heavy, but clear whey is a format advantage—not a medicine or proof of superior clinical outcomes."],
      },
      {
        heading: "A practical day",
        paragraphs: ["Aim for several repeatable protein anchors rather than one enormous dinner: a protein-forward breakfast, a small lunch, a complete-protein drink if needed and a tolerable evening meal. Pair the plan with fluids, plants and gradually adjusted fibre."],
      },
    ],
    sources: [
      { label: "2025 multi-society nutrition advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
      { label: "Protein in weight loss and maintenance review", url: "https://doi.org/10.3945/ajcn.114.084038" },
      { label: "Semaglutide appetite and intake study", url: "https://pubmed.ncbi.nlm.nih.gov/28266779/" },
    ],
    cta: { label: "Build a protein-aware starting plan", href: "/?start=1" },
  },
  {
    slug: "two-day-glp-1-strength-plan",
    title: "The two-day GLP-1 strength plan for beginners",
    dek: "Two well-designed full-body sessions can create a credible minimum dose when energy, confidence or time is limited.",
    category: "Training & strength",
    readTime: "17 min read",
    published: "23 August 2026",
    reviewed: "Exercise-science review completed; clinician review pending",
    image: "/peptis-strength-scene.webp",
    imageAlt: "An adult performing a goblet squat in a calm training studio",
    keyTakeaway: "Train the main movement patterns twice weekly, start below failure and progress one variable at a time.",
    sections: [
      {
        heading: "The minimum credible structure",
        paragraphs: ["The plan uses six patterns: squat or sit-to-stand, hinge, push, pull, carry or brace, and a calf or step pattern. Two full-body sessions provide repeated practice without demanding a gym-centred life."],
      },
      {
        heading: "Session A",
        paragraphs: ["Warm up for five to eight minutes with easy movement and one lighter practice set for each major exercise."],
        bullets: [
          "Goblet squat or chair squat — 2–3 sets of 6–12 repetitions.",
          "Dumbbell Romanian deadlift or supported hip hinge — 2–3 sets of 6–12.",
          "Incline push-up or chest press — 2–3 sets of 6–12.",
          "Supported row or cable row — 2–3 sets of 8–15.",
          "Farmer carry or dead bug — 2–3 controlled rounds.",
        ],
      },
      {
        heading: "Session B",
        paragraphs: ["Leave at least one day between sessions when possible and use variations that feel technically stable."],
        bullets: [
          "Split squat or step-up — 2–3 sets of 6–12 per side.",
          "Hip thrust or glute bridge — 2–3 sets of 8–15.",
          "Seated dumbbell press or landmine press — 2–3 sets of 6–12.",
          "Lat pulldown or band pulldown — 2–3 sets of 8–15.",
          "Calf raise plus side plank — 2 controlled rounds each.",
        ],
      },
      {
        heading: "How hard should it feel?",
        paragraphs: ["Begin with roughly three repetitions left in reserve. Add repetitions until you reach the top of the range with stable form, then add a small amount of load and return to the lower end. Do not turn every set into a test."],
      },
      {
        heading: "When to modify or stop",
        paragraphs: ["Move the session, reduce volume or use an easier variation when food or fluid intake has been poor. Stop and seek appropriate advice for chest pain, fainting, severe shortness of breath, new neurological symptoms, repeated hypoglycaemia, significant pain or rapidly worsening weakness."],
        studyLimit: "This is general fitness education. Medication, diabetes treatment, pregnancy, injuries, severe symptoms and substantial functional limitations require individual clinical or coaching guidance.",
      },
    ],
    sources: [
      { label: "Exercise during weight loss: overview of reviews", url: "https://doi.org/10.1111/obr.13256" },
      { label: "Multi-society GLP-1 nutrition and lifestyle advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
      { label: "Aerobic or resistance exercise in dieting older adults", url: "https://pubmed.ncbi.nlm.nih.gov/28514618/" },
    ],
    cta: { label: "Generate your detailed 12-week plan", href: "/?start=1" },
  },
  {
    slug: "ozempic-face-loose-skin-science",
    title: "Ozempic face and loose skin: what is real, what is hype",
    dek: "Visible change after major weight loss is real. A drug-specific collagen-damage story is not established, and honest options depend on severity.",
    category: "Skin, face & hair",
    readTime: "17 min read",
    published: "23 August 2026",
    reviewed: "Primary-source review completed; dermatology review pending",
    image: "/peptis-skin-transition.webp",
    imageAlt: "An adult calmly applying moisturizer while looking in a mirror",
    keyTakeaway: "Loss of facial and body fat volume can reveal laxity; age, total loss, skin quality, smoking, sun exposure, genetics and weight history all matter.",
    sections: [
      {
        heading: "The label is not a diagnosis",
        paragraphs: ["“Ozempic face” is a media phrase for facial hollowing, laxity or a more aged appearance noticed after weight loss. The same visual transition can occur after substantial loss achieved through other methods."],
      },
      {
        heading: "What is changing",
        paragraphs: ["Deep and superficial fat compartments become smaller. Skin that previously covered a larger volume has to retract. Collagen and elastic-fibre quality, age, UV exposure, smoking, genetics, pregnancies, weight cycling and the duration and amount of prior obesity all influence how complete that retraction can be."],
      },
      {
        heading: "Does the medicine directly damage collagen?",
        paragraphs: ["Current human evidence does not establish that approved semaglutide or tirzepatide directly poisons skin collagen. Histology studies after massive weight loss show altered collagen density and elastic networks, but they do not prove a GLP-1-specific cause."],
        studyLimit: "Most skin-tissue studies involve people seeking body-contouring surgery after massive weight loss. They are small and cannot isolate medication effects from age, weight history or the magnitude of tissue-volume change.",
      },
      {
        heading: "What can help—and what cannot",
        bullets: [
          "Time at a stable weight allows the final contour to become clearer.",
          "Sun protection, smoking cessation and adequate nutrition support general skin health.",
          "Resistance training can build the shape beneath the skin but cannot remove a large fold.",
          "Moisturizers and retinoids may improve surface quality; they do not replace lost facial volume or contract substantial excess skin.",
          "Energy-based procedures, injectables or surgery may be appropriate after qualified assessment, depending on the concern.",
        ],
        paragraphs: ["The honest answer is proportional: skincare for surface quality, dermatology or aesthetics for selected mild-to-moderate concerns, and plastic-surgery consultation when excess skin is substantial and stable."],
      },
      {
        heading: "What about collagen supplements?",
        paragraphs: ["Some earlier trials reported modest changes in hydration or elasticity. A 2025 meta-analysis found that apparent benefits did not persist in high-quality or non-industry-funded subsets. No supplement has been shown to prevent clinically meaningful loose skin during GLP-1-assisted weight loss."],
      },
    ],
    sources: [
      { label: "American Academy of Dermatology: GLP-1 skin, hair and nail considerations", url: "https://www.aad.org/public/diseases/a-z/glp-1-skin-hair-nails" },
      { label: "Skin changes due to massive weight loss", url: "https://doi.org/10.1093/asj/sjaa406" },
      { label: "2025 collagen supplement meta-analysis", url: "https://doi.org/10.1016/j.amjmed.2025.01.021" },
    ],
    cta: { label: "Explore the body-recomposition approach", href: "/?start=1" },
  },
  {
    slug: "what-happens-after-stopping-semaglutide",
    title: "What happens after stopping semaglutide?",
    dek: "Regain is common in withdrawal trials. It reflects the chronic biology of obesity—not a moral failure or proof that the medicine damaged metabolism.",
    category: "Continuation & maintenance",
    readTime: "19 min read",
    published: "23 August 2026",
    reviewed: "Primary-source review completed; independent clinician review pending",
    image: "/peptis-glp-continuity-hero.webp",
    imageAlt: "An adult planning the week in a calm kitchen",
    keyTakeaway: "A maintenance plan should begin before a medication change, and the decision to reduce or stop belongs with the prescribing clinician.",
    sections: [
      {
        heading: "The STEP 1 extension",
        paragraphs: ["After 68 weeks, participants who had received semaglutide 2.4 mg and lifestyle intervention stopped both the medicine and the structured study support. Over the next year, the extension group regained about two-thirds of the weight they had previously lost, and many cardiometabolic measures moved back toward baseline."],
        studyLimit: "The extension included 327 participants and was exploratory. It did not compare different tapering schedules, intensive maintenance programmes or individualized clinical strategies.",
      },
      {
        heading: "The STEP 4 withdrawal trial",
        paragraphs: ["Participants first received semaglutide for 20 weeks. From week 20 to 68, those continuing treatment lost a further 7.9%, while those switched to placebo gained 6.9%. The design supports a chronic-treatment model but does not mean every person must follow one identical lifetime pathway."],
      },
      {
        heading: "Why regain can happen",
        paragraphs: ["Appetite regulation and the biological pressure to defend body weight return when an effective treatment is removed. Food environment, sleep, stress, activity, cost, side effects and treatment duration also affect the trajectory."],
      },
      {
        heading: "Build readiness before the change",
        bullets: [
          "Discuss the clinical reason, timing and alternative options with the prescriber.",
          "Establish protein-forward meals and a realistic eating rhythm while appetite is still supported.",
          "Maintain progressive strength training and a consistent movement baseline.",
          "Agree on a weight-trend threshold and follow-up cadence before drift becomes large.",
          "Plan for insurance, supply or affordability disruption rather than waiting for a gap.",
          "Address shame and all-or-nothing thinking; some regain is biological information, not failure.",
        ],
      },
      {
        heading: "What Peptis means by continuity",
        paragraphs: ["Continuity is support across starts, dose changes, stable treatment, switching, interruptions and clinician-led discontinuation. It is not a promise of no regain and it is not self-directed medication management."],
      },
    ],
    sources: [
      { label: "STEP 1 withdrawal extension", url: "https://pubmed.ncbi.nlm.nih.gov/35441470/" },
      { label: "STEP 4 randomized withdrawal trial", url: "https://pubmed.ncbi.nlm.nih.gov/33755728/" },
      { label: "Multi-society GLP-1 nutrition advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
    ],
    cta: { label: "See Peptis GLP-1 Continuity Care", href: "/glp-continuity" },
  },
  {
    slug: "creatine-and-glp-1-medication",
    title: "Creatine and GLP-1 medication: what is known and unknown",
    dek: "Creatine can support training adaptation. It has not been proven to prevent a medication adverse effect or eliminate lean-mass loss during GLP-1 treatment.",
    category: "Training & strength",
    readTime: "15 min read",
    published: "23 August 2026",
    reviewed: "Sports-nutrition review completed; clinician review pending",
    image: "/peptis-strength-scene.webp",
    imageAlt: "An adult completing a controlled strength-training exercise",
    keyTakeaway: "The evidence case for creatine is strongest when it is paired with progressive resistance training, not marketed as a GLP-1 antidote.",
    sections: [
      {
        heading: "What creatine does",
        paragraphs: ["Creatine increases the availability of phosphocreatine for repeated high-intensity effort. Across resistance-training studies, it can improve strength and add a small amount of measured lean mass beyond training alone."],
      },
      {
        heading: "What the lean-mass number means",
        paragraphs: ["A 2024 meta-analysis reported roughly 1.14 kg more DXA lean mass with creatine plus resistance training than with training alone. Some early change reflects water stored in muscle, so the DXA number should not be described as an identical amount of new contractile tissue."],
        studyLimit: "These studies were not designed around semaglutide or tirzepatide users. Direct evidence that creatine prevents GLP-1-associated lean-tissue loss is limited.",
      },
      {
        heading: "How it is commonly used",
        paragraphs: ["A common maintenance amount is 3–5 grams of creatine monohydrate daily. Loading is optional. Consistency and product quality matter more than an exotic form."],
      },
      {
        heading: "Who should ask before using it",
        paragraphs: ["People with kidney disease, pregnancy, complex medical conditions or unexplained laboratory abnormalities should discuss use with a qualified clinician. Anyone struggling to maintain fluids or experiencing persistent vomiting should solve the clinical problem, not add another supplement."],
      },
      {
        heading: "The Peptis position",
        paragraphs: ["Creatine can be a useful training adjunct for a suitable person. The defensible claim is support for repeated high-intensity performance and training adaptation—not prevention of Ozempic muscle loss."],
      },
    ],
    sources: [
      { label: "Creatine plus resistance training meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/39028469/" },
      { label: "ISSN position stand on creatine", url: "https://pubmed.ncbi.nlm.nih.gov/28615996/" },
      { label: "Multi-society GLP-1 nutrition advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
    ],
    cta: { label: "Build the training plan first", href: "/?start=1" },
  },
  {
    slug: "glp-1-low-appetite-food-plan",
    title: "What to eat when a GLP-1 makes food feel unappealing",
    dek: "The objective is not to force a large meal. It is to keep fluids, protein and nutrient density visible while symptoms are assessed appropriately.",
    category: "Side effects & adherence",
    readTime: "17 min read",
    published: "23 August 2026",
    reviewed: "Primary-source review completed; clinician review pending",
    image: "/peptis-nutrition-ritual.webp",
    imageAlt: "A small breakfast and clear drink prepared in a calm kitchen",
    keyTakeaway: "Use smaller protein-forward eating occasions, build fluids across the day and escalate persistent or severe symptoms rather than trying to out-diet them.",
    sections: [
      {
        heading: "Why this happens",
        paragraphs: ["GLP-1-based medicines reduce appetite and can increase early satiety. Nausea, vomiting, diarrhoea and constipation also occur in current product labels. The goal is to distinguish an expected but manageable change from a pattern that is creating dehydration, malnutrition or another medical risk."],
      },
      {
        heading: "Build a smaller eating occasion",
        bullets: [
          "Choose one tolerated protein: Greek yogurt, egg, cottage cheese, fish, poultry, tofu or a complete-protein drink.",
          "Add a modest carbohydrate or fruit when it improves energy and tolerance.",
          "Keep very large or high-fat meals optional; some people find them harder during escalation.",
          "Eat slowly and stop at comfortable fullness rather than forcing a target volume.",
        ],
      },
      {
        heading: "Hydration and constipation",
        paragraphs: ["Spread fluids across the day. Increase fibre gradually and pair it with fluid; rapidly adding a large fibre dose to a poorly hydrated person can make discomfort worse. Medication and symptom context matter."],
      },
      {
        heading: "When it is no longer a food problem",
        paragraphs: ["Contact the clinical team for persistent vomiting, inability to keep fluids down, fainting, very low urine output, severe constipation, rapidly worsening weakness or symptoms that prevent adequate intake. Severe or persistent abdominal pain—especially if it radiates to the back—requires urgent assessment."],
      },
      {
        heading: "Do not self-adjust medication",
        paragraphs: ["Food-format guidance cannot replace medication management. Do not change dose, injection timing or treatment status on the basis of a general article. Bring the symptom pattern, timing, food intake and hydration history to the prescribing clinician."],
        studyLimit: "This article provides general education and cannot determine the cause or severity of an individual symptom.",
      },
    ],
    sources: [
      { label: "2025 multi-society nutrition advisory", url: "https://pubmed.ncbi.nlm.nih.gov/40450457/" },
      { label: "FDA Wegovy prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s021lbl.pdf" },
      { label: "FDA Zepbound prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s020lbl.pdf" },
    ],
    cta: { label: "Explore Continuity Care", href: "/glp-continuity" },
  },
];

export type ArticleQuickFact = {
  value: string;
  label: string;
  context: string;
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticlePathwayLink = {
  slug: string;
  label: string;
  context: string;
};

type ArticleEnhancement = {
  quickFacts: ArticleQuickFact[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  pathway: ArticlePathwayLink[];
  sources: { label: string; url: string }[];
};

export type ArticleSeo = {
  title: string;
  description: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  publishedAt: string;
  updatedAt: string;
};

export const articleSeoBySlug: Record<string, ArticleSeo> = {
  "does-ozempic-cause-muscle-loss": {
    title: "Does Ozempic Cause Muscle Loss? Evidence Explained",
    description: "Learn what Ozempic and semaglutide trials measured, who may be at greater risk of lean-mass loss, and how strength training and protein may help.",
    primaryKeyword: "does Ozempic cause muscle loss",
    relatedKeywords: ["semaglutide muscle loss", "GLP-1 muscle loss", "Ozempic lean mass", "protect muscle on GLP-1"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "lean-mass-vs-muscle-mass": {
    title: "Lean Mass vs Muscle Mass: What Your Scan Really Shows",
    description: "Understand the difference between lean mass, skeletal muscle and strength—and why DXA or smart-scale changes should not be interpreted in isolation.",
    primaryKeyword: "lean mass vs muscle mass",
    relatedKeywords: ["DXA lean mass", "skeletal muscle mass", "body composition scan", "sarcopenia vs lean mass loss"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "how-much-protein-on-glp-1": {
    title: "How Much Protein Should You Eat on a GLP-1?",
    description: "See evidence-based protein ranges for GLP-1 weight loss, how to choose the right body-weight target, and practical ways to eat with a low appetite.",
    primaryKeyword: "how much protein on GLP-1",
    relatedKeywords: ["protein on Ozempic", "protein on semaglutide", "GLP-1 diet", "protein target for weight loss"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "two-day-glp-1-strength-plan": {
    title: "Two-Day GLP-1 Strength Plan for Beginners",
    description: "A practical two-day full-body strength plan for GLP-1 users who want to preserve capability and muscle while managing lower appetite and recovery.",
    primaryKeyword: "GLP-1 strength training plan",
    relatedKeywords: ["Ozempic workout plan", "semaglutide strength training", "GLP-1 exercise", "beginner full-body workout"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "ozempic-face-loose-skin-science": {
    title: "Ozempic Face and Loose Skin: What the Evidence Says",
    description: "Learn why facial volume and loose skin can change after major weight loss, what GLP-1 medicines do not prove, and which options are realistic.",
    primaryKeyword: "Ozempic face and loose skin",
    relatedKeywords: ["Ozempic face", "loose skin after weight loss", "semaglutide face changes", "GLP-1 skin sag"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "what-happens-after-stopping-semaglutide": {
    title: "What Happens After Stopping Semaglutide?",
    description: "Review the evidence on weight regain after stopping semaglutide, why it can happen, and how to build a clinician-led maintenance and continuity plan.",
    primaryKeyword: "what happens after stopping semaglutide",
    relatedKeywords: ["semaglutide weight regain", "stopping Ozempic", "GLP-1 maintenance", "keep weight off after semaglutide"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "creatine-and-glp-1-medication": {
    title: "Creatine and GLP-1 Medication: Safety and Evidence",
    description: "Can you take creatine with semaglutide or another GLP-1? Review the evidence, hydration considerations, kidney cautions and realistic benefits.",
    primaryKeyword: "creatine and GLP-1 medication",
    relatedKeywords: ["creatine and semaglutide", "creatine and Ozempic", "GLP-1 supplements", "creatine during weight loss"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
  "glp-1-low-appetite-food-plan": {
    title: "GLP-1 Low-Appetite Food Plan: What to Eat",
    description: "Use a practical GLP-1 food plan for nausea or low appetite, with protein-forward small meals, hydration guidance and symptoms that need medical care.",
    primaryKeyword: "GLP-1 low appetite food plan",
    relatedKeywords: ["what to eat on GLP-1", "Ozempic nausea food", "semaglutide meal plan", "GLP-1 diet plan"],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-24",
  },
};

const articleEnhancements: Record<string, ArticleEnhancement> = {
  "does-ozempic-cause-muscle-loss": {
    quickFacts: [
      { value: "≈25%", label: "of weight lost", context: "A 2025 network meta-analysis estimated lean mass at roughly one quarter of total weight lost across included GLP-1 and dual-agonist trials; individual studies varied." },
      { value: "7 RCTs", label: "in a 2026 review", context: "The pooled estimate found absolute lean mass declined while lean mass as a share of body weight improved. Heterogeneity was high." },
      { value: "2–3×", label: "strength sessions weekly", context: "A practical target for many people, adjusted to ability, symptoms and recovery. Training is the retention signal that protein alone cannot provide." },
    ],
    sections: [
      {
        heading: "How much lean mass loss is typical?",
        paragraphs: [
          "There is no single percentage that applies to every medicine, dose or person. A 2025 network meta-analysis of 22 randomized trials estimated that lean mass represented about 25% of total weight lost on average. A separate 2026 review of seven obesity-dose randomized trials also found a fall in absolute lean mass, alongside an improvement in lean mass as a proportion of body weight.",
          "Those pooled results are useful for scale, not prediction. Trial methods, populations, hydration, diabetes status, duration and body-composition tools differed. A person losing a moderate amount slowly while training may have a different outcome from a frail person losing quickly with persistent vomiting.",
        ],
        studyLimit: "Meta-analyses combine studies that did not all measure the same tissue in the same way. High between-study heterogeneity means a pooled average should not be turned into a personal forecast.",
      },
      {
        heading: "Muscle quantity, quality and performance can move differently",
        paragraphs: [
          "A smaller muscle is not automatically a proportionally weaker muscle. Weight loss can reduce fat stored around and within muscle, change leverage and make body-weight tasks easier. Early studies that measured grip strength, chair rise or muscle composition have not shown a consistent collapse in function, but functional data remain much thinner than weight data.",
          "This is why the debate cannot be settled by a before-and-after DXA panel. A credible assessment asks whether strength relative to body weight, walking tolerance and daily capability are stable, improving or deteriorating.",
        ],
      },
      {
        heading: "A twelve-week muscle-protection dashboard",
        paragraphs: [
          "Start before a large change is visible. Record a baseline, repeat the same measures under similar conditions and look for a pattern rather than one bad day.",
        ],
        bullets: [
          "Week 0: weight trend, waist, usual protein pattern, chair rise or grip, and repeatable training loads.",
          "Weeks 1–4: adherence, hydration, GI symptoms and whether repetitions or loads are being maintained.",
          "Weeks 5–8: progression in at least two major movements, plus any change in fatigue, balance or daily function.",
          "Weeks 9–12: compare weight, waist, performance and routine together; do not grade success from weight alone.",
          "At any point: route persistent weakness, falls, fainting, dehydration or inability to eat to clinical assessment.",
        ],
      },
      {
        heading: "Five mistakes that make the risk harder to manage",
        paragraphs: ["Most preventable problems come from the support system around treatment, not from failing to find a miracle supplement."],
        bullets: [
          "Waiting until strength has already declined before beginning resistance training.",
          "Chasing a very high protein number while total food, fluids and tolerability are poor.",
          "Treating every kilogram of DXA lean mass as a kilogram of destroyed skeletal muscle.",
          "Increasing training volume aggressively during dose escalation or persistent nausea.",
          "Celebrating faster loss without checking function, symptoms or nutritional adequacy.",
        ],
      },
    ],
    faqs: [
      { question: "Does semaglutide cause sarcopenia?", answer: "A fall in DXA lean mass is not, by itself, a diagnosis of sarcopenia. Sarcopenia assessment considers low muscle strength and impaired function, often with low muscle quantity. People with frailty or pre-existing low strength need closer clinical attention." },
      { question: "Can extra protein prevent all muscle loss?", answer: "No. Protein can help meet amino-acid needs, but it does not replace progressive resistance training, adequate total intake or clinical management of severe symptoms." },
      { question: "Is rapid weight loss always bad for muscle?", answer: "Not automatically, but very rapid or unintended loss can leave less time to adapt and may signal inadequate intake or illness. The concerning pattern is rapid loss combined with weakness, poor function, dehydration or persistent vomiting." },
      { question: "Should I get a DXA scan?", answer: "It can add useful context when repeated consistently, especially in higher-risk people, but it is optional for many. A simpler stack of strength, function, waist and weight trend can still be informative." },
      { question: "What is the most important first step?", answer: "Establish a safe, repeatable strength baseline and a realistic protein-forward eating rhythm before trying to optimize supplements." },
    ],
    pathway: [
      { slug: "lean-mass-vs-muscle-mass", label: "Understand the measurement", context: "See why lean mass, muscle and strength are different outcomes." },
      { slug: "how-much-protein-on-glp-1", label: "Set a realistic protein structure", context: "Use ranges without turning them into a universal prescription." },
      { slug: "two-day-glp-1-strength-plan", label: "Start the training signal", context: "Use a minimum effective two-day full-body plan." },
    ],
    sources: [
      { label: "2025 network meta-analysis of GLP-1 therapies and body composition", url: "https://pubmed.ncbi.nlm.nih.gov/39719170/" },
      { label: "2026 systematic review of obesity-dose GLP-1 trials and muscle health", url: "https://pubmed.ncbi.nlm.nih.gov/42321502/" },
      { label: "Resistance training and body composition in adults with overweight or obesity", url: "https://pubmed.ncbi.nlm.nih.gov/35191588/" },
    ],
  },
  "lean-mass-vs-muscle-mass": {
    quickFacts: [
      { value: "3", label: "main DXA compartments", context: "DXA separates bone mineral, fat and lean soft tissue. It does not directly isolate every kilogram of skeletal muscle." },
      { value: "2–3%", label: "short-term lean-mass shift", context: "A controlled glycogen-loading study changed DXA lean-mass estimates by this order without an equivalent change in muscle protein." },
      { value: "4 signals", label: "for a better decision", context: "Weight, waist, strength and function provide a more useful monitoring stack than any one body-composition estimate." },
    ],
    sections: [
      {
        heading: "DXA, BIA, CT and MRI answer different questions",
        paragraphs: [
          "DXA is accessible and useful for whole-body trends. Bioelectrical impedance is more convenient but more sensitive to fluid and algorithm differences. CT and MRI can quantify specific muscle areas and, in some settings, fat infiltration within muscle, but they are more expensive and not routine progress tools.",
          "No method makes strength testing redundant. Imaging describes tissue; it does not prove how well a person climbs stairs, carries shopping or produces force.",
        ],
      },
      {
        heading: "How to standardize a repeat scan",
        paragraphs: ["The smaller the expected change, the more the testing conditions matter. Use the same device and make preparation as repeatable as practical."],
        bullets: [
          "Test at a similar time of day and hydration state.",
          "Avoid comparing a carbohydrate-depleted scan with a well-fed, glycogen-replete scan.",
          "Record recent hard training, illness, travel and major fluid changes.",
          "Use the same machine and analysis mode where possible.",
          "Interpret small differences as estimates with error, not exact tissue accounting.",
        ],
      },
      {
        heading: "Sarcopenia is not a synonym for lower lean mass",
        paragraphs: [
          "Contemporary sarcopenia frameworks put low strength at the centre of case finding and use low muscle quantity or quality to confirm the diagnosis. Poor physical performance helps identify greater severity. That is a different proposition from noticing that lean mass fell during intentional weight loss.",
          "This distinction matters because it changes the response. A scan trend may prompt better training and nutrition; new falls, slow gait or difficulty rising from a chair may require a clinical assessment for frailty, neurological disease, medication effects or other causes.",
        ],
      },
      {
        heading: "A practical interpretation ladder",
        bullets: [
          "Lean mass down, strength stable or up, waist substantially down: continue monitoring and keep progressive training in place.",
          "Lean mass down, strength down across several sessions: review intake, recovery, programme design and symptoms.",
          "Lean mass stable, function worsening: do not let the scan reassure you; investigate the functional change.",
          "One scan changed slightly with no supporting trend: repeat under comparable conditions before drawing a conclusion.",
          "Falls, severe weakness or loss of independence: seek clinical evaluation rather than trying to solve it with a consumer scan.",
        ],
        paragraphs: ["The objective is not to protect a number at any cost. It is to preserve capability while improving health and body composition."],
      },
    ],
    faqs: [
      { question: "Is lean body mass mostly muscle?", answer: "Skeletal muscle is a large component, but lean mass also includes water, organs, connective tissue and other non-fat tissue. The proportions vary by person and measurement method." },
      { question: "Can a smart scale measure muscle accurately?", answer: "Consumer bioimpedance scales can be useful for a consistent directional trend, but their muscle and body-fat outputs depend heavily on hydration and proprietary equations. Treat the exact number cautiously." },
      { question: "Why did my lean mass fall after starting creatine or changing carbohydrates?", answer: "Creatine usually increases intracellular water, while carbohydrate and glycogen changes can move water in either direction. Short-term scan changes may reflect fluid and substrate rather than matching changes in muscle protein." },
      { question: "How often should body composition be repeated?", answer: "There is no universal interval. Repeating too often can amplify normal measurement noise. Choose an interval long enough for a meaningful tissue trend and keep the conditions consistent." },
      { question: "What if my strength improves while lean mass falls?", answer: "That can occur. It is generally more reassuring than simultaneous losses of mass, strength and function, but the full context—including rate of loss, symptoms and nutritional adequacy—still matters." },
    ],
    pathway: [
      { slug: "does-ozempic-cause-muscle-loss", label: "Put GLP-1 headlines in context", context: "Review what the main body-composition trials measured." },
      { slug: "creatine-and-glp-1-medication", label: "Understand water and creatine", context: "Separate training benefits from changes in the lean-mass estimate." },
      { slug: "two-day-glp-1-strength-plan", label: "Measure something functional", context: "Start with repeatable movements and visible progression." },
    ],
    sources: [
      { label: "Glycogen, creatine and water can alter DXA lean-mass estimates", url: "https://pubmed.ncbi.nlm.nih.gov/28410328/" },
      { label: "EWGSOP2 consensus on sarcopenia assessment", url: "https://pubmed.ncbi.nlm.nih.gov/30312372/" },
    ],
  },
  "how-much-protein-on-glp-1": {
    quickFacts: [
      { value: "1.2–1.6", label: "g/kg/day research range", context: "Often used in active weight-loss literature, but it is not a universal GLP-1 prescription and may use goal or adjusted weight." },
      { value: "25–30 g", label: "common meal anchor", context: "A practical amount used in higher-protein research. Smaller or larger servings may fit better depending on appetite and body size." },
      { value: "3–4", label: "repeatable anchors", context: "Spreading tolerable protein opportunities across the day is usually more workable than forcing a very large evening meal." },
    ],
    sections: [
      {
        heading: "Start with a protein floor, then optimize",
        paragraphs: [
          "When appetite is very low, the first objective is often to prevent the day collapsing into almost no protein. Establish a realistic floor that can be met consistently, then move toward the individualized target as tolerability improves.",
          "A perfect number that is missed most days is less useful than three or four reliable eating occasions. The plan should leave room for fluids, fibre, fruit, vegetables and enough total energy to function.",
        ],
      },
      {
        heading: "Three worked examples",
        paragraphs: ["These are food-structure examples, not personal prescriptions. The purpose is to show how the same daily target can be distributed without an enormous dinner."],
        bullets: [
          "About 80 g: 20 g breakfast, 25 g lunch, 15 g snack or drink, 20 g dinner.",
          "About 100 g: 25 g breakfast, 30 g lunch, 15 g snack, 30 g dinner.",
          "About 120 g: 30 g breakfast, 30 g lunch, 25 g snack or drink, 35 g dinner.",
          "On a difficult-appetite day, reduce food volume before abandoning nutritional intent: yogurt, eggs, fish, tofu or a complete-protein drink may be easier than a large mixed meal.",
        ],
      },
      {
        heading: "Protein quality without food tribalism",
        paragraphs: [
          "Animal and plant foods can both contribute. Dairy, eggs, fish, poultry and whey are rich in essential amino acids per unit of food volume. Soy is a complete plant protein; legumes, grains, nuts and seeds can be combined across the day.",
          "A mostly plant-based plan may need slightly more attention to total amount, variety and digestibility. The best source is one that fits the person’s health needs, values, budget and GI tolerance.",
        ],
      },
      {
        heading: "When the standard range should not be copied",
        paragraphs: ["Protein needs and safe targets change with medical context. A general calculator should not overrule individual clinical guidance."],
        bullets: [
          "Chronic kidney disease, especially more advanced disease not treated with dialysis.",
          "Liver disease, pregnancy, eating-disorder history or major gastrointestinal disease.",
          "Older age with frailty, where function, meal quality and per-meal distribution deserve particular attention.",
          "Very high starting body weight, where multiplying current weight can produce an impractical target.",
          "Persistent nausea or vomiting, where symptom management and hydration take priority over forcing intake.",
        ],
      },
      {
        heading: "How to audit your week",
        paragraphs: [
          "Track three representative days rather than relying on memory. Mark each protein anchor, the approximate amount, symptoms and whether a training session followed. The aim is to find the recurring gap—often breakfast, an unplanned afternoon or the day after treatment—not to record food forever.",
          "If the target remains unreachable, reduce preparation friction first. Pre-portioned yogurt, eggs, cooked fish or poultry, tofu, cottage cheese and complete-protein drinks can turn an intention into an available option.",
        ],
      },
    ],
    faqs: [
      { question: "Should I calculate protein from my current weight?", answer: "Not always. At a higher body weight, clinicians may use goal weight, adjusted weight or lean mass so the target remains physiologically and practically sensible." },
      { question: "Is 100 grams of protein enough?", answer: "It may be appropriate for some people and too low or high for others. Body size, age, training, health conditions and total intake determine the context." },
      { question: "Do I need a protein shake?", answer: "No. It is a convenience tool. Use one when it closes a real food gap or is better tolerated than a meal; do not assume it has medication-like effects." },
      { question: "Can I get enough protein from plants?", answer: "Yes, with planning. Use varied sources and pay attention to total amount and essential amino-acid quality. Soy foods, legumes and strategically chosen fortified products can help." },
      { question: "What if protein makes nausea worse?", answer: "Try smaller portions, lower-fat preparations, cooler foods or a different texture. Persistent symptoms or inability to maintain fluids require contact with the prescribing team." },
    ],
    pathway: [
      { slug: "glp-1-low-appetite-food-plan", label: "Plan for difficult-appetite days", context: "Use a lower-volume food structure without ignoring red flags." },
      { slug: "does-ozempic-cause-muscle-loss", label: "Understand why protein matters", context: "Put lean-tissue concerns into trial and function context." },
      { slug: "two-day-glp-1-strength-plan", label: "Pair protein with the signal", context: "Use resistance training instead of expecting nutrition to work alone." },
    ],
    sources: [
      { label: "Full multi-society advisory on nutrition with GLP-1 therapy", url: "https://onlinelibrary.wiley.com/doi/full/10.1002/oby.24336" },
      { label: "PROT-AGE protein recommendations for older adults", url: "https://pubmed.ncbi.nlm.nih.gov/23867520/" },
      { label: "High-protein diet and resistance exercise during weight loss RCT", url: "https://pubmed.ncbi.nlm.nih.gov/28166780/" },
    ],
  },
  "two-day-glp-1-strength-plan": {
    quickFacts: [
      { value: "2 days", label: "minimum weekly structure", context: "Two non-consecutive full-body sessions can train the major movement patterns repeatedly without making recovery the whole week." },
      { value: "2–3 sets", label: "per movement", context: "Start with the lower end. Add work only when technique, nutrition and recovery remain stable." },
      { value: "≈3 RIR", label: "starting effort", context: "Finish early sets with roughly three good repetitions still possible instead of training to failure." },
    ],
    sections: [
      {
        heading: "Before week one: choose safe starting versions",
        paragraphs: [
          "The programme should fit current function, not past identity. Choose a squat depth, hinge range and pushing angle that can be repeated without sharp pain, loss of balance or breath-holding that feels uncontrolled.",
          "If you have diabetes treated with insulin or a sulfonylurea, significant cardiovascular disease, recent surgery, pregnancy, recurrent fainting or major joint or neurological symptoms, obtain individualized guidance before using a general plan.",
        ],
      },
      {
        heading: "An eight-week progression map",
        bullets: [
          "Weeks 1–2 — Learn: two sets per exercise, conservative load, three or four repetitions in reserve.",
          "Weeks 3–4 — Accumulate: add repetitions within the listed range while keeping the same stable technique.",
          "Weeks 5–6 — Load: when all sets reach the top of the range, add the smallest practical load and return to the lower end.",
          "Week 7 — Consolidate: hold or reduce volume if fatigue, nausea or soreness is accumulating.",
          "Week 8 — Review: repeat the same submaximal tests and compare load, repetitions, effort and daily function.",
        ],
        paragraphs: ["Progress does not require a heavier weight every week. An extra repetition, better range, steadier balance or lower effort at the same load is still progress."],
      },
      {
        heading: "How to adjust around nausea or low energy",
        paragraphs: ["Do not try to prove discipline on a poorly hydrated day. Preserve the habit while adjusting the dose of exercise."],
        bullets: [
          "Shorten the warm-up and perform one or two main movements instead of cancelling automatically.",
          "Reduce one set from each exercise before reducing load on every exercise.",
          "Choose supported rows, machine presses or chair squats when balance or energy is limited.",
          "Avoid training immediately after a large meal if delayed gastric emptying makes that uncomfortable.",
          "Stop for faintness, chest pain, severe breathlessness, new neurological symptoms or symptoms suggesting hypoglycaemia.",
        ],
      },
      {
        heading: "Where walking and cardio fit",
        paragraphs: [
          "Resistance training is the main muscle-retention signal, but it is not the whole activity plan. Easy walking can support recovery, routine and cardiometabolic health. Moderate aerobic training can be added on separate days or after lifting when tolerated.",
          "Avoid suddenly combining a large calorie deficit, high daily step target, intense intervals and high-volume lifting. Add one stressor at a time so symptoms and recovery remain interpretable.",
        ],
      },
      {
        heading: "The smallest useful training log",
        bullets: [
          "Exercise and variation used.",
          "Load, sets and repetitions.",
          "Repetitions left in reserve or a simple effort score.",
          "Any pain, nausea, dizziness or unusual fatigue.",
          "One sentence on sleep and food or fluid adequacy before the session.",
        ],
        paragraphs: ["The log is not for perfection. It helps distinguish a programming problem from a recovery, nutrition or symptom problem."],
      },
    ],
    faqs: [
      { question: "Is twice a week really enough?", answer: "It is enough to be meaningful, particularly for beginners. More can be useful, but consistency and progressive overload matter more than choosing an ambitious frequency that repeatedly collapses." },
      { question: "Should I train on injection day?", answer: "There is no universal prohibition. Choose the day when symptoms and energy are most predictable, and adjust based on your own pattern without changing medication timing yourself." },
      { question: "Do I need a gym?", answer: "No. Dumbbells, bands, a stable chair and body-weight variations can cover the main patterns. A gym mainly expands loading and substitution options." },
      { question: "How sore should I be?", answer: "Mild soreness can occur, especially early, but it is not the goal. Soreness that disrupts normal movement or the next session usually means progression was too aggressive." },
      { question: "What if the scale stops while strength improves?", answer: "A short plateau is not failure. Weight, waist, adherence, medication context and performance should be reviewed together rather than sacrificing training to force a faster scale change." },
    ],
    pathway: [
      { slug: "how-much-protein-on-glp-1", label: "Fuel the plan", context: "Build protein anchors that fit lower appetite." },
      { slug: "creatine-and-glp-1-medication", label: "Evaluate creatine honestly", context: "Understand when it can support training and what it cannot claim." },
      { slug: "lean-mass-vs-muscle-mass", label: "Track the right outcome", context: "Pair body-composition estimates with strength and function." },
    ],
    sources: [
      { label: "Resistance training effects on strength and function in adults with overweight or obesity", url: "https://pubmed.ncbi.nlm.nih.gov/33069607/" },
      { label: "Resistance-training dose moderators in overweight and obesity", url: "https://pubmed.ncbi.nlm.nih.gov/35977113/" },
    ],
  },
  "ozempic-face-loose-skin-science": {
    quickFacts: [
      { value: "0", label: "validated diagnoses called Ozempic face", context: "It is a media label for appearance change after facial-volume loss, not a formal medical diagnosis." },
      { value: "No proof", label: "of direct collagen poisoning", context: "Current human evidence does not establish a GLP-1-specific toxic effect on skin collagen." },
      { value: "3 levels", label: "in the treatment ladder", context: "Surface quality, non-surgical correction and surgery address different severities; no one option substitutes for the others." },
    ],
    sections: [
      {
        heading: "Face and body changes are related—but not identical",
        paragraphs: [
          "The face can look different after relatively modest fat-compartment changes because cheeks, temples and the area around the mouth depend on volume and structural support. The abdomen, arms, thighs and breasts have much larger skin envelopes and may reflect years of stretching, pregnancy or repeated weight cycling.",
          "Someone can have facial hollowing with little body excess skin, or significant abdominal laxity without a dramatic facial change. The assessment and treatment ladder should match the location and severity.",
        ],
      },
      {
        heading: "Does losing weight more slowly prevent loose skin?",
        paragraphs: [
          "A slower trajectory may make nutritional intake, training and psychological adaptation easier, but there is no reliable trial showing that one specific weekly rate prevents excess skin. Total loss, age, skin quality, genetics, smoking, UV exposure and how long tissue was stretched are major confounders.",
          "The medically appropriate rate should be discussed in the context of health, symptoms and treatment response—not selected from a cosmetic promise.",
        ],
        studyLimit: "Loose-skin research rarely randomizes people to different rates of medication-assisted weight loss, so strong claims about an ideal cosmetic rate are not evidence based.",
      },
      {
        heading: "A realistic treatment ladder",
        bullets: [
          "Foundation: stable nutrition, sun protection, smoking cessation and time to observe the contour after weight stabilizes.",
          "Surface quality: moisturizer and, where appropriate, clinician-guided retinoid use can improve texture but not replace lost volume.",
          "Mild laxity or volume loss: a qualified dermatology, plastic-surgery or medical-aesthetics assessment may discuss devices or injectables, with realistic limits and risks.",
          "Substantial excess skin: surgery is the most definitive option, but it involves scars, recovery, cost and medical eligibility.",
          "Functional problems such as recurrent rashes, infections or impaired movement deserve medical documentation and assessment rather than cosmetic minimization.",
        ],
      },
      {
        heading: "Where strength training helps",
        paragraphs: [
          "Building the shoulders, back, glutes, legs and trunk can improve the contour beneath skin and preserve function during weight loss. It cannot shrink a substantial skin fold or restore lost facial fat.",
          "That distinction protects people from two bad promises: that lifting is useless because it cannot remove skin, or that lifting will make surgery unnecessary in every severe case.",
        ],
      },
      {
        heading: "Hair shedding is a different question",
        paragraphs: [
          "Diffuse shedding after major weight loss may represent telogen effluvium, which can follow physiological stress, rapid change, inadequate intake or illness. It is not the same mechanism as loose skin. Persistent shedding, patchy loss, scalp inflammation or signs of nutritional deficiency deserve clinical evaluation.",
          "Do not respond by taking high-dose biotin automatically. It can interfere with laboratory tests and does not correct every cause of hair loss.",
        ],
      },
    ],
    faqs: [
      { question: "Will loose skin tighten on its own?", answer: "Some retraction can occur, particularly with milder laxity and better baseline skin quality, but substantial excess skin may persist. The final contour is easier to judge after weight has been relatively stable." },
      { question: "Does semaglutide age the face directly?", answer: "Current evidence does not establish direct drug-induced facial ageing. Reduced facial fat volume and skin retraction during weight loss are more plausible explanations." },
      { question: "Will collagen supplements prevent Ozempic face?", answer: "There is no strong evidence that they prevent clinically meaningful facial hollowing or excess skin during GLP-1-assisted weight loss." },
      { question: "Can retinoids tighten loose skin?", answer: "They can improve aspects of surface texture and photoageing but cannot replace lost deep volume or remove a substantial fold. They can also irritate skin and require pregnancy precautions." },
      { question: "When should I consider a specialist?", answer: "Consider assessment when the concern is persistent, functionally troublesome or severe enough that skincare cannot plausibly address it. Choose a qualified professional who explains limits, risks and alternatives." },
    ],
    pathway: [
      { slug: "how-much-protein-on-glp-1", label: "Support nutritional adequacy", context: "Build a lower-volume protein structure without cosmetic overpromising." },
      { slug: "two-day-glp-1-strength-plan", label: "Build the contour beneath", context: "Use strength work for capability and shape, not as a claim to remove skin." },
      { slug: "what-happens-after-stopping-semaglutide", label: "Plan beyond active loss", context: "Understand why maintenance starts before treatment changes." },
    ],
    sources: [
      { label: "Histological skin changes after massive weight loss", url: "https://pubmed.ncbi.nlm.nih.gov/33145720/" },
      { label: "American Academy of Dermatology guidance on GLP-1 skin, hair and nail changes", url: "https://www.aad.org/public/diseases/a-z/glp-1-skin-hair-nails" },
    ],
  },
  "what-happens-after-stopping-semaglutide": {
    quickFacts: [
      { value: "11.6 pp", label: "regained in STEP 1 extension", context: "After a 17.3% mean loss during treatment, the extension subset regained 11.6 percentage points over the following year." },
      { value: "+6.9%", label: "after switch to placebo", context: "In STEP 4, participants switched after a 20-week semaglutide lead-in gained 6.9% from week 20 to 68; continuers lost another 7.9%." },
      { value: "+14.0%", label: "after tirzepatide withdrawal", context: "In SURMOUNT-4, those switched to placebo gained 14.0% from week 36 to 88, while continuers lost another 5.5%." },
    ],
    sections: [
      {
        heading: "Withdrawal trials do not test every real-world strategy",
        paragraphs: [
          "STEP 1 stopped semaglutide and the structured study lifestyle intervention together. STEP 4 and SURMOUNT-4 randomized participants to continued treatment or placebo after lead-in periods. These designs show that removing an effective treatment commonly produces regain; they do not compare every possible nutrition programme, behavioural intervention, dose-reduction pathway or alternative medicine.",
          "That is why the right conclusion is chronic-care planning—not that stopping is impossible or that one branded pathway is mandatory for everyone.",
        ],
      },
      {
        heading: "There is no proven universal taper protocol",
        paragraphs: [
          "A gradual dose reduction is often discussed online, but major withdrawal trials were not designed to identify one taper that prevents regain. Medication reduction, switching and stopping must be individualized by the prescribing clinician around indication, benefit, side effects, pregnancy plans, cost, supply and comorbidities.",
          "Do not improvise dose splitting, extend intervals or use leftover medication on the strength of a general article.",
        ],
        studyLimit: "Evidence on specific taper schedules, maintenance dosing and structured post-cessation programmes is still emerging. Absence of a universal protocol is not evidence that any self-designed protocol is safe.",
      },
      {
        heading: "The eight-week readiness plan",
        bullets: [
          "Clarify why treatment may change and what alternatives the clinician considers.",
          "Establish three or four repeatable protein-forward eating occasions before appetite support changes.",
          "Make two weekly strength sessions and a realistic movement baseline routine rather than aspirational.",
          "Record several weeks of weight, waist, hunger pattern and symptom data.",
          "Agree who to contact, when follow-up happens and what degree of drift should trigger review.",
          "Prepare for cost or supply gaps with navigation and clinician contact details before the final available dose.",
        ],
      },
      {
        heading: "What to monitor after a change",
        paragraphs: [
          "Hunger can return before a large weight change becomes visible. Monitor the process signals as well as the outcome: meal structure, grazing, cravings, sleep, activity, training performance and emotional response.",
          "A single higher weigh-in is not a relapse. Use a trend. But do not wait for substantial regain if appetite is escalating quickly, glucose control is changing or cardiometabolic conditions were part of the original indication.",
        ],
      },
      {
        heading: "A regain response without shame",
        paragraphs: [
          "Treat regain as clinical information. Review what changed: treatment exposure, appetite, food environment, stress, sleep, movement, symptoms and access. The response may involve rebuilding routines, intensifying behavioural support or discussing medical options with the clinician.",
          "Punitive restriction can worsen the cycle by increasing fatigue, reducing training quality and making appetite harder to manage. The objective is early, proportionate adjustment—not proving willpower.",
        ],
      },
    ],
    faqs: [
      { question: "Will everyone regain after stopping semaglutide?", answer: "No, individual trajectories vary. But randomized withdrawal evidence shows regain is common enough that every planned or forced interruption deserves a maintenance strategy and follow-up." },
      { question: "Should semaglutide be tapered?", answer: "There is no established universal taper protocol proven to prevent regain. Any dose reduction or discontinuation plan belongs with the prescribing clinician." },
      { question: "How quickly does hunger return?", answer: "Timing varies with the person, medicine, dose and treatment duration. Monitor appetite and eating-pattern changes early instead of waiting for a specific calendar date." },
      { question: "Can lifestyle alone maintain all the loss?", answer: "Some people maintain more than others, but trials do not support promising that lifestyle will fully replace pharmacologic appetite support. Lifestyle remains valuable for health, function and improving the odds." },
      { question: "What if insurance or supply stops treatment suddenly?", answer: "Contact the prescribing service promptly. Do not substitute products, alter dosing or buy unverified medication independently. Activate a prepared food, training and monitoring plan while clinical options are reviewed." },
    ],
    pathway: [
      { slug: "glp-1-low-appetite-food-plan", label: "Stabilize the food structure", context: "Build routines that can survive a change in appetite support." },
      { slug: "two-day-glp-1-strength-plan", label: "Keep the training anchor", context: "Preserve the weekly capability routine through treatment transitions." },
      { slug: "does-ozempic-cause-muscle-loss", label: "Track outcome quality", context: "Monitor strength and function as well as regained or maintained weight." },
    ],
    sources: [
      { label: "SURMOUNT-4 randomized tirzepatide withdrawal trial", url: "https://pubmed.ncbi.nlm.nih.gov/38078870/" },
      { label: "Cardiometabolic changes by degree of regain after tirzepatide withdrawal", url: "https://pubmed.ncbi.nlm.nih.gov/41284285/" },
    ],
  },
  "creatine-and-glp-1-medication": {
    quickFacts: [
      { value: "3–5 g", label: "common daily amount", context: "Creatine monohydrate is commonly used without a loading phase. A personal medical context can change whether supplementation is appropriate." },
      { value: "+1.14 kg", label: "additional lean mass", context: "A 2024 meta-analysis in adults under 50 found this average with creatine plus resistance training versus training alone; it is not all new muscle protein." },
      { value: "Training", label: "comes first", context: "The evidence case is strongest as an adjunct to progressive resistance work—not as a stand-alone answer to GLP-1 body-composition concerns." },
    ],
    sections: [
      {
        heading: "Why the scale may rise at first",
        paragraphs: [
          "Creatine can increase water stored within muscle. A short wash-in study published in 2025 found an early increase in measured lean mass before the subsequent resistance-training phase, illustrating why a DXA or scale change should not be described as the same amount of new muscle protein.",
          "For someone focused on weight loss, a small early scale increase can be psychologically confusing. Decide in advance whether the goal is the lowest number or better training capacity and body composition.",
        ],
      },
      {
        heading: "Loading, timing and mixing",
        paragraphs: [
          "A loading phase is optional. Daily consistency with creatine monohydrate matters more than taking it in a narrow post-workout window. It can be mixed into a tolerated drink or food; complete dissolution is not required for effectiveness, though gritty texture may reduce adherence.",
          "If the gastrointestinal burden of treatment is already high, adding a large loading dose is rarely the simplest starting approach. Discuss suitability and begin only when fluids and intake are reasonably stable.",
        ],
      },
      {
        heading: "Creatinine tests and kidney context",
        paragraphs: [
          "Creatine can increase serum creatinine because creatinine is a breakdown product, which can complicate interpretation of a creatinine-based estimated kidney filtration result. That does not automatically mean kidney damage, but it does mean the clinician should know what you are taking.",
          "People with known kidney disease, unexplained abnormal kidney tests, pregnancy or complex medical conditions should obtain individualized advice. Persistent vomiting, dehydration or very low urine output is a clinical problem—not a moment to begin creatine.",
        ],
        studyLimit: "Safety data are reassuring in many healthy adults using standard amounts, but supplement trials do not cover every kidney condition, medication combination or dehydration scenario.",
      },
      {
        heading: "How to choose a product",
        bullets: [
          "Choose creatine monohydrate rather than paying for an unproven exotic form.",
          "Prefer independent batch testing or a credible sport-certification programme when contamination matters.",
          "Avoid proprietary blends that hide the amount of creatine.",
          "Check whether added sweeteners, stimulants or large mineral doses worsen tolerability.",
          "Treat purity and accurate dosing as more important than flavour claims.",
        ],
      },
      {
        heading: "A fair twelve-week test",
        paragraphs: [
          "Use creatine only after a repeatable programme exists. Track adherence, loads, repetitions, effort, body weight and symptoms for twelve weeks. Keep the training plan stable enough to interpret whether performance is improving.",
          "If there is no training, no nutritional foundation and no useful outcome being measured, supplementation becomes another ritual without a clear decision attached to it.",
        ],
      },
    ],
    faqs: [
      { question: "Can creatine prevent GLP-1 muscle loss?", answer: "That has not been demonstrated in dedicated randomized GLP-1 trials. Creatine can support resistance-training adaptation, which is a different and more defensible claim." },
      { question: "Will creatine make me gain weight?", answer: "It can increase body weight modestly through water stored in muscle. That is not fat gain, but it still appears on the scale." },
      { question: "Do I need to load creatine?", answer: "No. Loading saturates muscle more quickly, but a consistent maintenance amount can reach saturation more gradually and may be easier to tolerate." },
      { question: "Is creatine safe for kidneys?", answer: "Standard amounts have a strong safety record in many healthy adults, but people with kidney disease, abnormal tests, dehydration or complex conditions need clinician guidance." },
      { question: "When should I take it?", answer: "The exact time is less important than consistency. Choose a time and format that you tolerate and will remember." },
    ],
    pathway: [
      { slug: "two-day-glp-1-strength-plan", label: "Build the programme first", context: "Give creatine a real training stimulus to support." },
      { slug: "lean-mass-vs-muscle-mass", label: "Interpret the lean-mass change", context: "Understand how water and glycogen affect body-composition estimates." },
      { slug: "how-much-protein-on-glp-1", label: "Cover the nutritional base", context: "Use food structure before expecting a supplement to solve intake." },
    ],
    sources: [
      { label: "2024 creatine plus resistance-training body-composition meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/39074168/" },
      { label: "Creatine wash-in and lean-mass measurement study", url: "https://pubmed.ncbi.nlm.nih.gov/40292479/" },
      { label: "Creatine with resistance training across age and exercise subgroups", url: "https://pubmed.ncbi.nlm.nih.gov/35986981/" },
    ],
  },
  "glp-1-low-appetite-food-plan": {
    quickFacts: [
      { value: "3 levels", label: "of appetite difficulty", context: "Manageable reduction, inadequate intake and medical red flags require different responses—not one generic meal plan." },
      { value: "Small + often", label: "the practical pattern", context: "Lower-volume protein-forward eating occasions can be easier than forcing a conventional large meal." },
      { value: "Clinical", label: "when fluids fail", context: "Inability to keep fluids down, very low urine output, fainting or severe persistent pain needs medical assessment." },
    ],
    sections: [
      {
        heading: "First classify the problem",
        bullets: [
          "Level 1 — appetite is lower, but fluids, several eating occasions and normal daily function remain possible.",
          "Level 2 — intake is repeatedly inadequate, training and daily energy are deteriorating, or nausea and constipation are dominating the week.",
          "Level 3 — fluids cannot be maintained, urine output is very low, fainting occurs, pain is severe or persistent, or weakness is rapidly worsening.",
        ],
        paragraphs: ["Level 1 may respond to food-format changes. Level 2 deserves prompt contact with the prescribing team. Level 3 is not an optimization problem and may require urgent assessment."],
      },
      {
        heading: "The low-volume meal matrix",
        paragraphs: ["Choose one item from each useful column rather than trying to finish a large mixed plate. Portion size should follow tolerance and personal medical guidance."],
        bullets: [
          "Protein: Greek yogurt, cottage cheese, egg, fish, poultry, tofu, soy yogurt or a complete-protein drink.",
          "Gentle energy: toast, oats, rice, potato, crackers, banana or another tolerated carbohydrate.",
          "Micronutrient add-on: soft fruit, cooked vegetables, soup or a small smoothie rather than an enormous raw salad.",
          "Fluid: water, oral rehydration as clinically appropriate, broth or another low-burden drink spread through the day.",
          "Flavour and texture: cool foods, bland preparations or less aromatic options when smell and richness worsen nausea.",
        ],
      },
      {
        heading: "A sample difficult-appetite day",
        bullets: [
          "Morning: fluids in small amounts, then yogurt or an egg with toast when tolerated.",
          "Midday: soup with a protein component, or a small rice-and-fish or tofu bowl.",
          "Afternoon: cottage cheese, soy yogurt or a complete-protein drink if a food gap remains.",
          "Evening: a small serving of lean protein with a tolerated starch and cooked vegetable.",
          "Across the day: fluids distributed rather than consumed in one uncomfortable bolus.",
        ],
        paragraphs: ["This is an example of structure, not a treatment diet. Diabetes, kidney disease, pregnancy, allergies and other conditions can materially change the plan."],
      },
      {
        heading: "Constipation needs more than the word fibre",
        paragraphs: [
          "Constipation can reflect lower food volume, lower fluid intake, reduced movement and medication effects. Fibre helps some people, but a sudden large supplement dose without enough fluid can increase discomfort.",
          "Review fluids, gradual fibre, movement and the full medication list with the clinical team. Severe pain, vomiting, marked distension or inability to pass stool or gas requires timely assessment.",
        ],
      },
      {
        heading: "Diabetes medication changes the safety conversation",
        paragraphs: [
          "GLP-1 medicines used with insulin or a sulfonylurea can increase hypoglycaemia risk compared with GLP-1 treatment alone. If intake falls sharply, the plan must include glucose-monitoring and medication guidance from the treating team.",
          "Do not treat shaking, confusion, sweating or recurrent low readings as a meal-planning inconvenience. Follow the person’s clinical hypoglycaemia plan and seek appropriate care.",
        ],
      },
      {
        heading: "Bring useful information to the prescriber",
        bullets: [
          "When symptoms began and how they relate to treatment timing or escalation.",
          "How often vomiting, diarrhoea or constipation occurs.",
          "What fluids and food have stayed down in the last 24–48 hours.",
          "Urine output, dizziness, fainting, abdominal pain and glucose readings where relevant.",
          "Every prescription, over-the-counter medicine and supplement being used.",
        ],
        paragraphs: ["Specific information helps the clinician distinguish an expected adverse effect from dehydration, hypoglycaemia, gallbladder disease, pancreatitis or another condition."],
      },
    ],
    faqs: [
      { question: "Is it normal to have no appetite on a GLP-1?", answer: "Lower appetite is expected, but repeatedly inadequate intake, dehydration, worsening weakness or inability to function should not be normalized. Contact the prescribing team." },
      { question: "Should I force myself to finish meals?", answer: "Usually the better strategy is smaller, nutrient-dense eating occasions stopped at comfortable fullness. Forcing a large volume can worsen symptoms." },
      { question: "Can I live on protein shakes temporarily?", answer: "A complete-protein drink can close a gap, but an all-liquid or nutritionally narrow pattern may miss fibre, micronutrients and adequate energy. Persistent inability to tolerate food needs clinical review." },
      { question: "How much water should I drink?", answer: "Needs vary with body size, climate, kidney and heart conditions, vomiting and diarrhoea. Spread fluids across the day and obtain individualized guidance when medical fluid restrictions or dehydration risks exist." },
      { question: "When is abdominal pain urgent?", answer: "Severe or persistent pain, especially with vomiting, fever, a rigid or distended abdomen, fainting or pain radiating to the back, requires prompt medical assessment." },
    ],
    pathway: [
      { slug: "how-much-protein-on-glp-1", label: "Rebuild the protein anchors", context: "Move from a tolerable floor toward an individualized target." },
      { slug: "two-day-glp-1-strength-plan", label: "Adjust training to intake", context: "Keep the habit without overloading a poorly fuelled day." },
      { slug: "what-happens-after-stopping-semaglutide", label: "Prepare for treatment transitions", context: "Keep the support system intact if medication access or phase changes." },
    ],
    sources: [
      { label: "Full multi-society nutrition and lifestyle advisory for GLP-1 therapy", url: "https://onlinelibrary.wiley.com/doi/full/10.1002/oby.24336" },
      { label: "Current FDA Wegovy prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s021lbl.pdf" },
      { label: "Current FDA Zepbound prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s020lbl.pdf" },
    ],
  },
};

export function getBlogPost(slug: string) {
  const post = blogPosts.find((candidate) => candidate.slug === slug);
  const enhancement = articleEnhancements[slug];
  const seo = articleSeoBySlug[slug];
  if (!post || !enhancement || !seo) return undefined;

  const sources = Array.from(
    new Map([...post.sources, ...enhancement.sources].map((source) => [source.url, source])).values(),
  );
  const originalConclusion = post.sections.at(-1);
  const originalBody = post.sections.slice(0, -1);

  return {
    ...post,
    sections: [
      ...originalBody,
      ...enhancement.sections,
      ...(originalConclusion ? [originalConclusion] : []),
    ],
    sources,
    quickFacts: enhancement.quickFacts,
    faqs: enhancement.faqs,
    pathway: enhancement.pathway,
    seo,
  };
}

export function postsByCategory(category: BlogCategory) {
  return blogPosts.filter((post) => post.category === category);
}
