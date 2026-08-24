import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Peptis",
    short_name: "Peptis",
    description: "Evidence-led body recomposition and GLP-1 continuity support.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#173f32",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
