import type { Metadata } from "next";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Technical documentation for AERL projects, including architecture, validation, theory, and engineering logs.",
  alternates: {
    canonical: "/documentation",
  },
};

export default function DocumentationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SectionWrapper className="pb-20 pt-8 md:pt-12">
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-12">
        <DocsSidebar />
        <article className="docs-content aerl-grid-panel min-w-0 p-6 md:p-10 lg:p-12">
          {children}
        </article>
      </div>
    </SectionWrapper>
  );
}
