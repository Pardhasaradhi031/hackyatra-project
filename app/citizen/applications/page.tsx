"use client";

import Link from "next/link";
import { useApplications } from "@/hooks/useApplications";

export default function MyApplications() {
  const { applications, loading, error } = useApplications();

  function getStatusColor(status: string) {
    switch (status) {
      case "Submitted":
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Under Verification":
        return "bg-blue-100 text-blue-700";

      case "Approved":
        return "bg-green-100 text-green-700";

      case "Certificate Issued":
        return "bg-emerald-100 text-emerald-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Applications
          </h1>

          <p className="text-gray-500">
            View all your submitted applications
          </p>
        </div>

        <Link
          href="/citizen/dashboard"
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          New Application
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by Application No."
          className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select className="rounded-lg border px-4 py-2">
          <option>Filter by Status</option>
          <option>Submitted</option>
          <option>Under Verification</option>
          <option>Approved</option>
          <option>Certificate Issued</option>
          <option>Rejected</option>
        </select>

        <select className="rounded-lg border px-4 py-2">
          <option>Filter by Type</option>
          <option>Birth</option>
          <option>Death</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">
                Application No.
              </th>

              <th className="px-4 py-3 text-left">
                Type
              </th>

              <th className="px-4 py-3 text-left">
                Submitted Date
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    {app.application_number}
                  </td>

                  <td className="px-4 py-4">
                    {app.application_type}
                  </td>

                  <td className="px-4 py-4">
                    {app.created_at
                      ? new Date(app.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <Link
                      href={`/citizen/applications/${app.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}