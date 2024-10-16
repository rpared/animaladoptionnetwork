import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function AdoptersDashboard() {
  const pathname = usePathname();
  return (
    <div className=" flex flex-col ">
      <div className="mt-20 flex flex-1 flex-col md:flex-row">
        <div className="w-full  bg-gray-800 p-5 block md:flex-none">
          <ul className="space-y-4">
            <li>
              <Link
                href="/adopters/requests"
                className={clsx("block text-violet-70 hover:text-slate-300", {
                  "opacity-80 text-slate-900 bg-violet-100 p-2 hover:text-slate-900 ":
                    pathname === "/adopters/requests",
                })}
              >
                You have <b>no</b> pending adoption requests
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
