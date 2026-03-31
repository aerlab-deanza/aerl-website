"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsSections } from "@/config/docs";
import { cn } from "@/lib/utils";

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {docsSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <p className="aerl-kicker">{section.title}</p>
          <div className="space-y-2">
            {section.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-2xl border px-4 py-3 transition",
                    isActive
                      ? "border-primary/30 bg-primary/10 text-foreground shadow-sm"
                      : "border-border/60 bg-background/35 text-muted-foreground hover:border-border hover:bg-card/60 hover:text-foreground"
                  )}
                >
                  <span className="block text-sm font-semibold">{item.title}</span>
                  {item.description ? (
                    <span className="mt-1 block text-xs leading-relaxed text-inherit/80">{item.description}</span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  return (
    <>
      <div className="aerl-panel lg:hidden">
        <details open className="p-5">
          <summary className="cursor-pointer list-none">
            <span className="aerl-kicker">Documentation Navigation</span>
            <span className="mt-2 block font-heading text-xl text-foreground">Browse the lab docs</span>
          </summary>
          <div className="mt-5">
            <SidebarNav />
          </div>
        </details>
      </div>

      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
        <div className="aerl-grid-panel p-6">
          <span className="aerl-kicker">Documentation</span>
          <h2 className="mt-3 font-heading text-2xl text-foreground">AERL technical hub</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Deep project context, validation targets, logs, and reference material for the current build cycle.
          </p>
          <div className="mt-6">
            <SidebarNav />
          </div>
        </div>
      </aside>
    </>
  );
}
