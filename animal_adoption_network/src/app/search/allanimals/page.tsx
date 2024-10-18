// This page is not in use, it is just a simple example to fetch the Api without any filtering queries
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/header";
import Image from "next/image";

type PropsAnimal = {
  animal: AnimalType;
};

type AnimalType = {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  description: string;
  medicalHistory: string;
  isAdopted: boolean;
  shelter: string;
  dateRescued: Date;
  photos: string[];
};

const Animals = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);

  useEffect(() => {
    sendGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get("/api/animals/allanimals");
      console.log(response.data); // Log the response data
      setAnimals(response.data.animals);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 my-24">
        <div className="text-center">
          <h1 className="text-4xl text-brown mb-8">All animals for adoption</h1>
        </div>
        {animals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {animals.map((animal) => (
              <AnimalCard animal={animal} key={animal._id} />
            ))}
          </div>
        ) : (
          <div>No Animals Found</div>
        )}
      </main>
    </>
  );
};

const AnimalCard = ({ animal }: PropsAnimal) => {
  return (
    <div className="bg-slate-200 text-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-bold mb-2">{animal.name}</h3>
        <p className="text-lg mb-2">
          <span className="font-semibold">Species: </span>
          {animal.species}
        </p>
        <p className="text-lg mb-1">
          <span className="font-semibold">Breed: </span>
          {animal.breed}
        </p>
        <p className="text-lg mb-1">
          <span className="font-semibold">Age: </span>
          {animal.age} years
        </p>
        <p className="text-lg mb-1">
          <span className="font-semibold">Gender: </span>
          {animal.gender}
        </p>
        <p className="text-lg mb-1">
          <span className="font-semibold">Weight: </span>
          {animal.weight} kg
        </p>
        <p className="text-base mb-2">{animal.description}</p>
      </div>
      {animal.photos && animal.photos.length > 0 && (
        <Image
          className="h-48 w-full object-cover rounded-lg mt-4"
          src={animal.photos[0]}
          alt={animal.name}
          width={350}
          height={200}
        />
      )}
      <button
        type="button"
        className="bg-violet-100 mx-auto text-white mt-3 px-4 py-2 rounded-md inline-block w-20"
      >
        Adopt
      </button>
    </div>
  );
};

export default Animals;
