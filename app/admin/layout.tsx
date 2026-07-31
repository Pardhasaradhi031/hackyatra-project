import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-6">
          <h1 className="text-2xl font-bold">
            Admin Panel
          </h1>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="rounded p-3 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/officers"
            className="rounded p-3 hover:bg-slate-800"
          >
            Officers
          </Link>

          <Link
            href="/admin/applications"
            className="rounded p-3 hover:bg-slate-800"
          >
            Applications
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}