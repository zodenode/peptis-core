# Peptis Publication

Public URLs live at `/publication` and `/publication/{category}/{slug}`.

## Where articles should live

Keep them **in this GitHub repo**. Do not move the desk to WordPress.

A GLP-1 continuity publication is a claims product. Every number has to stay next to its trial, denominator and limitation. GitHub gives you:

- The same evidence-copy review as the rest of the site
- Diffs, reverts and a paper trail for the Beazley / legal file
- No plugin surface and no second login to drift off brand

WordPress is the wrong host for this. It is fast for a lifestyle blog and weak for claim control.

A mini dashboard can come later as a **draft desk only**: password-gated notes that still ship through a pull request. Do not let a dashboard publish live copy that has not been reviewed against `.cursor/skills/peptis-evidence-copy/SKILL.md`.

## How to add an essay

1. Add the article to `src/data/blog.ts` (title, category, sections, cannot-tell-us, sources).
2. Use an existing category in `src/data/publication.ts`, or add a slug there first.
3. Do not invent testimonials, results, prices or “40% muscle” claims.
4. Put the source, population and limitation next to every statistic.
5. Open a pull request. The live site updates on deploy.

Current categories: `composition`, `protein`, `training`, `skin`, `maintenance`.
