export type GuideSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type Guide = {
  slug: string
  title: string
  eyebrow: string
  dek: string
  updatedLabel: string
  complianceReviewed: string
  sections: GuideSection[]
  closing: string
}

export const guides: Guide[] = [
  {
    slug: 'cash-pay-glp-1-care',
    title: 'Cash-pay GLP-1 care guide',
    eyebrow: 'Editorial guide',
    dek: 'What self-pay metabolic care usually includes, how clinician review works, and which questions to ask before you start.',
    updatedLabel: 'Reviewed for compliance language · Educational use only',
    complianceReviewed:
      'Language reviewed to avoid efficacy claims, guarantee language, and unfinished-drug marketing. Disclosures for clinician evaluation and compounding are required on this page.',
    sections: [
      {
        heading: 'What “cash-pay” means in telehealth',
        paragraphs: [
          'Cash-pay (also called self-pay) means you pay the clinic or membership directly rather than submitting a claim to insurance for the visit or medication. It does not mean care is unsupervised. In a clinician-guided model, a licensed provider still reviews your intake, decides whether treatment is appropriate, and documents that decision.',
          'Membership pricing often bundles clinical review, ongoing messaging, and—when prescribed—pharmacy fulfillment into one transparent monthly amount. Exact inclusions vary by program; always confirm what is covered before you enroll.',
        ],
      },
      {
        heading: 'How clinician-guided GLP-1 care typically works',
        paragraphs: [
          'GLP-1 receptor agonists (including products that contain semaglutide or tirzepatide ingredients, when clinically appropriate) are prescription therapies. Online programs that offer them should start with a structured health intake—not a one-click cart checkout.',
        ],
        bullets: [
          'You share goals, medical history, current medications, and relevant labs when requested.',
          'A U.S.-licensed clinician reviews eligibility, contraindications, and alternatives.',
          'If treatment is appropriate, the clinician may prescribe a protocol and arrange fulfillment through a pharmacy partner.',
          'Follow-up covers tolerance, dose adjustments when indicated, and whether to continue, pause, or stop.',
        ],
      },
      {
        heading: 'What cash-pay often covers—and what it may not',
        paragraphs: [
          'Transparent programs list what is included in the membership (for example clinical review and medication when prescribed) and what is separate (lab work, primary-care visits, or brand-name retail pharmacy fills). Ask for a plain-language breakdown before you pay.',
        ],
        bullets: [
          'Included: clinician evaluation and messaging during active membership, when the program says so.',
          'Often included when prescribed: medication shipped from a partner pharmacy.',
          'Often separate: outside lab orders, in-person specialty care, or brand products filled at a retail pharmacy.',
          'Never assumed: insurance reimbursement, prior authorization, or a guaranteed prescription.',
        ],
      },
      {
        heading: 'Compounded vs. commercially available products',
        paragraphs: [
          'Some telehealth pathways use compounded formulations when a clinician and pharmacy determine that approach is appropriate for a patient. Compounded medications are prepared by a pharmacy for an individual patient and are not FDA-approved as finished drug products. Your clinician should explain risks, benefits, alternatives, and whether a commercially available option is suitable for you.',
          'Marketing that implies compounded products are identical to brand-name FDA-approved drugs, or that overstates results, is a red flag. Prefer programs that use measured, disclosure-first language.',
        ],
      },
      {
        heading: 'Safety and who may not be a candidate',
        paragraphs: [
          'GLP-1 therapies are not appropriate for everyone. Personal history—such as certain thyroid conditions, pancreatitis history, pregnancy plans, or interacting medications—can change eligibility. Only a licensed clinician who has reviewed your information can decide.',
          'If you develop severe abdominal pain, signs of an allergic reaction, or other urgent symptoms while on therapy, seek emergency care and contact your prescribing clinician. This guide cannot replace that judgment.',
        ],
      },
      {
        heading: 'Questions worth asking before you enroll',
        paragraphs: [
          'A careful program should answer these without pressure. If answers are vague, keep looking.',
        ],
        bullets: [
          'Which states are the clinicians licensed in, and how is my visit documented?',
          'Which pharmacy fulfills prescriptions, and how are compounded products disclosed?',
          'What does the monthly price include if I am not prescribed medication?',
          'How are dose changes and side-effect follow-up handled?',
          'How do I cancel, pause, or transfer records if I leave the program?',
        ],
      },
    ],
    closing:
      'Cash-pay GLP-1 care can be a clear path when insurance coverage is limited—but clarity, clinician oversight, and honest compounding disclosures matter more than a low sticker price. Start with an assessment only when you are ready for a real clinical review.',
  },
  {
    slug: 'how-to-assess-an-online-provider',
    title: 'How to assess an online provider',
    eyebrow: 'Editorial guide',
    dek: 'A practical checklist for evaluating telehealth clinics: licensing, clinical standards, pharmacy partners, privacy, and transparency.',
    updatedLabel: 'Reviewed for compliance language · Educational use only',
    complianceReviewed:
      'Language reviewed to emphasize verification steps and disclosures without guaranteeing outcomes, superiority claims, or prescribing decisions.',
    sections: [
      {
        heading: 'Start with licensure and accountability',
        paragraphs: [
          'Legitimate online care is delivered by clinicians licensed where you are located (or otherwise permitted under applicable telehealth rules). Ask who will review your case, what credentials they hold, and how the visit is recorded. A brand name on a website is not a license.',
          'Prefer programs operated by a clearly identified legal entity, with a working support channel and a path to request your records. Vague “medical team” language without accountability is a caution signal.',
        ],
      },
      {
        heading: 'Look for a real clinical evaluation',
        paragraphs: [
          'An appropriate telehealth visit collects enough history to decide whether treatment is indicated—and when it is not. Auto-approvals, questionnaire-only checkouts with no clinician touchpoint, or pressure to select a drug before intake review are inconsistent with careful practice.',
        ],
        bullets: [
          'Intake covers history, medications, allergies, and relevant conditions.',
          'A licensed clinician reviews and can decline or recommend alternatives.',
          'You can ask questions and receive follow-up after a prescription decision.',
          'Marketing does not promise results, weight targets, or that you will receive a specific drug.',
        ],
      },
      {
        heading: 'Pharmacy fulfillment and product transparency',
        paragraphs: [
          'When medication is part of care, ask which pharmacy ships it and how product quality is overseen. For compounded therapies, disclosures should state that the finished compounded product may not be FDA-approved and that your clinician will discuss risks and alternatives.',
          'Discreet packaging is common; secrecy about the pharmacy partner is not. You should know who is dispensing what you receive.',
        ],
      },
      {
        heading: 'Pricing, memberships, and cancellation',
        paragraphs: [
          'Clear programs explain cash-pay pricing up front: what happens if you are not a candidate, what renews automatically, and how to cancel. Hidden fees, hard-to-find cancellation paths, or charges framed as “guaranteed medication” deserve scrutiny.',
          'Transparent memberships separate clinical care from product hype. You are paying for evaluation and, when appropriate, a prescribed protocol—not for a promised outcome.',
        ],
      },
      {
        heading: 'Privacy and data handling',
        paragraphs: [
          'Health information deserves careful handling. Ask how your intake data is stored, who can access it, and how messaging with clinicians is secured. Be wary of clinics that treat a medical intake like a marketing lead form with aggressive follow-up unrelated to care.',
        ],
      },
      {
        heading: 'Red flags checklist',
        paragraphs: [
          'Any single issue may need context; several together suggest walking away.',
        ],
        bullets: [
          'No named clinical model, no licensing explanation, or no way to contact support.',
          'Guaranteed prescriptions, dramatic before/after claims, or “research chemical” framing.',
          'No compounding disclosure when compounded products are offered.',
          'Pressure to pay before any clinician review.',
          'Unclear pharmacy partner or inability to explain what you will receive.',
        ],
      },
      {
        heading: 'A calm way to decide',
        paragraphs: [
          'Assess online providers the way you would assess any clinic: credentials, clinical process, fulfillment transparency, and whether you feel informed enough to consent. Take notes during intake. If something feels rushed or opaque, pause.',
          'Educational checklists like this one cannot certify a specific clinic. They help you ask better questions so a licensed professional—and your own judgment—can do the rest.',
        ],
      },
    ],
    closing:
      'Strong telehealth programs make licensing, clinical review, pharmacy partners, and pricing easy to understand. Use this checklist to compare options, then complete an assessment only with a provider you trust to say no when treatment is not appropriate.',
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
