"use client";

import { useEffect, useState } from "react";

import { getApplications } from "@/services/application.service";

interface Application {
  id: string;
  application_number: string;
  application_type: string;
  status: string;
  current_stage: string;
  created_at: string;
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await getApplications();

        if (response.success) {
          setApplications(response.applications);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  return {
    applications,
    loading,
    error,
  };
}