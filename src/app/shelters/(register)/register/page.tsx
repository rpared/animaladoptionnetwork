"use client";
import { useState } from "react";
import axios from "axios";
import Header from "@/components/header";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory
import Geocoding from "@/components/geocoding";

function ShelterRegistrationForm() {
  const router = useRouter(); // Initialize useRouter
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    administratorFirstName: "",
    administratorLastName: "",
    province: "",
    city: "",
    address: "",
    charitableRegistrationNumber: "",
    operatingLicenseNumber: "",
  });

  // State for any error handling
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  //Geolocation
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);



  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleGeolocationFetch = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Prepare the data as a JSON object
      const jsonData = {
        ...formData, // Spread the form data
        latitude, // Include latitude
        longitude, // Include longitude
        // The legalDocument upload will need to be handled differently
      };

      // Submit the JSON data to the API route
      const response = await axios.post("/api/register-shelter", jsonData, {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      });

      // Handle successful submission
      if (response.data.success) {
        alert("Registration successful! Now Login into your Account.");
        setSuccess(
          "Shelter registered successfully! Now Login into your Account."
        );
        setFormData({
          name: "",
          email: "",
          password: "",
          administratorFirstName: "",
          administratorLastName: "",
          province: "",
          city: "",
          address: "",
          charitableRegistrationNumber: "",
          operatingLicenseNumber: "",
        });
        // setLegalDocument(null);

        // Redirect to the login page after success
        router.push("../login"); // Navigate to the login page
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle errors
      setError(err.response?.data?.message || "Error registering shelter");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-white my-16 text-gray-600 ">
        <div className="mx-auto max-w-[800px] relative isolate pt-14 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Shelter Registration
          </h1>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <label htmlFor="name">
              Shelter Name <span>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Paws of Love"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="shelter@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="8 Character password with at least one uppercase and a symbol"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="administratorFirstName">
              Administrator First Name <span>*</span>
            </label>
            <input
              type="text"
              id="administratorFirstName"
              name="administratorFirstName"
              placeholder="Peter"
              value={formData.administratorFirstName}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="administratorLastName">
              Administrator Last Name <span>*</span>
            </label>
            <input
              type="text"
              id="administratorLastName"
              name="administratorLastName"
              placeholder="Singer"
              value={formData.administratorLastName}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="province">
              Province <span>*</span>
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select Province</option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">
                Newfoundland and Labrador
              </option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
              <option value="Northwest Territories">
                Northwest Territories
              </option>
              <option value="Nunavut">Nunavut</option>
              <option value="Yukon">Yukon</option>
            </select>

            <label htmlFor="city">
              City <span>*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Toronto"
              value={formData.city}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="address">
              Address <span>*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="123 Animal Rd"
              value={formData.address}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="charitableRegistrationNumber">
              Charitable Registration Number <span>*</span>
            </label>
            <input
              type="text"
              id="charitableRegistrationNumber"
              name="charitableRegistrationNumber"
              placeholder="123456789"
              value={formData.charitableRegistrationNumber}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="operatingLicenseNumber">
              Operating License Number <span>*</span>
            </label>
            <input
              type="text"
              id="operatingLicenseNumber"
              name="operatingLicenseNumber"
              placeholder="ABC123456"
              value={formData.operatingLicenseNumber}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="legalDocument">Legal Document (Optional)</label>
            <input
              type="file"
              id="legalDocument"
              name="legalDocument"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="mt-10 text-center">
              <button
                type="submit"
                className="rounded-md bg-violet-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
              >
                Register Shelter
              </button>
            </div>
          </form>
          <Geocoding address={formData.address} onGeolocationFetch={handleGeolocationFetch} />
        </div>
      </main>
    </>
  );
}

export default ShelterRegistrationForm;
