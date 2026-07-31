
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">
                New Application
              </h3>

              <p className="text-gray-500 mt-2">
                Create and submit a new application.
              </p>

              <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Create
              </button>
            </div>

            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">
                My Applications
              </h3>

              <p className="text-gray-500 mt-2">
                View all submitted applications.
              </p>

              <button className="mt-6 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
                View
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}