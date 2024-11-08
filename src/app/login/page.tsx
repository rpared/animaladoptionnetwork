"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> sara2

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create an object to send the login credentials
    const loginData = {
      userType,
      email,
      password,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await res.json();

      if (result.success) {
        console.log("successful login :)");
        // Check user type and redirect accordingly
        if (result.userType === "adopter") {
          router.push("./adopters/dashboard");
        } else if (result.userType === "shelter") {
          router.push("./shelters/dashboard");
        }
      } else {
        setErrorMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-white my-16 text-gray-600">
        <div className="mx-auto max-w-[800px] relative isolate pt-14 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Login
          </h1>
          <form
            className="w-full mx-auto max-w-lg bg-white p-8 shadow-lg rounded-lg"
            onSubmit={handleSubmit}
          >
            {errorMessage && (
              <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
            )}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="adopter"
                  name="userType"
                  value="adopter"
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="adopter" className="ml-2 text-gray-700">
                  Adopter
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="shelter"
                  name="userType"
                  value="shelter"
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="shelter" className="ml-2 text-gray-700">
                  Shelter
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="peter@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-md bg-violet-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
              >
                Login
              </button>
            </div>
          </form>
<<<<<<< HEAD
          <div className="mt-10 text-center mb-0">
            If you dont have an account, please register (it is free!):
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/adopters/register"
              className="rounded-md border border-violet-100 text-violet-100 mx-2 px-3.5 py-2 text-sm font-semibold shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
            >
              Adopter
            </Link>

            <Link
              href="/shelters/register"
              className="rounded-md border border-violet-100 text-violet-100 mx-2 px-3.5 py-2 text-sm font-semibold shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
            >
              Shelter
            </Link>
          </div>
=======
>>>>>>> sara2
        </div>
      </main>
    </>
  );
}
