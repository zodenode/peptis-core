import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Editorial and Medical Review Policy",
  description: "How Peptis researches, writes, reviews, updates and corrects evidence-led health content about GLP-1 treatment and body recomposition.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    title: "Peptis Editorial and Medical Review Policy",
    description: "Our standards for primary sources, clinical claims, limitations, review status, corrections and commercial independence.",
    type: "website",
    url: "/editorial-policy",
    images: ["/og.png"],
  },
};

export default function EditorialPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Peptis Editorial and Medical Review Policy",
    description: metadata.description,
    url: absoluteUrl("/editorial-policy"),
    dateModified: "2026-08-24",
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <main className="marketing-page article-page policy-page">
      <SiteHeader current="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="article-hero reveal-on-scroll">
        <div className="article-breadcrumb"><Link href="/">Peptis</Link><span>/</span><Link href="/blog">Evidence library</Link></div>
        <p className="eyebrow">EDITORIAL GOVERNANCE</p>
        <h1>Evidence before certainty.</h1>
        <p className="article-dek">How Peptis researches, writes, qualifies, reviews and updates health information—and what our current review labels actually mean.</p>
        <div className="article-byline"><span>Effective 24 August 2026</span><span>Last updated 24 August 2026</span></div>
      </header>

      <div className="article-layout policy-layout">
        <aside className="article-toc" aria-label="On this page">
          <span>ON THIS PAGE</span>
          <a href="#principles">Editorial principles</a>
          <a href="#sources">Source hierarchy</a>
          <a href="#claims">Claims and uncertainty</a>
          <a href="#review">Medical review</a>
          <a href="#updates">Updates and corrections</a>
          <a href="#commercial">Commercial independence</a>
        </aside>

        <article className="article-body">
          <div className="key-takeaway reveal-on-scroll"><span>THE STANDARD</span><strong>We distinguish what a study measured from what a headline implies, and we never invent a clinician review that has not happened.</strong></div>

          <section id="principles" className="reveal-on-scroll">
            <span className="section-index">01</span>
            <h2>Editorial principles</h2>
            <p>Peptis content is written to help readers understand evidence, prepare better questions and build realistic support routines. It is not a diagnosis, prescription or substitute for the clinician responsible for an individual&apos;s care.</p>
            <ul>
              <li>Identify the population, intervention, comparator and outcome behind important statistics.</li>
              <li>Separate association, mechanism and randomized clinical evidence.</li>
              <li>Explain absolute findings and relevant limitations—not only the most dramatic relative number.</li>
              <li>Distinguish approved medicines from compounded, investigational and research-only substances.</li>
              <li>Use plain language without removing clinically important uncertainty or risk.</li>
            </ul>
          </section>

          <section id="sources" className="reveal-on-scroll">
            <span className="section-index">02</span>
            <h2>Source hierarchy</h2>
            <p>We prefer current prescribing information and safety communications from regulators, peer-reviewed randomized trials, systematic reviews, major professional guidance and original study reports. News coverage and company materials may provide context, but they do not replace primary evidence for a health claim.</p>
            <p>Every evidence guide lists its sources. Drug labels, approvals, shortages and clinical guidance can change, so time-sensitive claims are dated and should be rechecked before clinical or marketing use.</p>
          </section>

          <section id="claims" className="reveal-on-scroll">
            <span className="section-index">03</span>
            <h2>Claims, language and uncertainty</h2>
            <p>We do not turn a finding about a medicine, ingredient or study population into a promise about a Peptis product. Where evidence is indirect, exploratory, observational or heterogeneous, the article should say so close to the relevant claim.</p>
            <p>Terms such as “may,” “associated with,” “measured” and “estimated” are used deliberately. A caveat hidden in a footer does not repair a misleading headline or overall impression.</p>
          </section>

          <section id="review" className="reveal-on-scroll">
            <span className="section-index">04</span>
            <h2>Medical review status</h2>
            <p>Each article displays its current review status. “Primary-source review completed” means the editorial team checked the cited materials; it does not mean an independent clinician has approved the article. Where the label says clinician, dermatology or exercise-science review is pending, that review has not yet occurred.</p>
            <aside className="study-limit"><strong>Launch requirement</strong><p>High-intent medical content and customer-facing treatment claims should receive named, appropriately qualified clinical review and legal/compliance review before Peptis uses them to sell prescription care.</p></aside>
          </section>

          <section id="updates" className="reveal-on-scroll">
            <span className="section-index">05</span>
            <h2>Updates and corrections</h2>
            <p>Articles show publication and update dates. Material changes should update the page date and, where useful, explain what changed. Confirmed factual errors should be corrected promptly without silently preserving a more marketable but inaccurate claim.</p>
          </section>

          <section id="commercial" className="reveal-on-scroll">
            <span className="section-index">06</span>
            <h2>Commercial independence</h2>
            <p>Peptis may sell programmes, products or access to services discussed near editorial content. Commercial relevance does not change the evidence threshold. Sponsorships, affiliate relationships and material conflicts should be disclosed where they could affect a reasonable reader&apos;s interpretation.</p>
            <p><Link href="/blog">Return to the Peptis Evidence Library</Link>.</p>
          </section>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
