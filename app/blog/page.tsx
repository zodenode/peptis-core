import type { Metadata } from "next";
import Link from "next/link";
import { EditorialSignal } from "@/components/cinematic-experience";
import { EvidenceFinder } from "@/components/evidence-finder";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { blogCategories, blogPosts, postsByCategory } from "@/lib/peptis-content";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "GLP-1 Evidence Library: Muscle, Nutrition and Maintenance",
  description: "Evidence-led GLP-1 guides covering muscle and lean mass, protein, strength training, skin changes, side effects, maintenance and how to assess cash-pay care.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Peptis GLP-1 Evidence Library",
    description: "Evidence-led guidance for protecting strength, nutrition and the durability of weight loss.",
    url: "/blog",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptis GLP-1 Evidence Library",
    description: "Evidence-led guidance for protecting strength, nutrition and the durability of weight loss.",
    images: ["/og.png"],
  },
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/blog")}#collection`,
        name: "Peptis GLP-1 Evidence Library",
        description: metadata.description,
        url: absoluteUrl("/blog"),
        isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: blogPosts.length,
          itemListElement: blogPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/blog/${post.slug}`),
            name: post.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Peptis", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Evidence library", item: absoluteUrl("/blog") },
        ],
      },
    ],
  };

  return (
    <main className="marketing-page blog-page">
      <SiteHeader current="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="blog-hero reveal-on-scroll">
        <div>
          <p className="eyebrow">PEPTIS · EVIDENCE LIBRARY</p>
          <h1>Understand the treatment. Protect the outcome.</h1>
          <p>Evidence-led guidance on GLP-1 treatment, body composition, low-appetite nutrition, training, appearance changes, care access and what happens next.</p>
        </div>
        <div className="editorial-hero-visual">
          <div className="editorial-standard">
            <span>THE EDITORIAL STANDARD</span>
            <strong>Primary sources. Useful limits. No invented certainty.</strong>
            <p>Every statistic should identify the population and study context. Every explainer includes what the evidence cannot tell us. <Link href="/editorial-policy">Read our editorial policy.</Link></p>
          </div>
          <EditorialSignal />
        </div>
      </section>

      <EvidenceFinder categories={blogCategories} posts={blogPosts} />

      <section className="featured-article reveal-on-scroll" aria-labelledby="featured-title">
        <Link className="featured-image" data-parallax href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`}>
          {/* The source images are already compressed WebP assets served directly by the edge. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.image} alt={featured.imageAlt} width="1600" height="1000" decoding="async" fetchPriority="high" />
        </Link>
        <div className="featured-copy">
          <span>{featured.category} · {featured.readTime}</span>
          <h2 id="featured-title"><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.dek}</p>
          <Link className="editorial-link" href={`/blog/${featured.slug}`}>Read the evidence <b>→</b></Link>
        </div>
      </section>

      <div className="blog-library-layout">
        <aside className="category-rail" aria-label="Evidence library sections">
          <span>SECTIONS</span>
          {blogCategories.map((category, index) => (
            <a href={`#category-${index + 1}`} key={category}>{category}</a>
          ))}
        </aside>

        <div className="category-columns">
          {blogCategories.map((category, categoryIndex) => {
            const posts = postsByCategory(category);
            return (
              <section className="blog-category reveal-on-scroll" id={`category-${categoryIndex + 1}`} key={category}>
                <div className="blog-category-heading">
                  <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
                  <h2>{category}</h2>
                  <p>{posts.length ? `${posts.length} launch guide${posts.length === 1 ? "" : "s"}` : "Editorial roadmap in development"}</p>
                </div>
                {posts.length ? (
                  <div className="article-column-grid collective-grid" data-reveal>
                    {posts.map((post) => (
                      <article className="article-card" data-reveal key={post.slug}>
                        <Link className="article-card-image" data-parallax href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.image} alt={post.imageAlt} width="1000" height="700" loading="lazy" decoding="async" />
                        </Link>
                        <div>
                          <span>{post.readTime}</span>
                          <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                          <p>{post.dek}</p>
                          <Link className="editorial-link" href={`/blog/${post.slug}`}>Read guide <b>→</b></Link>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="roadmap-card" data-reveal>
                    <strong>Next in the editorial queue</strong>
                    <p>{category === "Skin, face & hair" ? "Hair shedding, collagen claims and realistic skin-treatment options." : "Dose-escalation nutrition, hydration, constipation and red-flag explainers."}</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <section className="blog-newsletter reveal-on-scroll">
        <p className="eyebrow">FOLLOW THE EVIDENCE, NOT THE HEADLINE</p>
        <h2>Start with the question that affects your next decision.</h2>
        <div><Link href="/blog/does-ozempic-cause-muscle-loss">Muscle & lean mass <span>→</span></Link><Link href="/blog/cash-pay-glp-1-care">Cash-pay GLP-1 care <span>→</span></Link><Link href="/blog/how-to-assess-an-online-provider">Assess an online provider <span>→</span></Link></div>
      </section>

      <SiteFooter />
    </main>
  );
}
