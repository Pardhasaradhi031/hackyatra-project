"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Application = {
  id: string;
  application_number: string;
  application_type: "Birth" | "Death";
  status: string;
  current_stage: string;
  created_at: string;
};

export default function OfficerApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);


  async function loadApplications() {
    try {
      const response = await fetch(
        "/api/officer/applications",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setApplications(data.applications);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Ward Applications
        </h1>

        <p className="mt-2 text-gray-500">
          Applications assigned to your ward.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">
                Application No.
              </th>

              <th className="border p-3 text-left">
                Type
              </th>

              <th className="border p-3 text-left">
                Status
              </th>

              <th className="border p-3 text-left">
                Current Stage
              </th>

              <th className="border p-3 text-left">
                Submitted
              </th>

              <th className="border p-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    {application.application_number}
                  </td>

                  <td className="border p-3">
                    {application.application_type}
                  </td>

                  <td className="border p-3">
                    {application.status}
                  </td>

                  <td className="border p-3">
                    {application.current_stage}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      application.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-3 text-center">
                    <Link
                      href={`/officer/applications/${application.id}`}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
    </main>
  );
}