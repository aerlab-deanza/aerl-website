import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

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
          <Button render={<Link href={buttonLink} />} size="lg" className="h-12 px-8 text-base">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
