import Image from "next/image"
import { siteConfig } from "@/config/site"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/45 py-8 md:py-10">
      <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-border/70 bg-background/50 p-1.5">
            <Image
              src="/brand/aerl-logo.png"
              alt="AERL logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-foreground">{siteConfig.shortName}</p>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Student-led engineering research at De Anza College. One public site, one documentation hub, and work built to survive handoff.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/documentation" className="hover:text-foreground">
            Documentation
          </Link>
          <Link href="/updates" className="hover:text-foreground">
            Updates
          </Link>
          <Link href="/join" className="hover:text-foreground">
            Join / Contact
          </Link>
          <a href={siteConfig.links.email} className="hover:text-foreground">
            Email
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
