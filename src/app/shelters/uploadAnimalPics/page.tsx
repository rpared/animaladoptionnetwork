"use client";
import { useState } from "react";
import HeaderShelters from "@/components/header-shelters";
import DashboardLayout from "@/components/shelters-dashboard";
import axios from "axios";

const UploadAnimalPics = () => {
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null); // Single photo

  // Handle file selection for a single photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5 MB limit
      if (file.size > maxSize) {
        setError("File size exceeds the 5 MB limit.");
        setSelectedPhoto(null);
      } else {
        setSelectedPhoto(file);
        setError(""); // Clear any previous error
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object to hold the data
    const formData = new FormData();

    // Append photo to FormData
    if (selectedPhoto) {
      formData.append("photo", selectedPhoto);
      console.log("Selected photo:", selectedPhoto);
    } else {
      console.error("No photo selected");
      return;
    }

    // Log FormData content
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Submit the form data to the Upload API
    try {
      const response = await axios.post("/api/uploadAnimalPics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Photo uploaded successfully!");
        setStatusMessage("Photo uploaded successfully!");
        setSelectedPhoto(null);
      } else {
        setError("Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError("Error uploading photo.");
    }
  };

  return (
    <>
      <HeaderShelters />
      <DashboardLayout>
        <main className="bg-white my-2 text-gray-600 ">
          <div className=" max-w-[600px] relative isolate pt-6 px-8">
            <h1 className="text-4xl mb-4 font-semibold text-brown">
              Upload Animal Photos
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            {statusMessage && (
              <p className="text-violet-100">{statusMessage}</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              {/* File upload field for photos */}
              <div className="mb-4">
                <label htmlFor="photo">Upload Photo:</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="p-2 border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-violet-200"
              >
                Upload Photo
              </button>
            </form>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default UploadAnimalPics;
