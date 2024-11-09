"use client";
import { useEffect, useState } from "react";
import HeaderShelters from "@/components/header-shelters";
import DashboardLayout from "@/components/shelters-dashboard";
import axios from "axios";
import getUserInfo from "@/components/get-user-info";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";

const EditAnimal = () => {
  //   const searchParams = useSearchParams();
  const [animalId, setAnimalId] = useState<string | null>(null);
  const [shelterId, setShelterId] = useState("");
  //   const [userName, setUserName] = useState<string | null>(null); // State to store user's name
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  // Set initial animal data from URL params
  const [animalData, setAnimalData] = useState({
    id: "",
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",
    description: "",
    medicalHistory: "",
    dateRescued: "",
    isAdopted: false,
    photos: [] as { data: string; contentType: string }[],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setShelterId(user._id); // Ensure this is a string
        // setUserName(user.name);
      }
    };
    fetchUserData();
  }, []); // Add empty dependency array to run this effect only once

  //   useEffect(() => {
  //     if (animalId) {
  //       fetchAnimalData(animalId);
  //     }
  //   }, []); // Add an empty dependency array to run this effect only once

  // Use useEffect to set animalId from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (id) {
      setAnimalId(id);
      fetchAnimalData(id); // Fetch animal data after getting the ID
    }
  }, []); // Run this effect only once on component mount

  // Function to fetch animal data from the server
  const fetchAnimalData = async (animalId: string) => {
    try {
      const response = await axios.get(
        `/api/animals/individualAnimal/?animalId=${animalId}`
      );
      if (response.status === 200) {
        setAnimalData(response.data);
      } else {
        setError("Failed to fetch animal data.");
      }
    } catch (error) {
      console.error("Error fetching animal data:", error);
      setError("Error fetching animal data.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      shelter: shelterId, // Ensure shelter is always set as the string shelterId
    }));
  };
  
  // Handle file selection for a single photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedPhoto(file);
      setError("");
    } else {
      setError("File size exceeds the 5 MB limit.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // If animalData has a shelter key, override it with shelterId
    const cleanAnimalData = { ...animalData, shelter: shelterId };

    // Append all key-value pairs from cleanAnimalData to formData
    Object.entries(cleanAnimalData).forEach(([key, value]) => {
      formData.append(key, String(value)); // Ensure all values are strings
    });

    console.log("Shelter ID before submission:", shelterId);
    console.log("Type of shelterId:", typeof shelterId); // Check the type here

    // Ensure shelterId is a string before appending
    if (typeof shelterId === "string") {
      formData.append("shelter", shelterId.toString());
    } else {
      console.error("Shelter ID is not a string:", shelterId);
    }

    if (animalId) {
      formData.append("animalId", animalId);
    }

    if (selectedPhoto) {
      formData.append("photo", selectedPhoto, selectedPhoto.name);
    }

    try {
      const response = await axios.put(
        `/api/editAnimals?animalId=${animalId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
        setStatusMessage("Animal updated successfully!");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setError("Failed to update animal data.");
      }
    } catch (error) {
      console.error("Error updating animal:", error);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setError("Error updating animal.");
    }

    // Logging form data for debugging
    console.log("Form data before submission: ");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };
  // Helper function to read file as ArrayBuffer
  // const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result as ArrayBuffer);
  //     reader.onerror = reject;
  //     reader.readAsArrayBuffer(file);
  //   });
  // };

  return (
    <>
      <HeaderShelters />
      <DashboardLayout>
        <main className="bg-white my-2 text-gray-600 ">
          <div className=" max-w-[600px] relative isolate pt-6 px-8">
            {/* <div className="p-6 text-gray-800"> */}
            <h1 className="text-4xl mb-4 font-semibold text-brown">
              Edit Animal
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
              {/* Name */}
              <div>
                <label className="block text-sm font-medium" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={animalData.name || ""}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Species */}
              <div>
                <label className="block text-sm font-medium" htmlFor="species">
                  Species *
                </label>
                <select
                  name="species"
                  value={animalData.species || ""}
                  onChange={handleChange}
                  required
                  className="w-220 p-2 border rounded-md"
                >
                  {[
                    "Dog",
                    "Cat",
                    "Rabbit",
                    "Bird",
                    "Racoon",
                    "Ferret",
                    "Pig",
                    "Goat",
                    "Duck",
                    "Chicken",
                    "Turkey",
                    "Possum",
                    "Guinea Pig",
                    "Hamster",
                    "Mouse",
                    "Rat",
                  ].map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className="block text-sm font-medium">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={animalData.breed || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={animalData.age || ""}
                  onChange={handleChange}
                  className="w-220 p-2 border rounded-md"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={animalData.weight || ""}
                  onChange={handleChange}
                  className="w-220 p-2 border rounded-md"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium" htmlFor="gender">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={animalData.gender || ""}
                  onChange={handleChange}
                  required
                  className="w-220 p-2 border rounded-md"
                >
                  {["Unknown", "Male", "Female"].map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={animalData.description || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={animalData.medicalHistory || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* isAdopted */}
              <div>
                <label className="block text-sm font-medium">
                  <input
                    type="checkbox"
                    name="isAdopted"
                    checked={animalData.isAdopted}
                    onChange={handleChange}
                    className="p-2 border rounded-md m-2"
                  />
                  Adopted
                </label>
              </div>

              {animalData.photos &&
              animalData.photos.length > 0 &&
              animalData.photos[0]?.data &&
              animalData.photos[0]?.contentType ? (
                <Image
                  className="h-48 w-full object-cover rounded-lg mt-4"
                  src={`data:${
                    animalData.photos[0].contentType
                  };base64,${Buffer.from(animalData.photos[0].data)}`}
                  alt={animalData.name}
                  width={200}
                  height={100}
                />
              ) : (
                <div>-No photo available-</div>
              )}

              {/* File upload field for photos */}
              <div className="mb-4">
                <label htmlFor="photo">Change Photo:</label>
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
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default EditAnimal;
