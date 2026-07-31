"use client";

import Link from "next/link";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { useDashboard } from "@/hooks/useDashboard";

export default function CitizenDashboard() {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-medium">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="space-y-8 p-8">
          {/* Welcome */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h1 className="text-3xl font-bold">
              Welcome, Citizen 👋
            </h1>

            <p className="mt-2 text-gray-500">
              Submit and track your Birth and Death Certificate
              applications from one place.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Total Applications
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {dashboard.stats.total}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Pending</p>

              <h2 className="mt-3 text-3xl font-bold text-yellow-600">
                {dashboard.stats.pending}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Approved</p>

              <h2 className="mt-3 text-3xl font-bold text-green-600">
                {dashboard.stats.approved}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">Rejected</p>

              <h2 className="mt-3 text-3xl font-bold text-red-600">
                {dashboard.stats.rejected}
              </h2>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold">
                Apply for Birth Certificate
              </h2>

              <p className="mt-2 text-gray-500">
                Register a new birth application.
              </p>

              <Link
                href="/citizen/applications/new?type=Birth"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                Apply
              </Link>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold">
                Apply for Death Certificate
              </h2>

              <p className="mt-2 text-gray-500">
                Register a new death application.
              </p>

              <Link
                href="/citizen/applications/new?type=Death"
                className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
              >
                Apply
              </Link>
            </div>
          </section>

          {/* Recent Applications */}
          <section className="rounded-xl bg-white p-6 shadow">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Recent Applications
              </h2>

              <Link
                href="/citizen/applications"
                className="text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">
                    Application No.
                  </th>

                  <th className="py-3 text-left">
                    Type
                  </th>

                  <th className="py-3 text-left">
                    Status
                  </th>

                  <th className="py-3 text-left">
                    Stage
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentApplications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-gray-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  dashboard.recentApplications.map(
                    (application) => (
                      <tr
                        key={application.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-4">
                          {application.application_number}
                        </td>

                        <td>
                          {application.application_type}
                        </td>

                        <td>{application.status}</td>

                        <td>
                          {application.current_stage}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}