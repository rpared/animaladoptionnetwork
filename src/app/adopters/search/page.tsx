"use client";
import { useEffect, useState } from "react";
import AdoptersDashboard from "@/components/adopters-dashboard";
import HeaderAdopters from "@/components/header-adopters";
import getUserInfo from "@/components/get-user-info";
import axios from "axios";

import { AnimalProvider, AnimalType, useAnimals } from "@/components/animals"; // Custom hook to access the context
import Image from "next/image";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import AdoptionRequestForm from "@/components/adoption-request";
import Link from "next/link";
// import { set } from "mongoose";

const AnimalSearch = () => {
  const [userLocation, setUserLocation] = useState("");
  const [userId, setUserId] = useState<unknown>();
  // const [userFname, setUserFName] = useState();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setUserId(user._id);
        // setUserFName(user.fname);
        setUserLocation(user.city);
        // setLocation(user.city); // Auto-populate the location
        console.log("User city is: ", user.city);
        console.log("User id is: ", user._id);
        
      }
    };
    fetchUserData();
  }, []);

  const { animals, isLoved, handleLoveToggle, fetchFilteredAnimals } =
    useAnimals(); // Consume context

  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(100);
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Function to reset location to user's location
  const handleLocation = () => {
    setLocation(userLocation); // Set location to user's location
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitClick = async (data: Record<string, any>) => {
    // Destructure form data
    const {
      fname,
      lname,
      email,
      phone,
      id,
      address,
      householdSize,
      hasOtherPets,
      salaryRange,
      personalReference,
      personalReferencePhone,
    } = data;
  
    // Construct the JSON payload
    const jsonData = {
      animalId: selectedAnimal?._id,
      adopterId: userId,
      fname,
      lname,
      email,
      phone,
      id,
      address,
      householdSize,
      hasOtherPets,
      salaryRange,
      personalReference,
      personalReferencePhone,
      status: "pending",
    };
  
    try {
      const response = await axios.post("/api/adoptionRequest", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      onModalClose();
    } catch (error) {
      console.error("Error submitting adoption request:", error);
    }
  };
  

  const onModalClose = () => {
    closeModal();
    setSelectedAnimal(undefined);
  }

  const onAdoptionClick = (animal: AnimalType) => {
    setSelectedAnimal(animal);
    openModal();
  }

  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white mb-16 text-gray-700 ">
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
                className="p-2 border rounded-md"
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
                  <button
                    type="button"
                    onClick={() => handleLocation()}
                    className="text-sm font-normal border border-gray-300 rounded-md text-violet-100 px-2 m-2 hover:bg-violet-100 hover:text-slate-100"
                  >
                    Select my city
                  </button>
                </label>
                <input
                  type="text"
                  id="location"
                  value={location} // Fallback to userLocation if location is empty
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or province"
                  className="p-2 border rounded-md"
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
                        <Link href={`/adopters/individualAnimalDetails?id=${animal._id}`}>
                          <h3 className="text-2xl font-bold">{animal.name}</h3>
                        </Link>
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
                      {/* <p>{animal.description}</p> */}
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
                        <div>-No photo available-</div>
                      )}
                      
                      <div className="flex justify-center">
                        <button
                          type="button"
                          className="bg-violet-100 text-white mt-3 px-4 py-2 rounded-md hover:opacity-80"
                          onClick={() => onAdoptionClick(animal)}
                        >
                          Visit-Adopt
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No animals found matching your criteria.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <AdoptionRequestForm
            onSubmitForm={onSubmitClick}
            closeModal={onModalClose}
          />
        )}
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
