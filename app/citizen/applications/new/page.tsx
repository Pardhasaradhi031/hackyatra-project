"use client";

import { useState } from "react";

export default function Home() {
  const [applicationType, setApplicationType] = useState("birth");

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

        <form className="grid md:grid-cols-2 gap-6 mt-8">
          {applicationType === "birth" ? (
            <>
              <div>
                <label className="block mb-2 font-medium">
                  Child Name
                </label>
                <input
                  type="text"
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
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Date of Death
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Place of Death
                </label>
                <input
                  type="text"
                  placeholder="Hospital / Home"
                  className="w-full border rounded-lg p-3"
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
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}