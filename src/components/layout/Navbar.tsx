"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-18 max-w-7xl items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex md:items-center">
          <Link href="/" className="mr-8 flex items-center gap-3">
            <div className="rounded-full border border-border/70 bg-card/75 p-1.5 shadow-sm">
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
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  isActive(item.href) ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger 
            render={
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              />
            }
          >
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
            <div className="my-4 flex flex-col space-y-3 pb-10 pl-6">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium",
                    isActive(item.href) ? "text-foreground" : "text-muted-foreground"
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
                className="rounded-full border border-border/70 bg-card/70 p-1"
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
