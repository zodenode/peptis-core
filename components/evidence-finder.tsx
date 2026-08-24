"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { BlogCategory, BlogPost } from "@/lib/peptis-content";

export function EvidenceFinder({
  categories,
  posts,
}: {
  categories: readonly BlogCategory[];
  posts: readonly BlogPost[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const matches = useMemo(() => posts.filter((post) => {
    const categoryMatches = category === "All" || post.category === category;
    const queryMatches = !deferredQuery || [post.title, post.dek, post.category, post.keyTakeaway]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
    return categoryMatches && queryMatches;
  }), [category, deferredQuery, posts]);
  const isDefaultView = category === "All" && !deferredQuery;
  const displayedMatches = isDefaultView ? matches.slice(0, 4) : matches;

  return (
    <section className="evidence-finder reveal-on-scroll" aria-labelledby="evidence-finder-title">
      <div className="evidence-finder-heading">
        <div>
          <p className="eyebrow">START WITH YOUR QUESTION</p>
          <h2 id="evidence-finder-title">Find the evidence that changes your next decision.</h2>
        </div>
        <p>Search the launch library by concern or choose the part of the journey you are navigating.</p>
      </div>

      <div className="evidence-search-shell">
        <label htmlFor="evidence-search"><span>SEARCH THE LIBRARY</span><input id="evidence-search" onChange={(event) => setQuery(event.target.value)} placeholder="Try “muscle”, “protein”, “skin” or “stopping”" type="search" value={query} /></label>
        {query ? <button data-pressable onClick={() => setQuery("")} type="button">Clear</button> : <span aria-hidden="true">⌕</span>}
      </div>

      <div className="evidence-filter-rail" aria-label="Filter evidence by section">
        <button aria-pressed={category === "All"} data-pressable onClick={() => setCategory("All")} type="button">All guides</button>
        {categories.map((item) => <button aria-pressed={category === item} data-pressable key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}
      </div>

      <div className="evidence-result-meta" aria-live="polite"><span>{matches.length} guide{matches.length === 1 ? "" : "s"}</span><b>{category === "All" ? "Across the evidence library" : category}</b></div>

      {matches.length ? (
        <div className="evidence-result-grid">
          {displayedMatches.map((post, index) => (
            <article key={post.slug}>
              <Link className="evidence-result-image" data-pressable href={`/blog/${post.slug}`} style={{ backgroundImage: `url(${post.image})` }} aria-label={`Read ${post.title}`}><span>{String(index + 1).padStart(2, "0")}</span></Link>
              <div>
                <span>{post.category} · {post.readTime}</span>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.dek}</p>
                <Link href={`/blog/${post.slug}`}>Open guide <b>↗</b></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="evidence-empty">
          <strong>No guide matches that search yet.</strong>
          <p>Clear the search or browse every section. The current library focuses on the highest-intent launch questions.</p>
          <button data-pressable onClick={() => { setQuery(""); setCategory("All"); }} type="button">Show every guide</button>
        </div>
      )}
      {isDefaultView && matches.length > displayedMatches.length ? <a className="evidence-browse-all" href="#category-1">Browse the full sectioned library <span>↓</span></a> : null}
    </section>
  );
}
