import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { cn } from "@/lib/utils"

const ctaLinkClasses =
  "inline-flex h-12 items-center justify-center rounded-lg border border-transparent bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/85"

interface CTAProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function CTA({ title, description, buttonText, buttonLink }: CTAProps) {
  return (
    <SectionWrapper className="py-16 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl bg-primary/5 px-6 py-12 text-center md:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-[600px] text-muted-foreground md:text-lg">
          {description}
        </p>
        <div className="pt-4">
          <Link href={buttonLink} className={cn(ctaLinkClasses)}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
