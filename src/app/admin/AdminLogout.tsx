"use client";
import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      Sign out
    </button>
  );
}
