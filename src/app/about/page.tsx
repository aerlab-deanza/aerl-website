import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="About AERL"
          description="A student engineering lab at De Anza College. We build real systems, document them well, and leave behind work the next team can actually use."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="prose prose-neutral dark:prose-invert max-w-4xl prose-headings:tracking-tight prose-a:text-primary">

          <h2>What AERL Is</h2>
          <p>
            AERL is a student-run engineering lab at De Anza College. We&apos;re not a traditional club. We don&apos;t do demos at fairs, collect dues, and call it a year. We scope a project, divide it into real engineering work, and try to actually finish it — hardware, simulation, documentation, and handoff included.
          </p>
          <p>
            Our current direction is a quadcopter build from the ground up. That means two active efforts running in parallel: a physical drone build track and a simulation and controls track.
          </p>

          <h2>Why We Exist</h2>
          <p>
            Most engineering students at community college don&apos;t have access to a serious technical environment between classes. Coursework teaches concepts. Clubs do light projects. Industry internships are competitive and often narrow.
          </p>
          <p>
            AERL is trying to be the middle option: a place where you can do real engineering work alongside other students who take it seriously. The scale is small. The standards are high. The bar for joining isn&apos;t credentials — it&apos;s commitment.
          </p>

          <h2>How We Work</h2>
          <p>
            We run on quarterly build cycles. Right now we&apos;re in Cycle 1 — a full-quarter effort to build and document a physical quadcopter while developing a simulation environment to validate flight control logic before it ever touches hardware.
          </p>
          <p>
            The goal isn&apos;t just a drone that hovers. It&apos;s a drone that hovers <em>and</em> a GitHub repository and documentation set that a new team can clone, understand, and continue from. That distinction is what separates us from a generic club project.
          </p>

          <h2>Engineering Culture</h2>
          <p>We have a few working principles that aren&apos;t optional:</p>
          <ul>
            <li>
              <strong>Write things down.</strong> If you tuned a PID parameter, document why. If something didn&apos;t work, log it. Institutional memory dies when people graduate and leave nothing behind. We&apos;re explicitly building against that.
            </li>
            <li>
              <strong>Understand before you ship.</strong> We&apos;d rather move slower and understand something deeply than copy a solution you can&apos;t explain. First principles, always — but also with scope and pragmatism.
            </li>
            <li>
              <strong>Design for handoff.</strong> Every cycle ends with a release: tagged code, updated documentation, a handoff summary. We design the work so the next team doesn&apos;t start from scratch.
            </li>
            <li>
              <strong>Contribution areas, not hard silos.</strong> We have five areas where members contribute: controls & dynamics, simulation & software, electronics & power, hardware & fabrication, and documentation & operations. These are working groups — people often span more than one.
            </li>
          </ul>

          <h2>What This Isn&apos;t</h2>
          <p>
            This isn&apos;t an aerospace company, a formal research lab, or a club with a polished legacy. We&apos;re early. We&apos;re building the culture and the systems simultaneously. If you want to join something that already has all the answers, AERL is probably not the right fit. If you want to help build whatever this becomes — read the roadmap and fill out the form.
          </p>

          <div className="not-prose mt-8 flex gap-4">
            <Link
              href="/roadmap"
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              See the current build cycle <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              Join AERL <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
