"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 shadow-[0_10px_30px_rgb(6_24_30_/_0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/88">
      <div className="container mx-auto flex h-18 max-w-7xl items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex md:items-center">
          <Link href="/" className="mr-8 flex items-center gap-3">
            <div className="rounded-full border border-border/85 bg-card/95 p-1.5 shadow-sm">
              <Image
                src="/brand/aerl-logo.png"
                alt="AERL logo"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
            <div>
              <span className="block font-heading text-lg font-bold tracking-[0.22em] text-foreground">
                {siteConfig.shortName}
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Applied Engineering Research Lab
              </span>
            </div>
          </Link>
          <nav className="flex items-center space-x-2 text-sm font-medium">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 transition-colors transition-shadow",
                  isActive(item.href)
                    ? "bg-[var(--nav-active)] text-[var(--nav-active-foreground)] shadow-sm"
                    : "text-foreground/80 hover:bg-[var(--nav-hover)] hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-base text-foreground transition-colors hover:bg-[var(--nav-hover)] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/brand/aerl-logo.png"
                alt="AERL logo"
                width={32}
                height={32}
                className="rounded-full border border-border/70 bg-card/70 p-1"
              />
              <div>
                <span className="block font-heading text-base font-bold tracking-[0.2em]">{siteConfig.shortName}</span>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  De Anza College
                </span>
              </div>
            </Link>
            <div className="my-4 flex flex-col space-y-2 pb-10 pl-6">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-[var(--nav-active)] text-[var(--nav-active-foreground)]"
                      : "text-foreground/80 hover:bg-[var(--nav-hover)] hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex w-full flex-1 items-center md:hidden">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/aerl-logo.png"
                alt="AERL logo"
                width={32}
                height={32}
                className="rounded-full border border-border/85 bg-card/90 p-1"
              />
              <span className="font-heading text-base font-bold tracking-[0.2em] text-foreground">
                {siteConfig.shortName}
              </span>
            </Link>
          </div>
          <div className="hidden w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
