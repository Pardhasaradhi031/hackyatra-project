"use client";

import { useEffect, useState } from "react";

import { DashboardResponse } from "@/types/dashboard";
import { getDashboard } from "@/services/dashboard.service";

export function useDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();

        setDashboard(data);
      } catch (error) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
  };
}