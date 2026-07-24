# Peptis Core — Example Telehealth Storefront

Example marketing/store site for **Peptis**, positioned to compete with top telemedicine merchants (Ro, Hims, Musely, Nurx, Lemonaid) and partner-style sites (GetTrim, FMmeds, MensRX, StiffiesRx, For Humanity).

## Run locally

```bash
npm install
npm run dev
```

## Production

- **GitHub:** https://github.com/zodenode/peptis-core (`main`)
- **Railway:** project `peptis-core` / service `peptis-web`
- **Live URL:** https://peptis-web-production.up.railway.app

### Link GoDaddy (`peptis.com`)

Railway CLI custom-domain create currently returns Unauthorized for this workspace, so add the domain in the Railway UI:

1. Open [peptis-web → Settings → Networking](https://railway.com/project/30047a39-df52-4246-9e66-2eb3778dec09/service/73ffa477-2c55-45c5-aceb-b3708e6f2f3e/settings)
2. **Custom Domain** → add `www.peptis.com` and `peptis.com`
3. Copy the CNAME target Railway shows (often `peptis-web-production.up.railway.app`)
4. In [GoDaddy DNS for peptis.com](https://dcc.godaddy.com/control/peptis.com/dns):
   - **Type CNAME** · **Name** `www` · **Value** `<railway-cname-target>` · TTL 600
   - **Apex `@`:** GoDaddy cannot CNAME the root. Either:
     - Use Railway’s A/ALIAS records if shown, **or**
     - Domain Forwarding: `peptis.com` → `https://www.peptis.com` (permanent / 301)
5. Wait for DNS + Railway TLS (usually a few minutes; up to 48h for DNS)

## Brand

- Wordmark: `Logos/peptis-logo-earthy-green.png` / `public/peptis-logo-green.png`
- Recolored from burgundy to earthy sage `#3F5B3A` (Sage Minimal pack)
- Type: Fraunces (display) + Manrope (body)

## Recommended hero products

Based on Peptis fortes (recovery / longevity / skin / cognitive peptides + quality trust) and what converts in telemedicine:

| Priority | Lane | Compounds | Why |
|---|---|---|---|
| 1 | **Metabolic Reset** | Semaglutide, Tirzepatide | Table-stakes vs Trim, FMmeds, Ro, Hims |
| 2 | **Recovery Protocol** | BPC-157, TB-500, KPV | Strongest Peptis differentiator |
| 3 | **Longevity Stack** | Sermorelin, Ipamorelin, MOTS-c | Owns healthspan niche |
| 4 | **Skin Renewal** | GHK-Cu, KPV | Derm front door vs Musely |
| Supporting | Cognitive Clarity | Semax, Selank | Secondary lane from catalog |

**Do not lead with ED/hair like StiffiesRx/MensRX** — those are not Peptis fortes. Offer vitality later if needed (e.g. PT-141) after the four hero lanes convert.

## Positioning

Peptis wins by being **peptide-native telehealth**, not a generalist men’s/women’s Rx clone with peptides bolted on. GLP-1 is the demand gateway; recovery, longevity, and skin are the moat.

## Note

This is a front-end example only. Live prescribing requires licensed providers, pharmacy partners, state coverage, and compliance (HIPAA, LegitScript, compounding disclosures).
