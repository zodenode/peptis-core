import type { Metadata } from "next";
import Link from "next/link";
import {
  ContinuityHeroCluster,
  SystemConstellation,
  TrialBars,
} from "@/components/cinematic-experience";
import { ContinuityCinema } from "@/components/continuity-cinema";
import { ContinuityForm } from "@/components/continuity-form";
import { ProblemSolutionTheatre } from "@/components/problem-solution-theatre";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { problemSolutionPairs } from "@/lib/peptis-content";

export const metadata: Metadata = {
  title: "GLP-1 Continuity Care: Support Through Every Phase",
  description: "Structured GLP-1 continuity support for nutrition, strength, tolerability, treatment transitions, monitoring and long-term weight maintenance.",
  alternates: { canonical: "/glp-continuity" },
  openGraph: {
    title: "Peptis GLP-1 Continuity Care",
    description: "Start well. Stay supported. Transition with a plan.",
    type: "website",
    url: "/glp-continuity",
    images: ["/peptis-glp-continuity-hero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptis GLP-1 Continuity Care",
    description: "Start well. Stay supported. Transition with a plan.",
    images: ["/peptis-glp-continuity-hero.webp"],
  },
};

const continuityPhases = [
  { number: "01", phase: "Considering or preparing", need: "Understand the care model, set outcome goals, review risks and build baseline nutrition and strength measures.", action: "Assessment + preparation plan" },
  { number: "02", phase: "Starting or escalating", need: "Make lower appetite and GI changes practical without self-managing prescription decisions.", action: "Tolerability-aware routine + clinician escalation" },
  { number: "03", phase: "Stable treatment", need: "Improve the quality of the outcome: strength, protein adequacy, function, routine and measurable progress.", action: "Body-recomposition operating system" },
  { number: "04", phase: "Switching or interrupted", need: "Prepare for supply, insurance, affordability or formulation changes without losing the entire support structure.", action: "Bridge plan + navigation" },
  { number: "05", phase: "Reducing or stopping", need: "Make medication changes with the prescriber and begin maintenance before regain or panic-driven restriction.", action: "Maintenance readiness + follow-up cadence" },
] as const;

const programmeModules = [
  { number: "01", title: "Assess", body: "Treatment phase, weight trajectory, food pattern, activity, GI tolerance, function, red flags and the clinician already responsible for care." },
  { number: "02", title: "Build", body: "A food-first structure, individualized protein discussion, fluids, fibre and a low-volume complete-protein option only when useful." },
  { number: "03", title: "Train", body: "Two or three progressive full-body sessions with home and gym substitutions, effort targets and a visible progression rule." },
  { number: "04", title: "Recover", body: "Sleep, hydration, symptom-aware meal sizing, easy movement and a clear line between programme support and clinical escalation." },
  { number: "05", title: "Measure", body: "Weight trend, waist, strength, chair rise or grip, protein consistency, symptoms and maintenance readiness—not one black-box score." },
] as const;

export default function GlpContinuityPage() {
  return (
    <main className="marketing-page continuity-page">
      <SiteHeader current="continuity" />

      <section className="continuity-hero" aria-labelledby="continuity-title">
        <div className="continuity-hero-image" data-parallax style={{ backgroundImage: "url(/peptis-glp-continuity-hero.webp)" }} aria-hidden="true" />
        <div className="continuity-hero-copy">
          <div className="hero-label-row"><p className="eyebrow">PEPTIS HEALTH · GLP-1 CONTINUITY CARE</p><span><i className="hero-live-dot" />FOUNDING PROGRAMME</span></div>
          <h1 id="continuity-title">The medication may change. Your support system shouldn&apos;t.</h1>
          <p>GLP-1 treatment can be powerful. The missing layer is often everything around it: practical nutrition, strength, tolerability support, follow-up and a maintenance plan that begins before something changes.</p>
          <div className="continuity-hero-actions"><a className="primary-button" data-pressable href="#founding-list">Join the founding programme <span>↗</span></a><a href="#how-it-works">See how continuity works <span>↓</span></a></div>
          <div className="continuity-boundary"><strong>Medication decisions stay clinical.</strong><span>Peptis does not promise eligibility, prescribe through this page or tell people to adjust treatment themselves.</span></div>
        </div>
        <ContinuityHeroCluster />
      </section>

      <section className="continuity-proof-strip collective-grid" data-reveal aria-label="Why continuity matters">
        <article><span>STEP 1 EXTENSION</span><strong>≈ ⅔</strong><p>of prior weight loss was regained during the year after semaglutide and the study lifestyle programme stopped.</p></article>
        <article><span>SURMOUNT-1 DXA</span><strong data-count-to="75" data-count-suffix=" / 25">75 / 25</strong><p>approximately 75% of lost weight was fat mass and 25% lean mass in the body-composition substudy.</p></article>
        <article><span>THE PEPTIS SYSTEM</span><strong data-count-to="5" data-count-suffix=" layers">5 layers</strong><p>assess, build, train, recover and measure—across the treatment journey.</p></article>
      </section>

      <section className="continuity-intro reveal-on-scroll">
        <div>
          <p className="eyebrow">THE CATEGORY PEPTIS IS BUILDING</p>
          <h2>The prescription is an event. Continuity is the system around it.</h2>
        </div>
        <div>
          <p>People do not move through treatment in a straight line. They start, escalate, settle, miss doses, face supply or insurance disruption, switch, pause, restart or consider stopping.</p>
          <p>A durable service has to support the phase—not merely sell access to a molecule. That means medication-agnostic education, a practical programme, consented tracking and clinician escalation where appropriate.</p>
        </div>
      </section>

      <section className="benefit-balance reveal-on-scroll" aria-labelledby="benefit-title">
        <div className="benefit-heading" data-reveal>
          <p className="eyebrow">FIRST, THE BENEFITS ARE REAL</p>
          <h2 id="benefit-title">Peptis does not need to frighten people to make continuity valuable.</h2>
          <p>Prescription trials have reported clinically meaningful weight loss and important outcomes in defined populations. Those results belong to the medicines and clinical care—not to a Peptis supplement or programme.</p>
        </div>
        <div className="benefit-stat-grid collective-grid" data-reveal>
          <article><strong data-count-to="14.9" data-count-decimals="1" data-count-suffix="%">14.9%</strong><span>mean weight loss</span><p>Semaglutide 2.4 mg plus lifestyle at 68 weeks in STEP 1, versus 2.4% with placebo, among adults without diabetes.</p><TrialBars treatment={14.9} comparator={2.4} treatmentLabel="Semaglutide" comparatorLabel="Placebo" /></article>
          <article><strong data-count-to="20.9" data-count-decimals="1" data-count-suffix="%">20.9%</strong><span>mean weight loss</span><p>Tirzepatide 15 mg at 72 weeks in SURMOUNT-1, versus 3.1% with placebo. Trial average; not an individual guarantee.</p><TrialBars treatment={20.9} comparator={3.1} treatmentLabel="Tirzepatide" comparatorLabel="Placebo" /></article>
          <article><strong data-count-to="20" data-count-suffix="%">20%</strong><span>relative MACE reduction</span><p>In SELECT participants with established cardiovascular disease and no diabetes: 6.5% versus 8.0% over about 40 months.</p><TrialBars treatment={6.5} comparator={8} treatmentLabel="Semaglutide" comparatorLabel="Placebo" inverted /></article>
        </div>
        <p className="stat-guardrail">Population, treatment, comparator and time point matter. Peptis supports the quality and durability of the journey; it does not borrow medication efficacy.</p>
      </section>

      <section className="phase-section" id="how-it-works" aria-labelledby="phase-title">
        <div className="section-heading compact reveal-on-scroll">
          <p className="eyebrow">ONE CATEGORY · FIVE TREATMENT PHASES</p>
          <h2 id="phase-title">Continuity means the support survives the transition.</h2>
          <p>The experience changes with the phase, while the boundaries stay clear: prescription management belongs to the licensed clinical team.</p>
        </div>
        <ContinuityCinema phases={continuityPhases} />
      </section>

      <section className="continuity-zigzag">
        <article className="continuity-feature reveal-on-scroll">
          <div className="feature-image" data-parallax style={{ backgroundImage: "url(/peptis-nutrition-ritual.webp)" }} role="img" aria-label="A clear drink and small protein-forward breakfast" />
          <div className="feature-copy"><span>LOWER APPETITE · HIGHER NUTRITIONAL INTENT</span><h2>Make a smaller amount of food work harder.</h2><p>Controlled studies show semaglutide can materially reduce ad-libitum energy intake. That is part of how treatment works—and why protein, fluids, fibre and micronutrient density can become less automatic.</p><ul><li>Small, protein-forward eating occasions</li><li>Food first; complete protein to close a real gap</li><li>Hydration and gradual fibre</li><li>Persistent symptoms routed to clinical care</li></ul><Link href="/blog/how-much-protein-on-glp-1">Read the protein guide <b>→</b></Link></div>
        </article>
        <article className="continuity-feature reverse reveal-on-scroll">
          <div className="feature-image" data-parallax style={{ backgroundImage: "url(/peptis-strength-scene.webp)" }} role="img" aria-label="An adult completing a controlled strength exercise" />
          <div className="feature-copy"><span>WEIGHT LOSS · WITHOUT SCALE-ONLY THINKING</span><h2>Protect capability, not just a scan number.</h2><p>Lean mass can fall during substantial weight loss, but lean mass is not synonymous with muscle and function cannot be inferred from DXA alone. Peptis puts training performance and daily capability into view.</p><ul><li>Two or three progressive full-body sessions</li><li>Home, dumbbell and gym substitutions</li><li>Load, repetition and effort tracking</li><li>Chair rise, grip or another repeatable function measure</li></ul><Link href="/blog/does-ozempic-cause-muscle-loss">See what the trials measured <b>→</b></Link></div>
        </article>
        <article className="continuity-feature reveal-on-scroll">
          <div className="feature-image" data-parallax style={{ backgroundImage: "url(/peptis-skin-transition.webp)" }} role="img" aria-label="An adult calmly caring for skin in a mirror" />
          <div className="feature-copy"><span>APPEARANCE TRANSITION · WITHOUT FALSE PROMISES</span><h2>Support skin health. Tell the truth about excess skin.</h2><p>Large or rapid volume change can reveal facial hollowing and body laxity. Age, total loss, skin quality, genetics, smoking and sun exposure all matter. There is no established supplement that removes significant excess skin.</p><ul><li>Expectation-setting and time at stable weight</li><li>Nutrition, sun protection and smoking cessation</li><li>Strength to build the contour beneath</li><li>Dermatology or plastic-surgery referral when appropriate</li></ul><Link href="/blog/ozempic-face-loose-skin-science">Read the skin evidence <b>→</b></Link></div>
        </article>
      </section>

      <section className="problem-solution-section" aria-labelledby="problem-title">
        <div className="section-heading compact reveal-on-scroll">
          <p className="eyebrow">THE PROBLEM / SOLUTION ARCHITECTURE</p>
          <h2 id="problem-title">Every high-intent concern needs an honest next action.</h2>
          <p>The programme does not turn every concern into a supplement. It identifies the layer Peptis can support and the point where licensed care belongs.</p>
        </div>
        <ProblemSolutionTheatre mode="continuity" pairs={problemSolutionPairs} />
      </section>

      <section className="programme-system reveal-on-scroll" aria-labelledby="programme-title">
        <div className="programme-system-heading" data-reveal>
          <p className="eyebrow">THE MINIMUM EFFECTIVE SYSTEM</p>
          <h2 id="programme-title">Five layers, one repeatable operating rhythm.</h2>
          <p>Supplements may make the system easier. The service—assessment, plan, accountability, measurement and escalation—is the differentiated product.</p>
        </div>
        <SystemConstellation />
        <div className="programme-module-grid collective-grid" data-reveal>
          {programmeModules.map((module) => <article key={module.number} data-reveal><span>{module.number}</span><h3>{module.title}</h3><p>{module.body}</p></article>)}
        </div>
      </section>

      <section className="care-boundary reveal-on-scroll" aria-labelledby="boundary-title">
        <div>
          <p className="eyebrow">A FORMAL CARE BOUNDARY</p>
          <h2 id="boundary-title">What Peptis can own—and what must remain clinical.</h2>
        </div>
        <div className="boundary-columns collective-grid" data-reveal>
          <article><span>PEPTIS PROGRAMME</span><ul><li>Education and phase-based planning</li><li>Food structure and protein-goal support</li><li>Training programme and progress tracking</li><li>General symptom-aware routines</li><li>Maintenance-readiness checkpoints</li><li>Referral and escalation prompts</li></ul></article>
          <article className="clinical-column"><span>LICENSED CLINICAL PATHWAY</span><ul><li>Diagnosis and eligibility assessment</li><li>Prescription choice and dosing</li><li>Medication switching, reduction or discontinuation</li><li>Lab interpretation and contraindications</li><li>Management of adverse events</li><li>Urgent and emergency medical decisions</li></ul></article>
        </div>
      </section>

      <section className="continuity-offer reveal-on-scroll" aria-labelledby="offer-title">
        <div className="offer-copy">
          <p className="eyebrow">THE FOUNDING PROGRAMME</p>
          <h2 id="offer-title">Build the support layer before selling medication access.</h2>
          <p>The first Peptis Continuity cohort is designed to validate adherence, usefulness and the transition journey. The public offer begins as education and programme support; any medication service should launch only through a separately operated, appropriately licensed clinical pathway.</p>
          <div className="offer-includes"><span>PHASE-BASED INTAKE</span><span>12-WEEK STRENGTH PLAN</span><span>NUTRITION RHYTHM</span><span>WEEKLY CHECK-IN</span><span>MAINTENANCE SCORECARD</span><span>ESCALATION RULES</span></div>
        </div>
        <div id="founding-list"><ContinuityForm /></div>
      </section>

      <section className="continuity-faq reveal-on-scroll" aria-labelledby="continuity-faq-title">
        <div className="section-heading compact"><p className="eyebrow">CLEAR BEFORE CLEVER</p><h2 id="continuity-faq-title">Questions a legitimate continuity programme should answer.</h2></div>
        <div className="faq-list">
          <details open><summary>Does Peptis prescribe GLP-1 medication today?</summary><p>This page is launching the Peptis programme and founding list, not claiming that a prescription service is already live. Any future clinical pathway must use appropriately licensed clinicians, compliant privacy controls and a clear pharmacy relationship.</p></details>
          <details><summary>Is medication guaranteed?</summary><p>No. A prescription is never guaranteed. Eligibility, treatment choice, dose and ongoing monitoring belong to an independent licensed clinician.</p></details>
          <details><summary>Is continuity the same as stopping?</summary><p>No. Continuity covers preparation, initiation, escalation, stable treatment, switching, interruptions and clinician-led reduction or discontinuation. The point is to keep the support system intact when the treatment phase changes.</p></details>
          <details><summary>Can Peptis prevent muscle loss, loose skin or regain?</summary><p>No guarantee is scientifically or legally defensible. Peptis can help people practise evidence-backed behaviours—adequate nutrition, resistance training, monitoring and maintenance planning—and be honest about the limits.</p></details>
          <details><summary>What happens if symptoms are severe?</summary><p>Severe or persistent abdominal pain, inability to keep fluids down, fainting, very low urine output, recurrent hypoglycaemia, allergic symptoms or rapidly worsening weakness require prompt medical assessment, not a programme or supplement response.</p></details>
        </div>
      </section>

      <section className="continuity-sources reveal-on-scroll" aria-label="Key clinical sources">
        <p className="card-kicker">KEY SOURCES</p>
        <ol>
          <li><a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" target="_blank" rel="noreferrer">STEP 1: semaglutide 2.4 mg in adults with overweight or obesity.</a></li>
          <li><a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" target="_blank" rel="noreferrer">SURMOUNT-1: tirzepatide for obesity treatment.</a></li>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/35441470/" target="_blank" rel="noreferrer">STEP 1 extension: weight regain after withdrawal.</a></li>
          <li><a href="https://dom-pubs.onlinelibrary.wiley.com/doi/10.1111/dom.16275" target="_blank" rel="noreferrer">SURMOUNT-1 DXA body-composition substudy.</a></li>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/40450457/" target="_blank" rel="noreferrer">Multi-society nutritional priorities for GLP-1 therapy.</a></li>
          <li><a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2307563" target="_blank" rel="noreferrer">SELECT cardiovascular outcomes trial.</a></li>
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
