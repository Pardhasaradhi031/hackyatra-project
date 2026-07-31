import Sidebar from "@/components/officer/Sidebar";
import StatCard from "@/components/officer/StatCard";
import PendingTable from "@/components/officer/PendingTable";
import { FileCheck, CheckCircle2, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Officer Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Overview of application processing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Pending Applications"
            value="18"
            icon={<FileText size={24} />}
            color="blue"
          />

          <StatCard
            title="Verified Today"
            value="9"
            icon={<CheckCircle2 size={24} />}
            color="green"
          />

          <StatCard
            title="Issued Today"
            value="5"
            icon={<FileCheck size={24} />}
            color="purple"
          />
        </div>

        <div className="mt-8">
          <PendingTable />
        </div>
      </main>
    </div>
  );
}