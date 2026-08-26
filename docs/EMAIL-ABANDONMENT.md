# Email abandonment sequences

Do not wire a live ESP in this repo. Use these flows in Klaviyo, Customer.io, or similar. First name comes from checkout identify traits; if missing, drop the greeting token.

Recommended capture: persist quiz state in `localStorage` (`peptis.continuity.quiz`) and identify the person when a reservation is submitted (`posthog.identify` fires from `submitCheckout`). Most drop-offs before checkout have no email; keep the local snapshot for resume and skip the send.

All copy below must follow `.cursor/skills/peptis-evidence-copy/SKILL.md`. Never imply live medical care, prescriptions, medication side-effect treatment, guaranteed muscle preservation, or a "40% muscle" figure.

## Event → flow mapping

| PostHog event | Properties to use | Flow |
|---|---|---|
| `quiz_stop_block_viewed` | `block: 'A'` | Start **Flow A** wait 15 minutes |
| `quiz_stop_block_viewed` | `block: 'B'` | Start **Flow B** wait 15 minutes |
| `quiz_stop_block_viewed` | `block: 'C'` | Start **Flow C** wait 15 minutes |
| `quiz_stop_block_continued` | `block` | Cancel the matching flow if they continue |
| `checkout_viewed` | `plan: 'core_founding_reservation'` | Cancel A/B/C wait timers (they reached the reservation step) |
| `checkout_submit_clicked` | `plan`, `upsell`, `state` | Exit all abandonment; start onboarding |
| `quiz_abandoned` | `last_step`, `minutes_on_quiz` | If `last_step` is `stop_a` / `stop_b` / `stop_c`, fire the matching flow immediately if the 15-minute wait is still pending |
| `quiz_reached_checkout` | `pathways` | Enrich profile; do not send drop-off mail |
| `quiz_completed` | `pathways` | Enrich profile; reservation submitted |

Cancel any flow if `checkout_submit_clicked` or `checkout_viewed` fires before send. Prefer sending only if an email is known (identify happens at reservation submit). If they abandon before email, keep the local snapshot for resume and skip the send.

Suggested wait: **15 minutes** after the stop-block view without `checkout_viewed`.

---

## Flow A: Dropped off at Stop Block A (strength and lean tissue)

- **Trigger:** User views Stop Block A but does not reach checkout within 15 minutes.
- **Subject:** Your strength summary is one step from saved
- **Preview:** The scale cannot tell you if you are keeping strength.

Hi [First Name],

You paused your continuity check right at the strength section, so here is the short version.

Significant weight loss can include lean tissue as well as fat. In randomized GLP-1 body composition research, roughly a quarter of the weight lost was lean mass, and lean mass is not the same as skeletal muscle. Resistance training and workable protein habits are the best supported behavioral priorities during weight loss.

Your answers are saved on this device. Finish the last questions to save your summary and reserve founding access for $0. No payment details, and no medical care is provided today.

[Finish my continuity check](https://www.peptis.com/quiz)

The Peptis team

---

## Flow B: Dropped off at Stop Block B (energy and recovery)

- **Trigger:** User views Stop Block B but does not reach checkout within 15 minutes.
- **Subject:** Give your energy pattern the context it deserves
- **Preview:** Timing, food, fluids and sleep make fatigue easier to discuss.

Hi [First Name],

Persistent tiredness during weight loss can have many causes, including lower food intake, fluids, sleep and current therapy. A clear record of when it happens and what helps makes any future clinical conversation more useful. Peptis does not diagnose or treat fatigue.

Your quiz progress is saved. Finish the remaining questions to keep energy and recovery in your summary and reserve founding access for $0.

[Finish my continuity check](https://www.peptis.com/quiz)

The Peptis team

---

## Flow C: Dropped off at Stop Block C (digestive comfort)

- **Trigger:** User views Stop Block C but does not reach checkout within 15 minutes.
- **Subject:** Clear notes make digestive symptoms easier to explain
- **Preview:** Meals, timing and therapy details, all in one place.

Hi [First Name],

Digestive comfort can change during GLP-1 treatment, and a simple record of meals, timing and symptoms is the most practical first step. Ongoing or severe symptoms deserve attention from your current clinician. Peptis does not treat digestive symptoms.

Your quiz progress is saved. Finish the remaining questions to keep digestive comfort in your summary and reserve founding access for $0. Nothing ships and nothing is charged.

[Finish my continuity check](https://www.peptis.com/quiz)

The Peptis team
