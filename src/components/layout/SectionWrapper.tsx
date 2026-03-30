import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
  return (
    <section
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24", className)}
      {...props}
    >
      {children}
    </section>
  )
}
