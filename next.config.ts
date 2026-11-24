import type { NextConfig } from "next";

// A static site: `next build` writes plain HTML, CSS and JS to out/, which nginx serves (see the Dockerfile).
// trailingSlash gives each page its own folder (out/rights/index.html), which nginx serves with no extra rules.
const nextConfig: NextConfig = { output: "export", trailingSlash: true };

export default nextConfig;
