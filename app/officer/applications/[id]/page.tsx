"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type TimelineItem = {
  stage: string;
  completed: boolean;
  completedAt?: string;
};

type SLA = {
  daysRemaining: number;
  overdue: boolean;
};

type Application = {
  id: string;

  application_number: string;
  application_type: "Birth" | "Death";

  child_name?: string;
  father_name?: string;
  mother_name?: string;
  hospital_name?: string;
  date_of_birth?: string;

  deceased_name?: string;
  date_of_death?: string;
  place_of_death?: string;
  cause_of_death?: string;
  address?: string;

  status: string;
  current_stage: string;

  submitted: string;

  sla: SLA;

  timeline: TimelineItem[];
};

export default function OfficerApplicationPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    loadApplication();
  }, []);

  async function loadApplication() {
    try {
      const response = await fetch(`/api/officer/applications/${id}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        router.push("/officer/applications");
        return;
      }

      setApplication(data.application);
    } catch (error) {
      console.error(error);
      alert("Failed to load application.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: "Approved" | "Rejected") {
    const confirmed = confirm(
      `Are you sure you want to ${status.toLowerCase()} this application?`
    );

    if (!confirmed) return;

    const response = await fetch(`/api/officer/applications/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert(data.message);
    loadApplication();
  }

  function badgeColor(status: string) {
    switch (status) {
      case "Approved":
        return "bg-green-600";
      case "Rejected":
        return "bg-red-600";
      case "Verified":
        return "bg-blue-600";
      case "Under Verification":
        return "bg-yellow-500";
      default:
        return "bg-gray-600";
    }
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  if (!application) {
    return <main className="p-8">Application not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {application.application_number}
          </h1>
          <p className="mt-2 text-gray-500">
            {application.application_type} Certificate
          </p>
        </div>

        <span
          className={`rounded-full px-5 py-2 text-white ${badgeColor(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Application Details
          </h2>

          {application.application_type === "Birth" ? (
            <div className="space-y-3">
              <p>
                <strong>Child Name:</strong> {application.child_name}
              </p>
              <p>
                <strong>Father:</strong> {application.father_name}
              </p>
              <p>
                <strong>Mother:</strong> {application.mother_name}
              </p>
              <p>
                <strong>Hospital:</strong> {application.hospital_name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {application.date_of_birth}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {application.deceased_name}
              </p>
              <p>
                <strong>Date:</strong> {application.date_of_death}
              </p>
              <p>
                <strong>Place:</strong> {application.place_of_death}
              </p>
              <p>
                <strong>Cause:</strong> {application.cause_of_death}
              </p>
              <p>
                <strong>Address:</strong> {application.address}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">SLA</h2>

            <p>
              <strong>Submitted:</strong> {application.submitted}
            </p>

            <p className="mt-2">
              <strong>Days Remaining:</strong>{" "}
              {application.sla.daysRemaining}
            </p>

            <p
              className={`mt-2 font-semibold ${application.sla.overdue ? "text-red-600" : "text-green-600"
                }`}
            >
              {application.sla.overdue ? "SLA Overdue" : "Within SLA"}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Workflow Timeline
            </h2>

            <div className="space-y-4">
              {application.timeline.map((step) => (
                <div key={step.stage} className="flex items-start gap-4">
                  <div
                    className={`mt-1 h-4 w-4 rounded-full ${step.completed ? "bg-green-600" : "bg-gray-300"
                      }`}
                  />
                  <div>
                    <p className="font-medium">{step.stage}</p>
                    {step.completed && (
                      <p className="text-sm text-gray-500">
                        {step.completedAt}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => router.push("/officer/applications")}
          className="rounded border px-5 py-2"
        >
          Back
        </button>

        {application.status !== "Rejected" &&
          application.status !== "Approved" && (
            <>
              <button
                onClick={() => updateStatus("Rejected")}
                className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
              >
                Reject
              </button>

              <button
                onClick={() => updateStatus("Approved")}
                className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                Approve
              </button>
            </>
          )}
      </div>
    </main>
  );
}