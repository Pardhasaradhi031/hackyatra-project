"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/admin.service";
import { DashboardStats } from "@/types/admin";

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6">
        Failed to load dashboard.
      </div>
    );
  }

  const cards = [
    {
      title: "Citizens",
      value: stats.citizens,
    },
    {
      title: "Officers",
      value: stats.officers,
    },
    {
      title: "Applications",
      value: stats.applications,
    },
    {
      title: "Pending",
      value: stats.pending,
    },
    {
      title: "Approved",
      value: stats.approved,
    },
    {
      title: "Rejected",
      value: stats.rejected,
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow"
          >
            <h2 className="text-gray-500">
              {card.title}
            </h2>

            <p className="mt-3 text-4xl font-bold">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}