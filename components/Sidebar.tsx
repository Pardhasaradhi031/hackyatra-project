"use client";

import Link from "next/link";
import { FilePlus2, FolderOpen } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Dashboard
        </h1>
      </div>

      <nav className="mt-6 px-4 space-y-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <FilePlus2 size={20} />
          New Application
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <FolderOpen size={20} />
          My Applications
        </Link>
      </nav>
    </aside>
  );
}