interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple";
}

const colors = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function StatCard({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

          <button className="mt-4 text-blue-600 text-sm hover:underline">
            View all
          </button>
        </div>

        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center ${colors[color]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}