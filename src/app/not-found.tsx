import Link from "next/link";

import { SectionWrapper } from "@/components/layout/SectionWrapper";

export default function NotFound() {
  return (
    <SectionWrapper className="flex min-h-[70vh] items-center justify-center">
      <div className="aerl-grid-panel max-w-3xl px-8 py-14 text-center md:px-12">
        <p className="aerl-kicker">404 / Route Not Found</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          That page is not in the flight envelope.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          The route may have moved during the site merge. Use the links below to get back to the public site or the technical documentation hub.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="aerl-action-link">
            Return home
          </Link>
          <Link href="/documentation" className="aerl-action-link">
            Open documentation
          </Link>
          <Link href="/join" className="aerl-action-link">
            Join or contact
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
