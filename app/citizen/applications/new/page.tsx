"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createApplication } from "@/services/application.service";

export default function Home() {
  const [applicationType, setApplicationType] = useState("birth");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // Birth
  const [childName, setChildName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [hospitalName, setHospitalName] = useState("");

  // Death
  const [deceasedName, setDeceasedName] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [placeOfDeath, setPlaceOfDeath] = useState("");
  const [causeOfDeath, setCauseOfDeath] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await createApplication({
        applicationType:
          applicationType === "birth"
            ? "Birth"
            : "Death",

        childName: childName || undefined,
        fatherName: fatherName || undefined,
        motherName: motherName || undefined,
        hospitalName: hospitalName || undefined,
        dateOfBirth: dateOfBirth || undefined,

        deceasedName: deceasedName || undefined,
        dateOfDeath: dateOfDeath || undefined,
        placeOfDeath: placeOfDeath || undefined,
        causeOfDeath: causeOfDeath || undefined,
        address: address || undefined,
      });

      if (response.success) {
        alert("Application submitted successfully.");
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
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold">New Application</h1>
        <p className="text-gray-500 mt-2">
          Select the application type and fill in the required details.
        </p>

        {/* Application Type */}
        <div className="mt-8">
          <label className="block font-semibold mb-3">
            Application Type
          </label>

          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="birth"
                checked={applicationType === "birth"}
                onChange={(e) => setApplicationType(e.target.value)}
              />
              Birth Registration
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="death"
                checked={applicationType === "death"}
                onChange={(e) => setApplicationType(e.target.value)}
              />
              Death Registration
            </label>
          </div>
        </div>

        <form className="grid md:grid-cols-2 gap-6 mt-8"
          onSubmit={handleSubmit}>
          {applicationType === "birth" ? (
            <>
              <div>
                <label className="block mb-2 font-medium">
                  Child Name
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Enter child name"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Father&apos;s Name
                </label>
                <input
                  type="text"
                  placeholder="Father's name"
                  className="w-full border rounded-lg p-3"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Mother&apos;s Name
                </label>
                <input
                  type="text"
                  placeholder="Mother's name"
                  className="w-full border rounded-lg p-3"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Hospital Name
                </label>
                <input
                  type="text"
                  placeholder="Hospital name"
                  className="w-full border rounded-lg p-3"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2 font-medium">
                  Deceased Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full border rounded-lg p-3"
                  value={deceasedName}
                  onChange={(e) => setDeceasedName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Date of Death
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  value={dateOfDeath}
                  onChange={(e) => setDateOfDeath(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium"></label>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Place of Death
                </label>
                <input
                  type="text"
                  placeholder="Hospital / Home"
                  className="w-full border rounded-lg p-3"
                  value={placeOfDeath}
                  onChange={(e) => setPlaceOfDeath(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Cause of Death
                </label>
                <input
                  type="text"
                  placeholder="Cause of death"
                  className="w-full border rounded-lg p-3"
                  value={causeOfDeath}
                  onChange={(e) => setCauseOfDeath(e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Address
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter address"
                  className="w-full border rounded-lg p-3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="reset"
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}