"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import React from "react";

const AnimalSearch = () => {
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(100);
  const [location, setLocation] = useState("");
  const [animals, setAnimals] = useState([]);

  const handleSearch = async () => {
    try {
      const query = {
        species,
        gender,
        minWeight,
        maxWeight,
        location,
      };
      const response = await axios.get("/api/animals", { params: query });
      setAnimals(response.data.animals);
    } catch (error) {
      console.error("Error fetching filtered animals:", error);
    }
  };

  return (
    <main className="bg-white my-16 text-gray-700">
      <div className=" mx-auto max-w-[800px] relative isolate pt-14 px-8">
        <h1 className="text-4xl font-semibold text-brown mb-4">
          Search for Animals
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          {/* Species Dropdown */}
          <div className="mb-4">
            <label htmlFor="species" className="block text-lg font-semibold">
              Species:
            </label>
            <select
              id="species"
              className=" p-2 border rounded-md"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="">All Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              {/* Add other species options */}
            </select>
          </div>

          {/* Gender Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-lg text-black font-semibold"
            >
              Gender:
            </label>
            <select
              id="gender"
              className=" p-2 border rounded-md"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Weight Filter */}
          <div className="mb-4">
            <label className=" text-lg font-semibold">Weight (kg):</label>
            <input
              type="number"
              placeholder="Min Weight"
              value={minWeight}
              onChange={(e) => setMinWeight(Number(e.target.value))}
              className=" p-2 mb-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max Weight"
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
              className=" p-2 border rounded-md"
            />
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-lg font-semibold">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city, province, or country"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-violet-100 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>

        {/* Render Animals */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {animals.length > 0 ? (
            animals.map((animal) => (
              <div
                key={animal._id}
                className="bg-slate-100 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold">{animal.name}</h3>
                <p>Species: {animal.species}</p>
                <p>Gender: {animal.gender}</p>
                <p>Weight: {animal.weight} kg</p>
                <p>{animal.description}</p>
                <p>
                  {animal.shelter.city}, {animal.shelter.province}
                </p>
              </div>
            ))
          ) : (
            <p>No animals found matching your criteria.</p>
          )}
        </div>

        <div>
          <button
            type="button"
            className="bg-gray-500 text-white px-2 py-1 rounded-md"
          >
            <Link href="search/allanimals">Display all animals</Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default AnimalSearch;
