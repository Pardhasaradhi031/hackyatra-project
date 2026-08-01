"use client";

import Link from "next/link";

export default function OfficerDashboard() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Officer Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the Municipal Officer Portal.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/officer/applications"
          className="rounded-xl border bg-white p-6 shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            Applications
          </h2>

          <p className="mt-2 text-gray-500">
            View and verify applications.
          </p>
        </Link>

        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">
            Certificates
          </h2>

          <p className="mt-2 text-gray-500">
            Issued certificates will appear here.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">
            Profile
          </h2>

          <p className="mt-2 text-gray-500">
            Officer account information.
          </p>
        </div>
      </div>
    </main>
  );
}