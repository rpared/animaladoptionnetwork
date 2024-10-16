import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Adjust the space to account for the header */}
      <div className="mt-20 flex flex-1 flex-col md:flex-row">
        {/* Sidebar Menu */}
        <div className="w-full md:w-1/4 bg-gray-800 p-5 block md:flex-none">
          <h2 className="text-2xl text-gray-300 font-bold mb-8">
            Shelter Dashboard
          </h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/shelters/dashboard"
                className={clsx("block text-violet-70 hover:text-slate-300", {
                  "opacity-80 text-slate-900 bg-violet-100 p-2 hover:text-slate-900 ":
                    pathname === "/shelters/dashboard",
                })}
              >
                Manage Animals
              </Link>
            </li>
            <li>
              <Link
                href="/shelters/dashboard/upload"
                className={clsx("block text-violet-70 hover:text-slate-300", {
                  "opacity-80 text-slate-900 bg-violet-100 p-2 hover:text-slate-900 ":
                    pathname === "/shelters/dashboard/upload",
                })}
              >
                Upload Animals
              </Link>
            </li>

            <li>
              <Link
                href="/shelters/dashboard/requests"
                className={clsx("block text-violet-70 hover:text-slate-300", {
                  "opacity-80 text-slate-900 bg-violet-100 p-2 hover:text-slate-900 ":
                    pathname === "/shelters/dashboard/requests",
                })}
              >
                Manage Adoption Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 p-5 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
