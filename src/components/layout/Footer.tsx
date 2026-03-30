import { siteConfig } from "@/config/site"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 max-w-7xl mx-auto">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by the members of {" "}
          <Link
            href="/"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.name}
          </Link>
          .
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Link href="/contact" className="hover:underline underline-offset-4">
            Contact
          </Link>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
