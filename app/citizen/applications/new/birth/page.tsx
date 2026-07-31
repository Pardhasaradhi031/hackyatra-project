"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createApplication } from "@/services/application.service";

export default function BirthApplicationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [childName, setChildName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [hospitalName, setHospitalName] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await createApplication({
        applicationType: "Birth",

        childName,
        dateOfBirth: dateOfBirth || undefined,
        fatherName,
        motherName,
        hospitalName,
      });

      if (response.success) {
        alert("Birth application submitted successfully.");

        router.push("/citizen/applications");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold">
          Birth Registration
        </h1>

        <p className="mt-2 text-gray-500">
          Fill in the birth registration details below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block font-medium">
              Child Name
            </label>

            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter child's name"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Date of Birth
            </label>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Father&apos;s Name
            </label>

            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="Enter father's name"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Mother&apos;s Name
            </label>

            <input
              type="text"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="Enter mother's name"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Hospital Name
            </label>

            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              placeholder="Hospital where birth occurred"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/citizen/applications")}
              className="rounded-lg border px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}