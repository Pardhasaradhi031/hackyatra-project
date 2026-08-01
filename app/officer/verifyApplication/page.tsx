export default function VerifyApplication() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Verify Application
        </h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Applicant Details */}
        <div className="bg-white rounded-xl shadow border p-6">
          <h3 className="text-lg font-semibold mb-5">
            Applicant Details
          </h3>

          <div className="grid grid-cols-2 gap-y-4 text-sm">

            <p className="font-medium text-gray-600">Application No.</p>
            <p>BD20240021</p>

            <p className="font-medium text-gray-600">Applicant Name</p>
            <p>Anil Kumar</p>

            <p className="font-medium text-gray-600">Type</p>
            <p>Birth Registration</p>

            <p className="font-medium text-gray-600">Date of Birth</p>
            <p>12 May 2024</p>

            <p className="font-medium text-gray-600">Hospital Name</p>
            <p>KIMS Hospital</p>

            <p className="font-medium text-gray-600">Address</p>
            <p>MVP Colony, Visakhapatnam</p>

          </div>
        </div>

        {/* Document Verification */}
        <div className="bg-white rounded-xl shadow border p-6">

          <h3 className="text-lg font-semibold mb-5">
            Document Verification
          </h3>

          <div className="space-y-3">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-green-600"
              />
              Identity Proof
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-green-600"
              />
              Hospital Certificate
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-green-600"
              />
              Address Proof
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-green-600"
              />
              Other Documents
            </label>

          </div>

          {/* Remarks */}
          <div className="mt-6">
            <label className="block mb-2 font-medium text-gray-700">
              Remarks
            </label>

            <textarea
              rows={4}
              placeholder="Enter remarks (if any)"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-end gap-4">

        <button
          className="px-6 py-3 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
        >
          Reject Application
        </button>

        <button
          className="px-6 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Under Verification
        </button>

        <button
          className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Verify & Approve
        </button>

      </div>
    </div>
  );
}