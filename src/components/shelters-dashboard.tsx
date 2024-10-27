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
                className={clsx(
                  "pl-2 block hover:text-slate-300", // Removed text-violet-70
                  {
                    "bg-violet-100 text-gray-800 rounded-sm p-2":
                      pathname === "/shelters/dashboard",
                    "text-violet-70": pathname !== "/shelters/dashboard", // Default text color when not active
                  }
                )}
              >
                Manage Animals
              </Link>
            </li>
            <li>
              <Link
                href="/shelters/uploadAnimals"
                className={clsx(
                  "pl-2 block hover:text-slate-300", // Removed text-violet-70
                  {
                    "bg-violet-100 text-gray-800 rounded-sm p-2":
                      pathname === "/shelters/uploadAnimals",
                    "text-violet-70": pathname !== "/shelters/uploadAnimals", // Default text color when not active
                  }
                )}
              >
                Upload Animals
              </Link>
            </li>

            <li>
              <Link
                href="/shelters/requests"
                className={clsx(
                  "pl-2 block hover:text-slate-300", // Removed text-violet-70
                  {
                    "bg-violet-100 text-gray-800 rounded-sm p-2":
                      pathname === "/shelters/requests",
                    "text-violet-70": pathname !== "/shelters/requests", // Default text color when not active
                  }
                )}
              >
                Manage Adoption Requests
              </Link>
            </li>

            <li>
              <Link
                href="/shelters/profile"
                className={clsx(
                  "pl-2 block hover:text-slate-300", // Removed text-violet-70
                  {
                    "bg-violet-100 text-gray-800 rounded-sm p-2":
                      pathname === "/shelters/profile",
                    "text-violet-70": pathname !== "/shelters/profile", // Default text color when not active
                  }
                )}
              >
                Shelter Profile
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
