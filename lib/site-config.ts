export const siteConfig = {
  name: "Peptis",
  url: "https://peptis.com",
  description:
    "Evidence-led body recomposition and GLP-1 continuity support for strength, protein, tolerability and maintenance.",
  editorialTeam: "Peptis Editorial Team",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
