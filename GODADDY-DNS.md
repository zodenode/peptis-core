# GoDaddy DNS for Peptis → Railway

Panel: https://dcc.godaddy.com/control/peptis.com/dns

Railway service networking:
https://railway.com/project/30047a39-df52-4246-9e66-2eb3778dec09/service/73ffa477-2c55-45c5-aceb-b3708e6f2f3e/settings

Working app (Railway default domain):
https://peptis-web-production.up.railway.app

---

## Why peptis.com / www.peptis.com are down

As of 2026-07-24 the storefront **is deployed and healthy** on Railway, but the custom domains fail before traffic reaches the app.

| Host | Live DNS | Result |
|------|----------|--------|
| `www.peptis.com` | CNAME → `rscpq1pp.up.railway.app` (apex target, wrong) | SSL for `*.up.railway.app` + Railway `404 Application not found` |
| `www.peptis.com` | Missing TXT at `_railway-verify.www` | Railway never verifies ownership → no routing / no cert |
| `peptis.com` | GoDaddy forward → `http://www.peptis.com` | Follows into the broken `www` host (also uses http, not https) |

Railway requires **both** the CNAME and the ownership TXT. Without the TXT, the edge returns `Application not found` even when the CNAME resolves.

---

## Fix now (www is primary)

In GoDaddy DNS, make these exact changes:

### 1) Fix `www` CNAME

| Action | Type | Name | Value | TTL |
|--------|------|------|-------|-----|
| **Edit** existing | CNAME | `www` | `z1iy4dgg.up.railway.app` | 600 |

Do **not** leave `www` pointing at `rscpq1pp.up.railway.app` (that target is for apex only).

### 2) Add www ownership TXT

| Action | Type | Name | Value | TTL |
|--------|------|------|-------|-----|
| **Add** | TXT | `_railway-verify.www` | `railway-verify=635736643bc94d1c9d059ec607348617116d39b55102357d8dfd72927516fcd6` | 600 |

GoDaddy appends `.peptis.com`, so the live record becomes `_railway-verify.www.peptis.com`.

> Important: for `www`, the TXT host is `_railway-verify.www`, **not** `_railway-verify`.

### 3) Apex forwarding (recommended)

Keep GoDaddy **Domain Forwarding** for the root:

- Forward `peptis.com` → `https://www.peptis.com` (permanent 301)
- Use **https**, not `http://www.peptis.com`

You do **not** need an apex CNAME on GoDaddy for this setup.

### 4) Optional cleanup

If you are **not** attaching apex `peptis.com` in Railway, you can delete:

| Type | Name | Value |
|------|------|-------|
| TXT | `_railway-verify` | `railway-verify=7933990e3c36836e3ddcccb606d61d1ccd2598d4b3185eafd55bb146ac5cf8bf` |

In Railway → Custom Domains, confirm `www.peptis.com` is listed. If it was removed, re-add it and use whatever CNAME/TXT Railway shows (they can rotate).

---

## Option B — attach apex in Railway too

Only if you want `peptis.com` served by Railway directly (needs CNAME flattening; GoDaddy usually cannot do this):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `@` | `rscpq1pp.up.railway.app` | 600 |
| TXT | `_railway-verify` | `railway-verify=7933990e3c36836e3ddcccb606d61d1ccd2598d4b3185eafd55bb146ac5cf8bf` | 600 |

Delete parking/forwarding A records if you switch to this. Prefer Option A (forward apex → https www) on GoDaddy.

---

## Verify

```bash
dig +short www.peptis.com CNAME
# expect: z1iy4dgg.up.railway.app.

dig +short TXT _railway-verify.www.peptis.com
# expect: "railway-verify=635736643bc94d1c9d059ec607348617116d39b55102357d8dfd72927516fcd6"

curl -I https://www.peptis.com
# expect: HTTP 200 and a certificate for www.peptis.com (not *.up.railway.app)
```

Railway usually verifies DNS and issues TLS within minutes after both records are correct (DNS can take longer to propagate).
