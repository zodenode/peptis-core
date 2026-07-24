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
- **Live URL (working):** https://peptis-web-production.up.railway.app
- **Custom domains:** `https://www.peptis.com` / `https://peptis.com` — require GoDaddy DNS below

### Fix / link GoDaddy (`peptis.com`)

The app on Railway is healthy. Custom domains fail when DNS is wrong: Railway returns `404 Application not found` and serves the `*.up.railway.app` certificate until **both** the CNAME and ownership TXT are correct.

In https://dcc.godaddy.com/control/peptis.com/dns:

| Action | Type | Name | Value |
|--------|------|------|-------|
| Edit | CNAME | `www` | `z1iy4dgg.up.railway.app` |
| Add | TXT | `_railway-verify.www` | `railway-verify=635736643bc94d1c9d059ec607348617116d39b55102357d8dfd72927516fcd6` |

Forward apex `peptis.com` → `https://www.peptis.com` (301). Full diagnosis + verify commands: `GODADDY-DNS.md`.

Railway networking UI: https://railway.com/project/30047a39-df52-4246-9e66-2eb3778dec09/service/73ffa477-2c55-45c5-aceb-b3708e6f2f3e/settings
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
