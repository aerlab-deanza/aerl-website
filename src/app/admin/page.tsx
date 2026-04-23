import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAnalytics, getDailyStats } from "@/lib/analytics";
import { getStats } from "@/lib/stats";
import { getRoadmapTracks } from "@/lib/roadmap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AdminLogout } from "./AdminLogout";
import { StatsEditor } from "./StatsEditor";
import { RoadmapEditor } from "./RoadmapEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin_auth")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (adminAuth !== adminPassword) redirect("/admin/login");

  const summary = getAnalytics();
  const daily = getDailyStats(14);
  const stats = getStats();
  const roadmapTracks = getRoadmapTracks();

  const today = new Date().toISOString().split("T")[0];
  const todaySessions = summary.days[today]?.sessions ?? {};
  const todayViews = Object.values(todaySessions).reduce((sum, paths) => sum + paths.length, 0);
  const todayUsers = Object.keys(todaySessions).length;
  const maxViews = Math.max(...daily.map((d) => d.views), 1);

  return (
    <SectionWrapper className="py-12">
      {/* Page header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">
            Admin
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time visitor metrics for aerl.deanza.edu
          </p>
        </div>
        <AdminLogout />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        <StatCard label="Total page views" value={summary.totalViews} />
        <StatCard label="Total unique visitors" value={summary.totalUniqueUsers} />
        <StatCard label="Views today" value={todayViews} accent />
        <StatCard label="Visitors today" value={todayUsers} accent />
      </div>

      {/* Bar chart */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
          Page views — last 14 days
        </p>
        <div className="flex items-end gap-1.5 h-40">
          {daily.map((d) => {
            const heightPct = (d.views / maxViews) * 100;
            const isToday = d.date === today;
            return (
              <div
                key={d.date}
                className="flex-1 flex flex-col items-center gap-1 group relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-secondary border border-border rounded-lg px-2.5 py-1.5 text-center whitespace-nowrap">
                    <p className="text-xs text-foreground font-medium">
                      {d.views} views
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {d.uniqueUsers} visitors
                    </p>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full flex flex-col justify-end" style={{ height: "136px" }}>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      isToday
                        ? "bg-primary"
                        : "bg-secondary group-hover:bg-muted-foreground/30"
                    }`}
                    style={{ height: `${Math.max(heightPct, 2)}%` }}
                  />
                </div>

                {/* Date label */}
                <span className="text-[9px] text-muted-foreground whitespace-nowrap hidden sm:block">
                  {formatShortDate(d.date)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm bg-primary" />
            Today
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm bg-secondary" />
            Previous days
          </span>
        </div>
      </div>

      {/* Daily table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Daily breakdown
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground">
                Page views
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground">
                Unique visitors
              </th>
            </tr>
          </thead>
          <tbody>
            {[...daily].reverse().map((d, i) => (
              <tr
                key={d.date}
                className={`border-b border-border last:border-0 ${
                  i % 2 !== 0 ? "bg-muted/10" : ""
                } ${d.date === today ? "bg-primary/5" : ""}`}
              >
                <td className="px-6 py-3 text-foreground tabular-nums">
                  {d.date}
                  {d.date === today && (
                    <span className="ml-2 text-[10px] font-medium text-primary uppercase tracking-wider">
                      today
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-right text-foreground tabular-nums">
                  {d.views}
                </td>
                <td className="px-6 py-3 text-right text-foreground tabular-nums">
                  {d.uniqueUsers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats editor */}
      <div className="mt-4">
        <StatsEditor initial={stats} />
      </div>

      {/* Roadmap editor */}
      <div className="mt-4">
        <RoadmapEditor initial={roadmapTracks} />
      </div>
    </SectionWrapper>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "border-primary/40 bg-primary/5" : "border-border bg-card"
      }`}
    >
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl font-semibold text-foreground tabular-nums">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function formatShortDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}
