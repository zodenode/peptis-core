import assert from "node:assert/strict";
import test from "node:test";

const pageTitle = /<title>Peptis \| Body recomposition and GLP-1 continuity<\/title>/i;
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);

const articleSeo = [
  ["does-ozempic-cause-muscle-loss", "Does Ozempic Cause Muscle Loss? Evidence Explained"],
  ["lean-mass-vs-muscle-mass", "Lean Mass vs Muscle Mass: What Your Scan Really Shows"],
  ["how-much-protein-on-glp-1", "How Much Protein Should You Eat on a GLP-1?"],
  ["two-day-glp-1-strength-plan", "Two-Day GLP-1 Strength Plan for Beginners"],
  ["ozempic-face-loose-skin-science", "Ozempic Face and Loose Skin: What the Evidence Says"],
  ["what-happens-after-stopping-semaglutide", "What Happens After Stopping Semaglutide?"],
  ["creatine-and-glp-1-medication", "Creatine and GLP-1 Medication: Safety and Evidence"],
  ["glp-1-low-appetite-food-plan", "GLP-1 Low-Appetite Food Plan: What to Eat"],
];

async function fetchFromWorker(path, accept = "text/html") {
  const worker = await workerPromise;
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the body composition quiz shell", async () => {
  const response = await fetchFromWorker("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), pageTitle);
});

test("renders unique canonical metadata and structured data for every evidence guide", async () => {
  for (const [slug, title] of articleSeo) {
    const response = await fetchFromWorker(`/blog/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\| Peptis<\\/title>`, "i"), slug);
    assert.match(html, new RegExp(`rel="canonical" href="https://peptis\\.com/blog/${slug}"`, "i"), slug);
    assert.match(html, /"@type":"BlogPosting"/i, slug);
    assert.match(html, /name="description" content="[^"]{80,170}"/i, slug);
    assert.doesNotMatch(html, /\| Peptis \| Peptis<\/title>/i, slug);
  }
});

test("publishes crawl directives and a sitemap on the Peptis domain", async () => {
  const robotsResponse = await fetchFromWorker("/robots.txt", "text/plain");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Sitemap: https:\/\/peptis\.com\/sitemap\.xml/i);

  const sitemapResponse = await fetchFromWorker("/sitemap.xml", "application/xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const [slug] of articleSeo) {
    assert.match(sitemap, new RegExp(`<loc>https://peptis\\.com/blog/${slug}</loc>`, "i"), slug);
  }
});
