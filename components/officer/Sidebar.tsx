"use client";

import {
  LayoutDashboard,
  Clock3,
  CheckCircle,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "Pending Applications",
    icon: Clock3,
  },
  {
    name: "Verified Applications",
    icon: CheckCircle,
  },
  {
    name: "Reports",
    icon: BarChart3,
  },
  {
    name: "Profile",
    icon: User,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h2 className="font-bold text-green-700 text-xl">
          GVMC
        </h2>
        <p className="text-xs text-gray-500">
          Birth & Death Registration
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.name}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition
              ${
                menu.active
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>{menu.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}