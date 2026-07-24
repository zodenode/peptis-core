# GoDaddy DNS for Peptis → Railway

Add these in https://dcc.godaddy.com/control/peptis.com/dns

## 1) www.peptis.com (primary)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `z1iy4dgg.up.railway.app` | 600 |
| TXT | `_railway-verify` | `railway-verify=635736643bc94d1c9d059ec607348617116d39b55102357d8dfd72927516fcd6` | 600 |

If GoDaddy already has a CNAME/A for `www`, edit or delete it first.

## 2) Apex peptis.com

Railway wants a CNAME for `@` → `rscpq1pp.up.railway.app`.

GoDaddy often blocks CNAME on `@`. Prefer:

**Option A (recommended): Domain Forwarding**

- Forward `peptis.com` → `https://www.peptis.com` (Permanent 301)
- Keep only the `www` CNAME above

**Option B: CNAME flattening / ALIAS on `@`** (if GoDaddy allows)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `@` | `rscpq1pp.up.railway.app` | 600 |
| TXT | `_railway-verify` | `railway-verify=7933990e3c36836e3ddcccb606d61d1ccd2598d4b3185eafd55bb146ac5cf8bf` | 600 |

Delete parking A records (`3.33.130.190`, `15.197.148.33`) if you use Option B.

## 3) Verify

```bash
dig +short www.peptis.com CNAME
# expect: z1iy4dgg.up.railway.app.

curl -I https://www.peptis.com
```

Railway issues TLS after DNS verifies (usually minutes).
