import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/config/site"
import { Github, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="Contact"
          description="Reach out for partnership inquiries, sponsorship, or to connect with the lab."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-12 md:grid-cols-2">

          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Get in Touch</h3>
              <a href="mailto:aerl@deanza.edu" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span>aerl@deanza.edu</span>
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">GitHub</h3>
              <div className="flex flex-col gap-3 text-muted-foreground">
                <a href={siteConfig.links.github} className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" /> aerl-deanza
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Send a Message</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@domain.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                {/* Note: In a real app we'd use a Textarea from shadcn, but we'll use a basic HTML textarea wrapped in shadcn styles for scaffolding */}
                <textarea 
                  id="message" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="How can we help?"
                />
              </div>
              <Button type="button" className="w-full">Send Message</Button>
            </form>
          </div>

        </div>
      </SectionWrapper>
    </>
  )
}
