/**
 * Curated Supliful private-label stock for Peptis GLP continuity support.
 * Source catalog: https://supliful.com/catalog (191 in-stock SKUs as of scrape).
 * Dietary supplements are not medications and do not treat, prevent, or reverse
 * GLP-1 medication side effects. Use only for wellness / nutrition support framing.
 */

export type SuplifulItem = {
  sku: string
  name: string
  slug: string
  url: string
  form: string
  why: string
  pickPriority: 'core' | 'secondary' | 'optional'
}

export type SuplifulStockList = {
  id: string
  title: string
  glpProblem: string
  intendedUse: string
  complianceNote: string
  items: SuplifulItem[]
}

const u = (slug: string) => `https://supliful.com/catalog/${slug}`

export const suplifulStockLists: SuplifulStockList[] = [
  {
    id: 'glp-digestive-comfort',
    title: 'Digestive comfort support',
    glpProblem: 'Nausea, early fullness, irregular digestion, and lower food volume during GLP-1 therapy',
    intendedUse: 'Gentle digestive and gut-support formulas for low-appetite routines',
    complianceNote:
      'Educational wellness support only. Not a treatment for medication side effects. Escalate severe or persistent GI symptoms to the prescribing clinician.',
    items: [
      {
        sku: 'JTP32GLP1',
        name: 'GLP-1 Support',
        slug: 'glp-1-support-capsules',
        url: u('glp-1-support-capsules'),
        form: 'Capsules',
        why: 'Magnesium, probiotics, digestive enzymes, ginger and peppermint blend positioned for dietary routine support during appetite change.',
        pickPriority: 'core',
      },
      {
        sku: 'JTP4GUTH',
        name: 'Gut Health',
        slug: 'gut-health-capsules',
        url: u('gut-health-capsules'),
        form: 'Capsules',
        why: 'Prebiotic fiber, probiotic and digestive enzyme stack for everyday gut support.',
        pickPriority: 'core',
      },
      {
        sku: 'VOX4DIGE',
        name: 'Digestive Enzyme Pro Blend',
        slug: 'digestive-enzyme-pro-blend-capsules',
        url: u('digestive-enzyme-pro-blend-capsules'),
        form: 'Capsules',
        why: 'Enzyme support when meals are smaller and nutrient density matters more.',
        pickPriority: 'core',
      },
      {
        sku: 'VOX4PROB',
        name: 'Probiotic 40 Billion with Prebiotics',
        slug: 'probiotic-40-billion-prebiotics-capsules',
        url: u('probiotic-40-billion-prebiotics-capsules'),
        form: 'Capsules',
        why: 'Higher-CFU probiotic with prebiotics for members who prefer a capsule format.',
        pickPriority: 'secondary',
      },
      {
        sku: 'JTP4PROB',
        name: 'Probiotic 20 Billion',
        slug: 'probiotic-20-billion-cfu-capsules',
        url: u('probiotic-20-billion-cfu-capsules'),
        form: 'Capsules',
        why: 'Simpler probiotic option for everyday routines.',
        pickPriority: 'secondary',
      },
      {
        sku: 'AAV9PROB',
        name: 'Probiotic + Metabolism Strips',
        slug: 'probiotic-metabolism-strips',
        url: u('probiotic-metabolism-strips'),
        form: 'Strips',
        why: 'No-water strip format when capsules feel hard with nausea or low fluids.',
        pickPriority: 'secondary',
      },
      {
        sku: 'AAV9DGUT',
        name: 'Digestive + Gut Health Strips',
        slug: 'digestive-gut-health-strips',
        url: u('digestive-gut-health-strips'),
        form: 'Strips',
        why: 'Portable strip format for travel and low-appetite days.',
        pickPriority: 'optional',
      },
      {
        sku: 'NRT5COLO',
        name: 'Colon Gentle Cleanse',
        slug: 'colon-gentle-cleanse-sachets',
        url: u('colon-gentle-cleanse-sachets'),
        form: 'Sachets',
        why: 'Only as an optional fiber/cleanse-style SKU; avoid aggressive “detox” marketing claims.',
        pickPriority: 'optional',
      },
      {
        sku: 'JTP32OXBI',
        name: 'Ox Bile Complex',
        slug: 'ox-bile-complex-capsules',
        url: u('ox-bile-complex-capsules'),
        form: 'Capsules',
        why: 'Specialty digestive support; keep clinician-aware framing and no side-effect cure claims.',
        pickPriority: 'optional',
      },
    ],
  },
  {
    id: 'protein-lean-mass',
    title: 'Protein and lean-mass nutrition',
    glpProblem: 'Lower appetite making protein targets harder to hit; lean-tissue concern during weight loss',
    intendedUse: 'Complete protein powders and collagen for small, protein-forward eating occasions',
    complianceNote:
      'Protein supports training and nutrition goals. It does not replace resistance training or clinician care, and it does not prevent muscle loss by itself.',
    items: [
      {
        sku: 'JAG42PEVA',
        name: 'Performance Whey Protein Blend (Vanilla)',
        slug: 'performance-whey-protein-blend-vanilla',
        url: u('performance-whey-protein-blend-vanilla'),
        form: 'Powder',
        why: 'Core whey option for low-volume protein occasions.',
        pickPriority: 'core',
      },
      {
        sku: 'JAG42PECH',
        name: 'Performance Whey Protein Blend (Chocolate)',
        slug: 'performance-whey-protein-blend-chocolate',
        url: u('performance-whey-protein-blend-chocolate'),
        form: 'Powder',
        why: 'Flavor alternate for adherence.',
        pickPriority: 'core',
      },
      {
        sku: 'JTP7ADWV',
        name: 'Advanced 100% Whey Protein Isolate (Vanilla)',
        slug: 'advanced-whey-protein-powder-isolate-vanilla',
        url: u('advanced-whey-protein-powder-isolate-vanilla'),
        form: 'Powder',
        why: 'Isolate option when members want a leaner protein profile.',
        pickPriority: 'secondary',
      },
      {
        sku: 'JTP7PPVA',
        name: 'Plant Protein (Vanilla)',
        slug: 'plant-protein-powder-vanilla',
        url: u('plant-protein-powder-vanilla'),
        form: 'Powder',
        why: 'Dairy-free alternative for lactose-sensitive members.',
        pickPriority: 'core',
      },
      {
        sku: 'RLC8COLL',
        name: 'Grass-Fed Hydrolyzed Collagen Peptides',
        slug: 'grass-fed-hydrolyzed-collagen-peptides-powder',
        url: u('grass-fed-hydrolyzed-collagen-peptides-powder'),
        form: 'Powder',
        why: 'Unflavored collagen for coffee, yogurt or soft foods; skin/joint nutrition support, not a loose-skin cure.',
        pickPriority: 'core',
      },
      {
        sku: 'RLC8COLC',
        name: 'Grass-Fed Collagen Peptides Powder (Chocolate)',
        slug: 'grass-fed-collagen-peptides-powder-chocolate',
        url: u('grass-fed-collagen-peptides-powder-chocolate'),
        form: 'Powder',
        why: 'Flavored collagen alternate for adherence.',
        pickPriority: 'secondary',
      },
      {
        sku: 'JTP10GLUT',
        name: 'L-Glutamine',
        slug: 'l-glutamine',
        url: u('l-glutamine'),
        form: 'Powder',
        why: 'Optional amino acid support for training recovery stacks; keep claims modest.',
        pickPriority: 'optional',
      },
    ],
  },
  {
    id: 'strength-training-support',
    title: 'Strength and training support',
    glpProblem: 'Need to preserve strength and training quality while body weight falls',
    intendedUse: 'Creatine, electrolytes and recovery aids that sit beside progressive resistance programmes',
    complianceNote:
      'Training programmes are the primary lean-tissue intervention. Supplements are adjuncts only.',
    items: [
      {
        sku: 'RLC4CREA',
        name: 'Creatine Monohydrate',
        slug: 'creatine-monohydrate-powder',
        url: u('creatine-monohydrate-powder'),
        form: 'Powder',
        why: 'Foundational creatine for strength training support.',
        pickPriority: 'core',
      },
      {
        sku: 'JTP0CRHY',
        name: 'Creatine Hydration Powder',
        slug: 'creatine-hydration-powder',
        url: u('creatine-hydration-powder'),
        form: 'Powder',
        why: 'Creatine plus electrolytes when training and fluids both need attention.',
        pickPriority: 'core',
      },
      {
        sku: 'OSM0HYMA',
        name: 'Hydration Powder (Peach Mango)',
        slug: 'hydration-powder-peach-mango',
        url: u('hydration-powder-peach-mango'),
        form: 'Powder',
        why: 'Electrolyte support for low fluid intake or active days.',
        pickPriority: 'core',
      },
      {
        sku: 'OSM0LEMO',
        name: 'Hydration Powder (Lemonade)',
        slug: 'hydration-powder-lemonade',
        url: u('hydration-powder-lemonade'),
        form: 'Powder',
        why: 'Flavor alternate for daily electrolyte routine.',
        pickPriority: 'secondary',
      },
      {
        sku: 'VOX8BCAW',
        name: 'BCAA Post Workout Powder (Honeydew/Watermelon)',
        slug: 'bcaa-post-workout-powder-honeydew-watermelon',
        url: u('bcaa-post-workout-powder-honeydew-watermelon'),
        form: 'Powder',
        why: 'Optional post-session amino support; protein powder remains primary.',
        pickPriority: 'optional',
      },
      {
        sku: 'VOX4BEET',
        name: 'Beetroot',
        slug: 'beetroot-capsules',
        url: u('beetroot-capsules'),
        form: 'Capsules',
        why: 'Optional nitrate/performance support SKU for training days.',
        pickPriority: 'optional',
      },
      {
        sku: 'JTP4JOIN',
        name: 'Joint Support',
        slug: 'joint-support-capsules',
        url: u('joint-support-capsules'),
        form: 'Capsules',
        why: 'Joint comfort support as body mass and training loads change.',
        pickPriority: 'secondary',
      },
    ],
  },
  {
    id: 'micronutrient-repletion',
    title: 'Micronutrient and energy repletion',
    glpProblem: 'Smaller food volume can leave gaps in vitamins, minerals and daily energy',
    intendedUse: 'Foundational micronutrients when intake is constrained',
    complianceNote:
      'Not a substitute for medical lab work or prescribed repletion. Iron and other minerals may require clinician guidance.',
    items: [
      {
        sku: 'VOX4COMP',
        name: 'Complete Multivitamin',
        slug: 'complete-multivitamin-capsules',
        url: u('complete-multivitamin-capsules'),
        form: 'Capsules',
        why: 'Broad micronutrient floor for low-appetite periods.',
        pickPriority: 'core',
      },
      {
        sku: 'VOX4MGNE',
        name: 'Magnesium Glycinate',
        slug: 'magnesium-glycinate-capsules',
        url: u('magnesium-glycinate-capsules'),
        form: 'Capsules',
        why: 'Common mineral gap; also useful in sleep/recovery conversations.',
        pickPriority: 'core',
      },
      {
        sku: 'RLC3VTD3',
        name: 'Vitamin D3 2,000 IU',
        slug: 'vitamin-d3-2000iu-softgel-capsules',
        url: u('vitamin-d3-2000iu-softgel-capsules'),
        form: 'Softgels',
        why: 'Foundational D3 support when food variety shrinks.',
        pickPriority: 'core',
      },
      {
        sku: 'RLC4FISS',
        name: 'Omega-3 EPA 180mg + DHA 120mg',
        slug: 'omega-3-epa-dha-softgel-capsules',
        url: u('omega-3-epa-dha-softgel-capsules'),
        form: 'Softgels',
        why: 'Essential fatty acid support when oily fish intake falls.',
        pickPriority: 'secondary',
      },
      {
        sku: 'AAV9IRON',
        name: 'Iron Strips',
        slug: 'iron-strips',
        url: u('iron-strips'),
        form: 'Strips',
        why: 'Only with clinician-aware framing; avoid unsupervised iron marketing.',
        pickPriority: 'optional',
      },
      {
        sku: 'JTP0GREE',
        name: 'Greens Superfood',
        slug: 'greens-superfood-powder',
        url: u('greens-superfood-powder'),
        form: 'Powder',
        why: 'Low-volume greens option when produce intake drops.',
        pickPriority: 'secondary',
      },
      {
        sku: 'JTP4FRVE',
        name: 'Fruits and Veggies',
        slug: 'fruits-veggies-capsules',
        url: u('fruits-veggies-capsules'),
        form: 'Capsules',
        why: 'Capsule alternate for produce phytonutrient support.',
        pickPriority: 'optional',
      },
    ],
  },
  {
    id: 'skin-hair-appearance',
    title: 'Skin, hair and appearance support',
    glpProblem: 'Facial volume change, hair shedding concern and skin quality anxiety after major weight loss',
    intendedUse: 'Collagen, hair/skin/nails nutrition and topical peptide skincare',
    complianceNote:
      'Appearance changes after weight loss have many causes. No supplement or cream removes substantial excess skin. Refer significant concerns to qualified dermatology or plastic-surgery care.',
    items: [
      {
        sku: 'VTL4HASK',
        name: 'Hair, Skin & Nails Gummies',
        slug: 'hair-skin-nails-gummies',
        url: u('hair-skin-nails-gummies'),
        form: 'Gummies',
        why: 'Accessible format for hair/skin nutrition support.',
        pickPriority: 'core',
      },
      {
        sku: 'VOX4HAIR',
        name: 'Hair, Skin and Nails Essentials',
        slug: 'hair-skin-nails-essentials-capsules',
        url: u('hair-skin-nails-essentials-capsules'),
        form: 'Capsules',
        why: 'Capsule alternate for the same support lane.',
        pickPriority: 'secondary',
      },
      {
        sku: 'AAV9BCOL',
        name: 'Beauty + Collagen Strips',
        slug: 'beauty-collagen-strips',
        url: u('beauty-collagen-strips'),
        form: 'Strips',
        why: 'Low-burden collagen strip format.',
        pickPriority: 'secondary',
      },
      {
        sku: 'OSM0FIRM',
        name: 'Skin Firming Cream',
        slug: 'skin-firming-cream',
        url: u('skin-firming-cream'),
        form: 'Cream',
        why: 'Topical support; do not claim surgical-equivalent results.',
        pickPriority: 'optional',
      },
      {
        sku: 'EVL0PPMO',
        name: 'Peptide Moisturizer',
        slug: 'peptide-moisturizer',
        url: u('peptide-moisturizer'),
        form: 'Cream',
        why: 'Daily topical for skin quality support.',
        pickPriority: 'optional',
      },
      {
        sku: 'EVL0REPE',
        name: 'Retinol and Peptide Face Serum',
        slug: 'retinol-peptide-face-serum',
        url: u('retinol-peptide-face-serum'),
        form: 'Serum',
        why: 'Advanced topical option for members already using retinoids carefully.',
        pickPriority: 'optional',
      },
    ],
  },
  {
    id: 'metabolic-routine',
    title: 'Metabolic routine (non-Rx)',
    glpProblem: 'Members seeking additional metabolic wellness products alongside coaching and nutrition',
    intendedUse: 'Non-prescription metabolic and adaptogen SKUs with strict claim limits',
    complianceNote:
      'These are dietary supplements, not GLP-1 medicines and not substitutes for prescribed therapy. Avoid blood-sugar treatment claims.',
    items: [
      {
        sku: 'JTP32META',
        name: 'Metabolic Health Formula',
        slug: 'metabolic-health-formula-capsules',
        url: u('metabolic-health-formula-capsules'),
        form: 'Capsules',
        why: 'Broad metabolic wellness formula; keep education-only language.',
        pickPriority: 'secondary',
      },
      {
        sku: 'JTP4BERB',
        name: 'Berberine',
        slug: 'berberine-capsules',
        url: u('berberine-capsules'),
        form: 'Capsules',
        why: 'Popular metabolic support SKU; require interaction screening language with clinician.',
        pickPriority: 'optional',
      },
      {
        sku: 'VOX4ASHW',
        name: 'Ashwagandha',
        slug: 'ashwagandha-capsules',
        url: u('ashwagandha-capsules'),
        form: 'Capsules',
        why: 'Stress/adaptogen support for sleep and recovery conversations.',
        pickPriority: 'secondary',
      },
      {
        sku: 'VOX4SLFR',
        name: 'Sleep Support',
        slug: 'sleep-support-capsules',
        url: u('sleep-support-capsules'),
        form: 'Capsules',
        why: 'Sleep routine support when energy and recovery are priorities.',
        pickPriority: 'secondary',
      },
      {
        sku: 'JTP4LIVR',
        name: 'Liver Support',
        slug: 'liver-support-capsules',
        url: u('liver-support-capsules'),
        form: 'Capsules',
        why: 'Optional wellness SKU; no disease claims.',
        pickPriority: 'optional',
      },
      {
        sku: 'JTP4ACVI',
        name: 'Apple Cider Vinegar Capsules',
        slug: 'apple-cider-vinegar-capsules',
        url: u('apple-cider-vinegar-capsules'),
        form: 'Capsules',
        why: 'Common consumer request; keep claims modest.',
        pickPriority: 'optional',
      },
    ],
  },
]

/** Recommended first-wave Peptis private-label picks (core SKUs across lists). */
export const suplifulCorePickSkus = Array.from(
  new Set(
    suplifulStockLists.flatMap((list) =>
      list.items.filter((item) => item.pickPriority === 'core').map((item) => item.sku),
    ),
  ),
)

export function getSuplifulList(id: string) {
  return suplifulStockLists.find((list) => list.id === id)
}
