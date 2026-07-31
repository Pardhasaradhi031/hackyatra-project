export default function MyApplications() {
  const applications = [
    {
      id: "BD20240012",
      type: "Birth",
      date: "03 May 2024",
      status: "Pending",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "BD20240011",
      type: "Birth",
      date: "05 May 2024",
      status: "Under Verification",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "BD20240010",
      type: "Death",
      date: "01 May 2024",
      status: "Verified",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "BD20240009",
      type: "Birth",
      date: "29 Apr 2024",
      status: "Certificate Issued",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "BD20240008",
      type: "Death",
      date: "20 Apr 2024",
      status: "Rejected",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Applications
        </h1>
        <p className="text-gray-500">
          View all your submitted applications
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Application No."
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select className="border rounded-lg px-4 py-2">
          <option>Filter by Status</option>
          <option>Pending</option>
          <option>Under Verification</option>
          <option>Verified</option>
          <option>Certificate Issued</option>
          <option>Rejected</option>
        </select>

        <select className="border rounded-lg px-4 py-2">
          <option>Filter by Type</option>
          <option>Birth</option>
          <option>Death</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Application No.</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Submitted Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{app.id}</td>
                <td className="px-4 py-4">{app.type}</td>
                <td className="px-4 py-4">{app.date}</td>

                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${app.color}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-4 py-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button className="w-9 h-9 rounded border bg-green-600 text-white">
          1
        </button>

        <button className="w-9 h-9 rounded border hover:bg-gray-100">
          2
        </button>

        <button className="w-9 h-9 rounded border hover:bg-gray-100">
          3
        </button>

        <button className="w-9 h-9 rounded border hover:bg-gray-100">
          4
        </button>
      </div>
    </div>
  );
}