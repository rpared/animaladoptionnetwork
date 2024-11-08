"use client";
import AdoptersDashboard from "@/components/adopters-dashboard";
import HeaderAdopters from "@/components/header-adopters";
import axios from "axios";
import { useEffect, useState } from "react";

type ShelterListProps = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  administratorLastName?: string;
  administratorFirstName?: string;
  province?: string;
  city?: string;
  address?: string;
  charitableRegistrationNumber?: string;
  operatingLicenseNumber?: string;
  documentUploads?: URL;
};

export default function SheltersList() {
  const [shelterList, setShelterList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Fetch user data
  useEffect(() => {
    const fetchShelterList = async () => {
      try {
        const response = await axios.get("/api/shelterList");
        if (response.data.success) {
          setShelterList(response.data.shelterList); // Access the actual list
          setLoading(false);
        } else {
          setError("Failed to load shelter list.");
          setLoading(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error loading shelter list.");
        setLoading(false);
      }
    };
    fetchShelterList();
  }, []);

  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-10 text-gray-600">
        <div className="mx-auto max-w-[1000px] relative isolate pt-2 px-8">
          <h1 className="text-4xl font-semibold text-brown text-center mb-3">
            Shelter List
          </h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="flex gap-8 flex-wrap justify-center">
              {shelterList.length > 0 ? (
                shelterList.map((shelter: ShelterListProps) => (
                  <div
                    key={shelter._id}
                    className="border border-gray-300 py-2 px-3 rounded-md shadow-md w-[280px] bg-white"
                  >
                    <h2 className="text-xl font-bold text-brown mb-1">
                      {shelter.name}
                    </h2>
                    <p className="text-sm text-gray-600 ">
                      {shelter.city}, {shelter.province}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {shelter.address}
                    </p>
                    <a
                      href={`mailto:${shelter.email}`}
                      className="text-sm text-violet-100 hover:underline"
                    >
                      {shelter.email}
                    </a>
                  </div>
                ))
              ) : (
                <p>No shelters found.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
