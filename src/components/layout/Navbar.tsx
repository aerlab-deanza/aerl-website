"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))

  return (
    <header className="fixed top-0 z-50 w-full flex justify-center pointer-events-none transition-all duration-500">
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between transition-all duration-1000 ease-in-out overflow-hidden",
          isScrolled
            ? "mt-4 h-14 w-[95%] max-w-5xl rounded-full border border-white/20 bg-gradient-to-r from-[#f5f7f3]/95 to-[#e6ece1]/95 px-3 md:px-5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl text-black"
            : "mt-4 h-14 w-full max-w-7xl px-4 md:px-8 bg-transparent text-foreground"
        )}
      >
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center gap-3 group">
            <div className={cn(
              "rounded-full p-1.5 transition-colors duration-700 ease-in-out",
              isScrolled ? "bg-white border-white border shadow-sm" : "border border-transparent bg-transparent"
            )}>
              <Image
                src="/brand/aerl-logo.png"
                alt="AERL logo"
                width={isScrolled ? 28 : 36}
                height={isScrolled ? 28 : 36}
                className="rounded-full transition-all duration-700 ease-in-out"
              />
            </div>
            <div>
              <span className={cn(
                "block font-heading font-bold tracking-[0.22em] transition-colors duration-700 ease-in-out",
                isScrolled ? "text-sm text-[#0a2e15]" : "text-lg text-foreground"
              )}>
                {siteConfig.shortName}
              </span>
              <span className={cn(
                "block font-medium uppercase tracking-[0.24em] transition-colors duration-700 ease-in-out",
                isScrolled ? "text-[8px] text-[#0a2e15]/70 hidden sm:block" : "text-[10px] text-muted-foreground"
              )}>
                Applied Engineering Research Lab
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 font-medium">
            {siteConfig.mainNav.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-all duration-500 ease-in-out",
                    isScrolled
                      ? active ? "bg-[#0b4e57]/10 text-[#0b4e57] font-bold" : "text-[#0a2e15]/70 hover:bg-[#0b4e57]/5 hover:text-[#0b4e57]"
                      : active ? "bg-[var(--nav-active)] text-[var(--nav-active-foreground)] shadow-sm" : "text-foreground/80 hover:bg-[var(--nav-hover)] hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/join"
            className={cn(
              "hidden md:inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-500 ease-in-out shadow-sm",
              isScrolled
                ? "h-9 px-5 bg-[#142e18] text-white hover:bg-[#0c1d0f] hover:shadow-md hover:-translate-y-0.5"
                : "h-9 px-5 bg-card text-foreground border border-border/40 hover:bg-card/80 hover:-translate-y-0.5"
            )}
          >
            Join AERL
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-base transition-colors focus-visible:outline-none md:hidden",
              isScrolled ? "text-[#0a2e15] hover:bg-black/5" : "text-foreground hover:bg-[var(--nav-hover)]"
            )}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 border-r-border/30 bg-background/95 backdrop-blur-xl">
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
              <div className="my-6 flex flex-col space-y-2 pb-10 pl-6 pr-6">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2.5 font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-[var(--nav-active)] text-[var(--nav-active-foreground)]"
                        : "text-foreground/80 hover:bg-[var(--nav-hover)] hover:text-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <Link
                  href="/join"
                  className="mt-4 rounded-lg bg-primary px-3 py-2.5 text-center font-bold text-white transition-colors hover:bg-primary/90"
                  onClick={() => setIsOpen(false)}
                >
                  Join AERL
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

