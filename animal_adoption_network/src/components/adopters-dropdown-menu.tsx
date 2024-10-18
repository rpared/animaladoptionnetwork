import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import axios from "axios";
import parseJwt from "./parseJwt";

const AdoptersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Explicitly set the type
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState();

  const getToken = async () => {
    try {
      const response = await axios.get("/api/token");
      console.log("API Response:", response.data);
      const token = response.data.token; // Extract the token from the response

      if (!token) {
        throw new Error("Token not found in the response");
      }

      console.log("Token received:", token); // Log the token

      // Decode and access user info
      const decodedToken = parseJwt(token);
      console.log(decodedToken?.user?.fname);
      setAuth(response.data.status);
      setUserName(decodedToken?.user?.fname);
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

  // Function to handle clicks outside of the dropdown NOT WORKING UGH!!!!!
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          onClick={toggleDropdown}
          className={clsx(
            "flex justify-between items-center w-full text-lg font-semibold leading-6 text-brown border-transparent py-1 px-2 hover:text-violet-100 hover:border-violet-100 border rounded-md",
            { "bg-violet-100 opacity-50 text-slate-100": isOpen }
          )}
        >
          {/* Adopter Name with Arrow Icon */}
          <span>{userName}</span>
          {/* Downward Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              href="/adopters/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-70 hover:text-gray-100"
              role="menuitem"
            >
              Profile
            </Link>
            <Link
              href="/adopters/requests"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-70 hover:text-gray-100"
              role="menuitem"
            >
              Requests
            </Link>
            <Link
              href="/adopters/lovelist"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-70 hover:text-gray-100"
              role="menuitem"
            >
              Lovelist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdoptersDropdown;
