# Email abandonment sequences

Do not wire a live ESP in this repo. Use these flows in Klaviyo, Customer.io, or similar. First name comes from checkout identify traits; if missing, drop the greeting token.

Recommended capture: persist quiz state in `localStorage` (`peptis.continuity.quiz`) and identify the person when they enter a valid email on checkout (`posthog.identify`).

## Event → flow mapping

| PostHog event | Properties to use | Flow |
|---|---|---|
| `quiz_stop_block_viewed` | `block: 'A'` | Start **Flow A** wait 15 minutes |
| `quiz_stop_block_viewed` | `block: 'B'` | Start **Flow B** wait 15 minutes |
| `quiz_stop_block_viewed` | `block: 'C'` | Start **Flow C** wait 15 minutes |
| `quiz_stop_block_continued` | `block` | Cancel the matching flow if they continue |
| `checkout_viewed` | `plan: 'core_299'` | Cancel A/B/C wait timers (they reached payment) |
| `checkout_submit_clicked` | `plan`, `upsell`, `state` | Exit all abandonment; start onboarding |
| `quiz_abandoned` | `last_step`, `minutes_on_quiz` | If `last_step` is `stop_a` / `stop_b` / `stop_c`, fire the matching flow immediately if the 15-minute wait is still pending |
| `quiz_completed` | `answers_summary`, `pathways` | Enrich profile; do not send drop-off mail |

Cancel any flow if `checkout_submit_clicked` or `checkout_viewed` fires before send. Prefer sending only if an email is known (`identify` on checkout email). If they abandon before email, keep the local snapshot for resume and skip the send.

Suggested wait: **15 minutes** after the stop-block view without `checkout_viewed`.

---

## Flow A: Dropped off at Reassurance Block A (Muscle Loss Concern)

- **Trigger:** User views Stop Block A but does not hit Stripe Checkout within 15 minutes.
- **Subject:** Muscle loss on your metabolic routine? (Read this)
- **Preview:** Why the scale dropping isn’t always a win.

Hi [First Name],

We noticed you didn't finish customizing your Peptis Continuity Plan. If you are noticing a loss in muscle tone or physical strength on your current routine, skipping this step can be a massive roadblock.

Here is the hard truth: Traditional weight management clinics only focus on the scale. But up to 40% of that lost weight comes directly from your lean skeletal muscle tissue. This drops your resting metabolism, making long-term maintenance almost impossible without a rebound.

Peptis was built to fix this. Our protocols protect your hard-earned lean muscle fibers while keeping your metabolism running hot.

Your customized file is saved and pending medical review. Let’s protect your architecture.

[Secure Your Muscle Mass & Finish Activation](https://www.peptis.com/quiz)

In health,  
The Peptis Clinical Team

---

## Flow B: Dropped Off at Reassurance Block B (Cellular Fatigue Concern)

- **Trigger:** User views Stop Block B but does not hit Stripe Checkout within 15 minutes.
- **Subject:** The real reason you feel exhausted on your protocol...
- **Preview:** It’s not a lack of willpower. It’s cellular.

Hi [First Name],

Constant, deep physical fatigue and brain fog should not be the tax you pay for managing your metabolic health.

When your body stays in a prolonged caloric deficit, your cellular engines—your mitochondria—power down their production of ATP (energy). Standard doctors tell you to just drink more caffeine, which only overworks your system.

Peptis targets the root cause. Your optimized continuity plan includes advanced cellular support designed to stabilize mitochondrial membranes and naturally bring your energetic edge back.

Don't let burnout stall your progress. Your prescription transfer is waiting.

[Restore Your Cellular Energy Now](https://www.peptis.com/quiz)

In health,  
The Peptis Clinical Team

---

## Flow C: Dropped Off at Reassurance Block C (GI Bloating Concern)

- **Trigger:** User views Stop Block C but does not hit Stripe Checkout within 15 minutes.
- **Subject:** Frustrated with constant stomach bloating?
- **Preview:** You don't have to choose between progress and comfort.

Hi [First Name],

Prolonged digestive transit is a known mechanism of next-generation metabolic therapies, but living with constant abdominal tightness, heavy bloating, or trapped gas isn't sustainable.

You don't have to accept a highly uncomfortable stomach to keep your weight stable. Peptis introduces localized mucosal tissue support into your routine to actively soothe your digestive lining and balance transit speed.

Let's make your continuity journey completely comfortable. Finish your intake and let our licensed medical network handle the rest.

[Relieve Your Bloating & Complete Your Setup](https://www.peptis.com/quiz)

In health,  
The Peptis Clinical Team
