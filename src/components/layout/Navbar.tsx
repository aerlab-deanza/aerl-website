"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Close on route change
  React.useEffect(() => { setIsOpen(false) }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))

  return (
    <>
      {/* ── Desktop + mobile trigger bar ──────────────────────────────────── */}
      <header className="fixed top-0 z-40 w-full flex justify-center pointer-events-none transition-all duration-500">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-1000 ease-in-out overflow-hidden",
            isScrolled
              ? "mt-4 h-14 w-[95%] max-w-5xl rounded-full border border-white/20 bg-gradient-to-r from-[#f5f7f3]/95 to-[#e6ece1]/95 px-3 md:px-5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl text-black"
              : "mt-4 h-14 w-full max-w-7xl px-4 md:px-8 bg-transparent text-foreground"
          )}
        >
          {/* Logo */}
          <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="flex items-center gap-3 group">
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
              <span className={cn(
                "block font-heading font-bold tracking-[0.22em] transition-colors duration-700 ease-in-out",
                isScrolled ? "text-sm text-[#0a2e15]" : "text-lg text-foreground"
              )}>
                {siteConfig.shortName}
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center justify-center space-x-1 font-medium">
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

          {/* Desktop Join + mobile hamburger */}
          <div className="flex flex-1 items-center justify-end space-x-4">
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

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none md:hidden",
                isScrolled ? "text-[#0a2e15] hover:bg-black/5" : "text-foreground hover:bg-[var(--nav-hover)]"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-50 md:hidden"
              style={{ backgroundColor: "rgba(5,5,16,0.96)" }}
            />

            {/* Panel — slides up from bottom edge */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: "6%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "4%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex flex-col md:hidden overflow-hidden"
            >
              {/* Atmospheric layers */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                {/* Teal radial — top right */}
                <div
                  className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(11,78,87,0.22) 0%, transparent 65%)" }}
                />
                {/* Teal radial — bottom left */}
                <div
                  className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(11,78,87,0.12) 0%, transparent 65%)" }}
                />
                {/* Teal grid — same language as aerl-grid-panel */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(11,78,87,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(11,78,87,0.12) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.6) 70%, transparent 100%)",
                  }}
                />
                {/* Top edge accent */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0b4e57]/50 to-transparent" />
                {/* Bottom edge accent */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0b4e57]/25 to-transparent" />
              </div>

              {/* ── Header row ──────────────────────────────────────────────── */}
              <div className="relative flex items-center justify-between px-6 pt-6 pb-5 shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="rounded-full border border-border/50 bg-card/50 p-1.5 backdrop-blur-sm">
                    <Image
                      src="/brand/aerl-logo.png"
                      alt="AERL"
                      width={26}
                      height={26}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <span className="block font-heading text-sm font-bold tracking-[0.25em] text-foreground">
                      {siteConfig.shortName}
                    </span>
                    <span className="block font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground/50">
                      Applied Engineering Research Lab
                    </span>
                  </div>
                </Link>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.2, ease: "easeOut" }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-muted/30 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground hover:border-border/70 active:scale-95"
                >
                  <X className="h-[18px] w-[18px]" />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent shrink-0" />

              {/* ── Nav items ───────────────────────────────────────────────── */}
              <nav className="relative flex-1 px-5 pt-6 pb-4 overflow-y-auto">
                <ul className="space-y-1.5">
                  {siteConfig.mainNav.map((item, i) => {
                    const active = isActive(item.href)
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + i * 0.055,
                          duration: 0.38,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group relative flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 overflow-hidden",
                            active
                              ? "bg-[#0b4e57]/12 border border-[#0b4e57]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                              : "border border-transparent hover:bg-card/50 hover:border-border/30"
                          )}
                          style={active ? { backgroundColor: "rgba(11,78,87,0.12)" } : undefined}
                        >
                          {/* Active left bar */}
                          {active && (
                            <motion.div
                              layoutId="activeBar"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full"
                              style={{ backgroundColor: "#0b4e57" }}
                            />
                          )}

                          {/* Grid shimmer on hover — only non-active */}
                          {!active && (
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                              style={{
                                backgroundImage:
                                  "linear-gradient(rgba(11,78,87,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(11,78,87,0.08) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                              }}
                            />
                          )}

                          {/* Index number */}
                          <span
                            className={cn(
                              "font-mono text-[11px] font-bold tabular-nums w-6 shrink-0 transition-colors duration-200",
                              active
                                ? "text-[#0b4e57]"
                                : "text-muted-foreground/25 group-hover:text-muted-foreground/50"
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* Slash separator */}
                          <span
                            className={cn(
                              "font-mono text-[11px] shrink-0 transition-colors duration-200",
                              active
                                ? "text-[#0b4e57]/60"
                                : "text-muted-foreground/15 group-hover:text-muted-foreground/30"
                            )}
                          >
                            /
                          </span>

                          {/* Title */}
                          <span
                            className={cn(
                              "font-heading text-[1.35rem] font-bold tracking-tight flex-1 leading-none transition-colors duration-200",
                              active
                                ? "text-foreground"
                                : "text-foreground/65 group-hover:text-foreground/90"
                            )}
                          >
                            {item.title}
                          </span>

                          {/* Arrow */}
                          <ArrowUpRight
                            className={cn(
                              "h-4 w-4 shrink-0 transition-all duration-200",
                              active
                                ? "text-[#0b4e57] opacity-80"
                                : "text-muted-foreground/15 group-hover:text-muted-foreground/50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            )}
                          />
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* ── Join CTA ─────────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative px-5 pb-4 shrink-0"
              >
                <Link
                  href="/join"
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center justify-between w-full rounded-2xl overflow-hidden px-5 py-4 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, rgba(11,78,87,0.18) 0%, rgba(11,78,87,0.08) 100%)",
                    border: "1px solid rgba(11,78,87,0.35)",
                  }}
                >
                  {/* Hover teal wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(11,78,87,0.28) 0%, rgba(11,78,87,0.14) 100%)",
                    }}
                  />

                  <div className="relative">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.24em] mb-1"
                      style={{ color: "rgba(11,78,87,0.75)" }}>
                      Recruiting now
                    </span>
                    <span className="block font-heading text-lg font-bold text-foreground leading-none">
                      Join AERL
                    </span>
                  </div>

                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105 shrink-0"
                    style={{ backgroundColor: "#0b4e57" }}
                  >
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
              </motion.div>

              {/* ── Status bar ───────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="relative border-t shrink-0 px-6 py-3.5"
                style={{ borderColor: "rgba(30,41,59,0.6)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-muted-foreground/30">
                    AERL &nbsp;·&nbsp; Cycle&nbsp;1&nbsp;Active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "#0b4e57" }}
                    />
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(11,78,87,0.7)" }}>
                      Online
                    </span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
