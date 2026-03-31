import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DocsLinkCardProps {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
}

export function DocsLinkCard({
  title,
  description,
  href,
  eyebrow,
}: DocsLinkCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-[1.5rem] border border-border/70 bg-card/75 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      {eyebrow ? <p className="aerl-kicker">{eyebrow}</p> : null}
      <h3 className="mt-3 font-heading text-2xl font-semibold text-foreground transition group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
        Open page <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
