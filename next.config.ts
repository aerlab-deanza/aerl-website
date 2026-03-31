import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

const nextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    root: process.cwd(),
  },
} satisfies NextConfig;

export default withMDX(nextConfig);
