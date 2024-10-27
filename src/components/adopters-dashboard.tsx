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
  const [userFname, setUserName] = useState();
  const [adoptionStatus, setAdoptionStatus] = useState();

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
      const user = await getUserInfo();
      if (user) {
        setUserName(user.fname);
        setAdoptionStatus(user.adoptionStatus);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className=" flex flex-col ">
      <div className="mt-20 flex flex-1 flex-col md:flex-row">
        <div className="w-full  bg-gray-800 block md:flex-none flex p-0 justify-between">
          <Link
            href="/adopters/requests"
            className={clsx(
              "block text-violet-70 hover:text-slate-300 p-3 pt-4",
              {
                "opacity-80 text-slate-900 bg-violet-100 p-2 pt-4 hover:text-slate-900 ":
                  pathname === "/adopters/requests",
              }
            )}
          >
            Hi {userFname}, you have <b>{adoptionStatus}</b> adoption requests.
            (Request Form and logic pending!)
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
