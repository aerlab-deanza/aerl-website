/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

function MdxAnchor({
  href = "",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const sharedClassName = cn(
    "font-medium text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-foreground",
    className
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={sharedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={sharedClassName}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

const components = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("mt-10 text-4xl font-heading font-bold tracking-tight text-foreground md:text-5xl", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("mt-12 text-2xl font-heading font-bold tracking-tight text-foreground md:text-3xl", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn("mt-10 text-xl font-heading font-semibold tracking-tight text-foreground md:text-2xl", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("mt-5 text-[1.02rem] leading-8 text-muted-foreground", className)} {...props} />
  ),
  a: MdxAnchor,
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("mt-5 list-disc space-y-3 pl-6 text-[1.02rem] leading-7 text-muted-foreground marker:text-primary", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("mt-5 list-decimal space-y-3 pl-6 text-[1.02rem] leading-7 text-muted-foreground marker:text-primary", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className={cn("my-8 border-l-2 border-primary/45 bg-card/60 px-5 py-4 text-base italic text-foreground", className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("my-10 border-border/70", className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        className
          ? "font-mono text-sm text-foreground"
          : "rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[0.92em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-2xl border border-border/70 bg-background/85 p-4 text-sm shadow-inner",
        className
      )}
      {...props}
    />
  ),
  table: ({ className, children, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-border/70 bg-card/70">
      <table className={cn("min-w-full border-collapse text-left text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className={cn("bg-background/80", className)} {...props} />
  ),
  tbody: ({ className, ...props }: ComponentPropsWithoutRef<"tbody">) => (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr className={cn("border-b border-border/60", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th className={cn("px-4 py-3 font-semibold text-foreground", className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className={cn("px-4 py-3 align-top text-muted-foreground", className)} {...props} />
  ),
  figure: ({ className, ...props }: ComponentPropsWithoutRef<"figure">) => (
    <figure className={cn("my-8 space-y-3", className)} {...props} />
  ),
  figcaption: ({ className, ...props }: ComponentPropsWithoutRef<"figcaption">) => (
    <figcaption className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />
  ),
  img: ({ className, alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    <img className={cn("w-full rounded-[1.5rem] border border-border/70 bg-card object-cover shadow-lg", className)} alt={alt} {...props} />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
