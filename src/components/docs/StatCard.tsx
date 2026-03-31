interface StatCardProps {
  label: string;
  value: string;
  description: string;
}

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-5">
      <p className="aerl-kicker">{label}</p>
      <p className="mt-3 font-heading text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
