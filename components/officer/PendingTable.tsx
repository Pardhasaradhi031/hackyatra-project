const applications = [
  {
    id: "BDR0004501",
    name: "Anil Kumar",
    type: "Birth",
    date: "11 May 2024",
  },
  {
    id: "BDR0004502",
    name: "Lakshmi Devi",
    type: "Death",
    date: "10 May 2024",
  },
  {
    id: "BDR0004503",
    name: "Ravi Teja",
    type: "Birth",
    date: "10 May 2024",
  },
  {
    id: "BDR0004504",
    name: "Sita Rao",
    type: "Death",
    date: "09 May 2024",
  },
  {
    id: "BDR0004505",
    name: "Kiran Kumar",
    type: "Birth",
    date: "08 May 2024",
  },
];

export default function PendingTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="font-semibold text-lg mb-5">
        Recent Pending Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="pb-3">Application No.</th>
              <th className="pb-3">Citizen Name</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Submitted Date</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}