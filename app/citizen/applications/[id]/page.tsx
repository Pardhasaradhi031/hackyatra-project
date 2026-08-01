"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ApplicationDetails } from "@/types/application";

export default function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [application, setApplication] =
    useState<ApplicationDetails | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchApplication() {
      try {
        const response = await fetch(`/api/applications/${id}`, {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setApplication(data.application);
        } else {
          setApplication(null);
        }
      } catch (error) {
        console.error(
          "Failed to fetch application",
          error
        );
        setApplication(null);
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex h-screen items-center justify-center">
        Application not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">
        Application Details
      </h1>

      {/* Basic Details */}
      <div className="rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Application Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <p>
            <span className="font-semibold">
              Application Number:
            </span>{" "}
            {application.application_number}
          </p>

          <p>
            <span className="font-semibold">
              Application Type:
            </span>{" "}
            {application.application_type}
          </p>

          <p>
            <span className="font-semibold">
              Status:
            </span>{" "}
            {application.status}
          </p>

          <p>
            <span className="font-semibold">
              Current Stage:
            </span>{" "}
            {application.current_stage}
          </p>

          <p>
            <span className="font-semibold">
              Submitted:
            </span>{" "}
            {application.submitted}
          </p>
        </div>
      </div>

      {/* Birth Details */}
      {application.application_type === "Birth" && (
        <div className="rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Birth Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <p>
              <span className="font-semibold">
                Child Name:
              </span>{" "}
              {application.child_name}
            </p>

            <p>
              <span className="font-semibold">
                Date of Birth:
              </span>{" "}
              {application.date_of_birth}
            </p>

            <p>
              <span className="font-semibold">
                Father Name:
              </span>{" "}
              {application.father_name}
            </p>

            <p>
              <span className="font-semibold">
                Mother Name:
              </span>{" "}
              {application.mother_name}
            </p>

            <p className="md:col-span-2">
              <span className="font-semibold">
                Hospital Name:
              </span>{" "}
              {application.hospital_name}
            </p>
          </div>
        </div>
      )}

      {/* Death Details */}
      {application.application_type === "Death" && (
        <div className="rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Death Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <p>
              <span className="font-semibold">
                Deceased Name:
              </span>{" "}
              {application.deceased_name}
            </p>

            <p>
              <span className="font-semibold">
                Date of Death:
              </span>{" "}
              {application.date_of_death}
            </p>

            <p>
              <span className="font-semibold">
                Place of Death:
              </span>{" "}
              {application.place_of_death}
            </p>

            <p>
              <span className="font-semibold">
                Cause of Death:
              </span>{" "}
              {application.cause_of_death}
            </p>

            <p className="md:col-span-2">
              <span className="font-semibold">
                Address:
              </span>{" "}
              {application.address}
            </p>
          </div>
        </div>
      )}

      {/* SLA Tracking */}
      <div className="rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          SLA Tracking
        </h2>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">
              Deadline:
            </span>{" "}
            {application.sla.deadline}
          </p>

          <p>
            <span className="font-semibold">
              Remaining Days:
            </span>{" "}
            {application.sla.remainingDays}
          </p>

          <p>
            <span className="font-semibold">
              Progress:
            </span>{" "}
            {application.sla.progressPercent}%
          </p>

          <p
            className={
              application.sla.isOverdue
                ? "font-semibold text-red-600"
                : "font-semibold text-green-600"
            }
          >
            {application.sla.isOverdue
              ? "Overdue"
              : "Within SLA"}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Processing Timeline
        </h2>

        <div className="space-y-4">
          {application.timeline.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-green-600 pl-4"
            >
              <p className="font-medium">
                {item.stage}
              </p>

              <p className="text-sm text-gray-500">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}