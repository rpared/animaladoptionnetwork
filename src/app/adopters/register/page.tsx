"use client";
import Header from "@/components/header";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory

const RegisterAdopter = () => {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    householdSize: "",
    hasOtherPets: false,
    otherPetDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register-adopter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Registration successful! Now Login into your Account.");
        // Clear the form data
        setFormData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          phone: "",
          province: "",
          city: "",
          address: "",
          householdSize: "",
          hasOtherPets: false,
          otherPetDetails: "",
        });

        // Redirect to the login page after success
        router.push("../login"); // Navigate to the login page
      } else {
        alert(result.message || "Error occurred during registration.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-white my-16 text-gray-600 ">
        <div className="mx-auto max-w-[800px] relative isolate pt-14 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Adopter Registration
          </h1>
          <form
            className="w-full mx-auto max-w-lg bg-white p-8 shadow-lg rounded-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fname"
              >
                First Name *
              </label>
              <input
                id="fname"
                name="fname"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lname"
              >
                Last Name *
              </label>
              <input
                id="lname"
                name="lname"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="province"
              >
                Province
              </label>
              <input
                id="province"
                name="province"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.province}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="householdSize"
              >
                Household Size (Number of people living with you)
              </label>
              <input
                id="householdSize"
                name="householdSize"
                type="number"
                placeholder="4"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.householdSize}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Do you have other pets?
              </label>
              <input
                type="checkbox"
                id="hasOtherPets"
                name="hasOtherPets"
                checked={formData.hasOtherPets}
                onChange={(e) =>
                  setFormData({ ...formData, hasOtherPets: e.target.checked })
                }
              />
            </div>

            {formData.hasOtherPets && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="otherPetDetails"
                >
                  Details about other pets
                </label>
                <textarea
                  id="otherPetDetails"
                  name="otherPetDetails"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.otherPetDetails}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleChange(e)
                  }
                />
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="rounded-md bg-violet-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default RegisterAdopter;
