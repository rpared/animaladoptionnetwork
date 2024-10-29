"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useState } from "react";
import { AnimalProvider, useAnimals } from "@/components/animals"; // Custom hook to access the context
import Image from "next/image";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const AnimalSearch = () => {
  const { animals, isLoved, handleLoveToggle, fetchFilteredAnimals } =
    useAnimals(); // Consume context

  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(100);
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = {
      species,
      gender,
      minWeight,
      maxWeight,
      location,
    };

    fetchFilteredAnimals(query); // Call context function to fetch animals
  };

  return (
    <>
      <Header />

      <main className="bg-white my-16 text-gray-700 ">
        <h1 className="text-4xl font-semibold text-brown mb-4 pt-10 px-8">
          Search for Animals
        </h1>
        <div className=" mx-auto px-8 relative isolate flex flex-col gap-4 md:flex-row ">
          <div>
            <form onSubmit={handleSearch}>
              {/* Species Dropdown */}
              <div className="mb-4 flex items-center gap-2">
                <label
                  htmlFor="species"
                  className="block text-lg font-semibold"
                >
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
                  <option value="Rabbit">Rabbit</option>
                  <option value="Bird">Bird</option>
                </select>
              </div>

              {/* Gender Dropdown */}
              <div className="mb-4 flex items-center gap-2">
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
              <div className="mb-4 flex items-center gap-2">
                <label className="text-lg font-semibold whitespace-nowrap">
                  Weight (kg):
                </label>
                <input
                  type="number"
                  placeholder="Min Kg"
                  value={minWeight}
                  onChange={(e) => setMinWeight(Number(e.target.value))}
                  className="w-20 p-2 border rounded-md" // Set width for the input
                />
                <input
                  type="number"
                  placeholder="Max Weight"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(Number(e.target.value))}
                  className="w-20 p-2 border rounded-md" // Set width for the input
                />
              </div>

              {/* Location Filter */}
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-lg font-semibold"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or province"
                  className=" p-2 border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-violet-100 text-white px-4 py-2 rounded-md hover:bg-violet-70"
              >
                Search
              </button>
            </form>
          </div>
          <div>
            {/* Render Animals */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
                {animals.length > 0 ? (
                  animals.map((animal) => (
                    <div
                      key={animal._id}
                      className="bg-slate-100 p-6 rounded-lg shadow-md"
                    >
                      <div className="flex justify-between w-full">
                        {/* Animal Name */}
                        <h3 className="text-2xl font-bold">{animal.name}</h3>
                        {/* Heart Button */}
                        <button
                          onClick={() => handleLoveToggle(animal._id)}
                          className="mr-2 text-2xl p-1"
                        >
                          {isLoved(animal._id) ? (
                            <HeartSolidIcon className="h-6 w-6 text-violet-100" />
                          ) : (
                            <HeartOutlineIcon className="h-6 w-6 text-violet-100" />
                          )}
                        </button>
                      </div>
                      <p>Species: {animal.species}</p>
                      <p>Gender: {animal.gender}</p>
                      <p>Weight: {animal.weight} kg</p>
                      <p>{animal.description}</p>
                      <p>
                        {animal.shelter?.city}, {animal.shelter?.province}
                      </p>
                      {animal.photos &&
                      animal.photos.length > 0 &&
                      animal.photos[0]?.data &&
                      animal.photos[0]?.contentType ? (
                        <Image
                          className="h-48 w-full object-cover rounded-lg mt-4"
                          src={`data:${
                            animal.photos[0].contentType
                          };base64,${Buffer.from(animal.photos[0].data)}`}
                          alt={animal.name}
                          width={200}
                          height={100}
                        />
                      ) : (
                        <div className="text-sm text-center">
                          -No photo available-
                        </div>
                      )}
                      <button
                        type="button"
                        className="bg-violet-100 mx-auto text-white mt-3 px-4 py-2 rounded-md block w-20"
                      >
                        Adopt
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No animals found matching your criteria.</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="button"
                className="bg-brown mt-4 text-white px-2 py-1 rounded-md hover:bg-gray-500"
              >
                <Link href="search/allanimals">
                  Display all animals Example (to be removed)
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const WrappedAnimalSearch = () => (
  <AnimalProvider>
    <AnimalSearch />
  </AnimalProvider>
);

export default WrappedAnimalSearch;
