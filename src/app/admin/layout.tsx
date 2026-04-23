// Admin routes inherit the root layout (Navbar + Footer) intentionally.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
