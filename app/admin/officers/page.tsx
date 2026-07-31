"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Officer = {
  id: string;
  name: string;
  email: string;
  ward_number: number;
  ward_name: string;
};

export default function OfficersPage() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);


  async function loadOfficers() {
    try {
      const response = await fetch("/api/admin/officers", {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setOfficers(data.officers);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load officers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOfficers();
  }, []);

  async function deleteOfficer(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this officer?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/admin/officers", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setOfficers((previous) =>
        previous.filter((officer) => officer.id !== id)
      );

      alert("Officer deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete officer.");
    }
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Officers
        </h1>

        <Link
          href="/admin/officers/add"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Add Officer
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">
                Name
              </th>

              <th className="border p-3 text-left">
                Email
              </th>

              <th className="border p-3 text-left">
                Ward
              </th>

              <th className="border p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : officers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No officers found.
                </td>
              </tr>
            ) : (
              officers.map((officer) => (
                <tr
                  key={officer.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    {officer.name}
                  </td>

                  <td className="border p-3">
                    {officer.email}
                  </td>

                  <td className="border p-3">
                    Ward {officer.ward_number} -{" "}
                    {officer.ward_name}
                  </td>

                  <td className="border p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/officers/${officer.id}`}
                        className="rounded bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteOfficer(officer.id)}
                        className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
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