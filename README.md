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

Custom domains are attached in Railway. Add DNS in GoDaddy (full detail in `GODADDY-DNS.md`):

| Host | Type | Value |
|------|------|-------|
| `www` | CNAME | `z1iy4dgg.up.railway.app` |
| `_railway-verify` | TXT | `railway-verify=635736643bc94d1c9d059ec607348617116d39b55102357d8dfd72927516fcd6` |

For apex `peptis.com`, forward to `https://www.peptis.com` (GoDaddy usually cannot CNAME `@`), or CNAME `@` → `rscpq1pp.up.railway.app` if flattening is available.

DNS panel: https://dcc.godaddy.com/control/peptis.com/dns

## Brand kit

Full kit (green logo lockups, palette, type, tokens):

- Visual board: [`brand-kit/index.html`](./brand-kit/index.html) · also served at `/brand-kit/`
- Specs: [`brand-kit/BRAND.md`](./brand-kit/BRAND.md)
- Tokens: [`brand-kit/tokens.css`](./brand-kit/tokens.css)
- Logos: `brand-kit/logos/` (wordmark, on-paper/forest/white/black, OG, icons)
- Primary: earthy sage `#3F5B3A` · Fraunces + Manrope · Information Edge Insights LLC

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
