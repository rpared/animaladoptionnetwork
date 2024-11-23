"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import getUserInfo from "@/components/get-user-info";
import axios from "axios";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

export default function AdoptersDashboard() {
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  const [userFname, setUserFName] = useState();
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = async () => {
    try {
      const response = await axios.get("/api/token");
      console.log("API Response:", response.data);
      const token = response.data.token; // Extract the token from the response

      if (!token) {
        throw new Error("Token not found in the response");
      }

      setAuth(response.data.status);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getToken(); // Fetch token only once on component mount
  }, []); // Empty array to ensure useEffect runs once on mount

  useEffect(() => {
    if (auth) {
      console.log("Authenticated");
    }
  }, [auth]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserInfo();
        if (user) {
          setUserFName(user.fname);

          // Fetch adoption requests for the adopter
          const response = await axios.get("/api/adoptionRequest", {
            params: { adopter: user._id },
          });

          const requests = response.data.requests;

          // Calculate unread and pending counts
          const unreadCount = requests.filter((req: { isArchived: boolean, status: string; }) => !req.isArchived && req.status !== "pending").length;
          const pendingCount = requests.filter((req: { status: string; }) => req.status === "pending").length;

          setUnreadCount(unreadCount);
          setPendingCount(pendingCount);
        } else {
          setError("Failed to load user data.");
        }
      } catch (error) {
        setError("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

return (
    <div className=" flex flex-col ">
      <div className="mt-20 flex flex-1 flex-col md:flex-row">
        <div className="w-full  bg-gray-800 block md:flex-none flex p-0 justify-between">
          <Link
            href="/adopters/requests"
            className={clsx(
              "block text-violet-70 hover:text-slate-900 p-3 pt-4",
              {
                " text-slate-200 p-2 pt-4":
                  pathname === "/adopters/requests",
              }
            )}
          >
            Hi {userFname}, you have <b>{unreadCount}</b> unread adoption requests, and <b>{pendingCount}</b> pending.
            
          </Link>
          <Link
            href="/adopters/lovelist"
            className={clsx(
              "block bg-violet-70 text-gray-800 hover:text-slate-300 p-3 pr-5 pt-4 m-0 flex",
              {
                "opacity-80 text-slate-900 bg-violet-100  hover:text-slate-900 ":
                  pathname === "/adopters/lovelist",
              }
            )}
          >
            <HeartOutlineIcon className="h-6 w-6 text-slate-100 mx-2" />
            Lovelist
          </Link>
        </div>
      </div>
    </div>
  );
}
