import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { blogCategories, blogPosts, getBlogPost } from "@/lib/peptis-content";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: [post.seo.primaryKeyword, ...post.seo.relatedKeywords, post.category, "Peptis"],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: siteConfig.name,
      publishedTime: post.seo.publishedAt,
      modifiedTime: post.seo.updatedAt,
      authors: [absoluteUrl("/editorial-policy")],
      section: post.category,
      tags: [post.seo.primaryKeyword, ...post.seo.relatedKeywords],
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category).slice(0, 2);
  const fallbackRelated = related.length ? related : blogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);
  const articleText = [
    post.title,
    post.dek,
    post.keyTakeaway,
    ...post.sections.flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? [])]),
    ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
  const wordCount = articleText.trim().split(/\s+/).length;
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const imageUrl = absoluteUrl(post.image);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: post.title,
        alternativeHeadline: post.seo.title,
        description: post.seo.description,
        datePublished: post.seo.publishedAt,
        dateModified: post.seo.updatedAt,
        author: { "@type": "Organization", name: siteConfig.editorialTeam, url: absoluteUrl("/editorial-policy") },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: { "@type": "ImageObject", url: absoluteUrl("/peptis-logo.png") },
        },
        image: { "@type": "ImageObject", url: imageUrl },
        url: canonicalUrl,
        articleSection: post.category,
        keywords: [post.seo.primaryKeyword, ...post.seo.relatedKeywords].join(", "),
        wordCount,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        citation: post.sources.map((source) => source.url),
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        isPartOf: { "@type": "Blog", name: "Peptis Evidence Library", url: absoluteUrl("/blog") },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Peptis", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Evidence library", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className="marketing-page article-page">
      <SiteHeader current="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="article-hero reveal-on-scroll">
        <div className="article-breadcrumb"><Link href="/blog">Evidence library</Link><span>/</span><Link href={`/blog#category-${blogCategories.indexOf(post.category) + 1}`}>{post.category}</Link></div>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.dek}</p>
        <div className="article-byline">
          <span>By <Link href="/editorial-policy">Peptis Editorial Team</Link></span>
          <span>{post.readTime}</span>
          <span>Published <time dateTime={post.seo.publishedAt}>{post.published}</time></span>
          <span>Updated <time dateTime={post.seo.updatedAt}>24 August 2026</time></span>
        </div>
        <div className="review-status"><b>Review status</b><span>{post.reviewed}</span><Link href="/editorial-policy">How we review evidence</Link></div>
      </header>

      <figure className="article-hero-image reveal-on-scroll" data-parallax>
        {/* The source image is an already compressed WebP asset served directly by the edge. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={post.imageAlt} width="1600" height="1000" decoding="async" fetchPriority="high" />
      </figure>

      <div className="article-layout">
        <aside className="article-toc" aria-label="On this page">
          <span>ON THIS PAGE</span>
          <a href="#evidence-snapshot">Evidence snapshot</a>
          {post.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{section.heading}</a>)}
          <a href="#evidence-pathway">What to read next</a>
          <a href="#frequently-asked-questions">Frequently asked questions</a>
          <a href="#sources">Sources</a>
        </aside>

        <article className="article-body">
          <div className="key-takeaway reveal-on-scroll"><span>THE PEPTIS TAKEAWAY</span><strong>{post.keyTakeaway}</strong></div>
          <div className="medical-notice"><strong>Important:</strong> This is general education, not personal medical advice. Do not start, stop or change prescription treatment without the clinician managing your care.</div>

          <section className="article-evidence-snapshot reveal-on-scroll" id="evidence-snapshot">
            <span className="section-index">E</span>
            <p className="card-kicker">THE EVIDENCE AT A GLANCE</p>
            <div className="article-quick-fact-grid collective-grid" data-reveal>
              {post.quickFacts.map((fact) => (
                <article key={`${fact.value}-${fact.label}`}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                  <p>{fact.context}</p>
                </article>
              ))}
            </div>
          </section>

          {post.sections.map((section, index) => (
            <section className="article-story-section reveal-on-scroll" id={`section-${index + 1}`} key={section.heading}>
              <i className="article-section-pulse" aria-hidden="true" />
              <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              {(section.paragraphs ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              {section.studyLimit ? <aside className="study-limit"><strong>What this evidence cannot tell us</strong><p>{section.studyLimit}</p></aside> : null}
            </section>
          ))}

          <section className="article-pathway reveal-on-scroll" id="evidence-pathway">
            <span className="section-index">N</span>
            <p className="card-kicker">BUILD THE FULL PICTURE</p>
            <h2>What to read next</h2>
            <div>
              {post.pathway.map((item, index) => (
                <Link href={`/blog/${item.slug}`} key={item.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <p>{item.context}</p>
                  <b>→</b>
                </Link>
              ))}
            </div>
          </section>

          <section className="article-faqs reveal-on-scroll" id="frequently-asked-questions">
            <span className="section-index">Q</span>
            <p className="card-kicker">HIGH-INTENT QUESTIONS</p>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {post.faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="article-sources reveal-on-scroll" id="sources">
            <span className="section-index">S</span>
            <h2>Primary sources and guidance</h2>
            <ol>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ol>
            <p>Sources were checked for this expanded evidence guide on 24 August 2026. Drug labels, approvals and clinical guidance can change; verify current materials before making a clinical or marketing decision. Read our <Link href="/editorial-policy">editorial and evidence policy</Link>.</p>
          </section>

          <div className="article-cta reveal-on-scroll"><span>PUT THE EVIDENCE INTO A PLAN</span><strong>{post.cta.label}</strong><a href={post.cta.href}>Continue <b>→</b></a></div>
        </article>
      </div>

      <section className="related-articles reveal-on-scroll">
        <p className="eyebrow">KEEP READING</p>
        <h2>Related Peptis guides</h2>
        <div className="collective-grid" data-reveal>{fallbackRelated.map((item) => <article key={item.slug}><span>{item.category}</span><h3><a href={`/blog/${item.slug}`}>{item.title}</a></h3><p>{item.dek}</p><a href={`/blog/${item.slug}`}>Read guide →</a></article>)}</div>
      </section>

      <SiteFooter />
    </main>
  );
}
