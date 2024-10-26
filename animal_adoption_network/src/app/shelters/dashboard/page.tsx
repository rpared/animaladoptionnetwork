"use client";
import { useEffect, useState } from "react";
import { AnimalProvider, AnimalType } from "@/components/animals";
import HeaderShelters from "@/components/header-shelters";
// import getToken from "@/components/header-shelters";
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getUserInfo from "@/components/get-user-info";

import DashboardLayout from "@/components/shelters-dashboard";
import axios from "axios";

const DashboardHome = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]); // Specify type here
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const speciesOptions = [
    "Dog",
    "Cat",
    "Rabbit",
    "Bird",
    "Raccoon",
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
  ];

  // Fetching User Data
  const [userName, setUserName] = useState<string | null>(null); // State to store user's name
  const [shelterId, setShelterId] = useState<string | null>(null); // State to store user's id
  const getUserInfo = async () => {
    try {
      const response = await axios.get("../api/userInfo");
      if (response.data.success) {
        console.log(response.data.user.name); // Display user's name
        console.log(response.data.user._id); // Display user's id
        setUserName(response.data.user.name); // Set the user's name in state
        setShelterId(response.data.user._id); // Set the user's shelterId in state
      }
      return response.data.user; // Return the user object
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  useEffect(() => {
    getUserInfo(); // Fetch user info
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = async () => {
    try {
      const query = {
        species,
        name,
        age,
        gender,
        shelterId,
      };
      const response = await axios.get("/api/animals", { params: query });
      setAnimals(response.data.animals); // Ensure this matches the expected structure
      console.log(response);
    } catch (error) {
      console.error("Error fetching filtered animals:", error);
    }
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(`/api/animals?shelterId=${shelterId}`);
        setAnimals(response.data.animals);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, [shelterId]);

  return (
    <>
      <HeaderShelters />
      <DashboardLayout>
        <h1 className="text-3xl text-brown font-bold mb-6">
          Manage Animals in {userName}
        </h1>

        {/* Filters Section */}
        <div className="mb-6 text-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Species Dropdown */}
            <div>
              <label className="text-brown">Species</label>
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              >
                <option value="">All Species</option>
                {speciesOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Name Filter */}
            <div>
              <label className="text-brown">Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Age Filter */}
            <div>
              <label className="text-brown">Age</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender Filter */}
            <div>
              <label className="text-brown">Gender</label>
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleFilter}
            className="rounded-md bg-violet-100 px-3.5 py-2 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
          >
            Filter
          </button>
        </div>

        {/* List of Animals (Example) 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          // Example Animal Card 
          <div className="border border-gray-300 p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold text-brown">Max</h3>
            <p className="text-gray-700">Species: Dog</p>
            <p className="text-gray-700">Age: 3</p>
            <p className="text-gray-700">Gender: Male</p>
          </div>
        </div>
        */}
        <AnimalProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 text-gray-700">
            {animals.length > 0 ? (
              animals.map((animal) => (
                <div
                  key={animal._id}
                  className="bg-slate-100 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-bold">{animal.name}</h3>
                  <p>Species: {animal.species}</p>
                  <p>Gender: {animal.gender}</p>
                  <p>Age: {animal.age}</p>
                  <p>Weight: {animal.weight} kg</p>
                  <p>{animal.description}</p>
                  <p>
                    {animal.shelter?.city}, {animal.shelter?.province}
                  </p>

                  {animal.photos && animal.photos.length > 0 && (
                    <Image
                      className="h-48 w-full object-cover rounded-lg mt-4"
                      src={animal.photos[0]}
                      alt={animal.name}
                      width={200}
                      height={100}
                    />
                  )}
                  <button className="mt-4 mr-2 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-violet-70">
                    Edit
                  </button>
                  <button className="mt-4 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-red-400">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No animals found matching your criteria.</p>
            )}
          </div>
        </AnimalProvider>
      </DashboardLayout>
    </>
  );
};

export default DashboardHome;
