"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import axios from "axios";
import AdoptersDropdown from "./adopters-dropdown-menu";
import parseJwt from "./parseJwt";

export default function HeaderAdopters() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      setAuth(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
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

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50 bg-slate-100 shadow-lg">
        <nav
          className="flex items-center justify-between p-4 lg:px-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/adopters/search" className="-m-1.5 p-1.5">
              <span className="sr-only">Animal Adoption Network</span>
              <Image
                className="w-auto"
                style={{
                  filter: "drop-shadow(0px 0px 5px rgba(255, 255, 255, 1))",
                }}
                src="/isotype.png"
                height={50}
                width={50}
                alt="Animal Adoption Network Logo"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brown"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            <Link
              href="/adopters/search"
              className={clsx(
                "text-lg font-semibold leading-6 text-brown hover:text-violet-100 px-4 py-2 rounded-sm",
                {
                  "bg-violet-100 opacity-30 text-slate-100":
                    pathname === "/search",
                }
              )}
            >
              Search
            </Link>
            <Link
              href="/adopters/about"
              className={clsx(
                "text-lg font-semibold leading-6 text-brown hover:text-violet-100 px-4 py-2 rounded-sm",
                {
                  "bg-violet-100 opacity-30 text-slate-100":
                    pathname === "/adopters/about",
                }
              )}
            >
              About
            </Link>
            <Link
              href="/adopters/shelterlist"
              className={clsx(
                "text-lg font-semibold leading-6 text-brown hover:text-violet-100 px-4 py-2 rounded-sm",
                {
                  "bg-violet-100 opacity-30 text-slate-100":
                    pathname === "/adopters/shelterlist",
                }
              )}
            >
              Shelter List
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <AdoptersDropdown />

            <Link
              href="/"
              className="text-lg font-semibold leading-6 text-brown border-transparent py-1 px-2 ml-2 hover:text-violet-100 hover:border-violet-100 border rounded-md"
              onClick={logout}
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="fixed inset-y-0 right-0 z-50 w-64 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-brown/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Animal Adoption Network</span>
                  <Image
                    className="w-auto"
                    style={{
                      filter:
                        "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8))",
                    }}
                    height={60}
                    width={60}
                    src="/isotype.png"
                    alt="Animal Adoption Network Logo"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-brown"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/20">
                  <div className="space-y-2 py-6">
                    <div
                      className="py-1 divide-y divide-gray-500/20 "
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        href="/adopters/profile"
                        className="-mx-3 block bg-violet-70/10 rounded-sm py-2 px-3 text-md text-gray-700 hover:bg-violet-70 hover:text-gray-100"
                        role="menuitem"
                      >
                        {userName}&apos;s Profile
                      </Link>
                      <Link
                        href="/adopters/requests"
                        className="-mx-3 block bg-violet-70/10 rounded-sm py-2 px-3 text-md text-gray-700 hover:bg-violet-70 hover:text-gray-100"
                        role="menuitem"
                      >
                        Requests
                      </Link>
                      <Link
                        href="/adopters/lovelist"
                        className="-mx-3 block bg-violet-70/10 rounded-sm py-2 px-3 text-md text-gray-700 hover:bg-violet-70 hover:text-gray-100"
                        role="menuitem"
                      >
                        Lovelist
                      </Link>
                    </div>
                    <div className="-my-6 border-gray-500/20"></div>

                    <Link
                      href="/adopters/search"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                    >
                      Search
                    </Link>
                    <Link
                      href="/adopters/about"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                    >
                      About
                    </Link>
                    <Link
                      href="/adopters/shelters"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                    >
                      Shelters
                    </Link>
                    <Link
                      href="/adopters"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                    >
                      Adopters
                    </Link>
                  </div>

                  <div className="py-6">
                    <Link
                      onClick={logout}
                      href="/"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                    >
                      Log Out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
