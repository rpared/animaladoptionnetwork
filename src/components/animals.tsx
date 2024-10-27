"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

// Define ShelterType
export interface ShelterType {
  _id: string;
  city: string;
  province: string;
}

// Define AnimalType
export type AnimalType = {
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
  shelter: {
    city: string;
    province: string;
  };
  dateRescued: Date;
  photos: string[];
};

// Create AnimalContext
interface AnimalContextType {
  animals: AnimalType[];
  isLoved: (animalId: string) => boolean;
  handleLoveToggle: (animalId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchFilteredAnimals: (query: any) => Promise<void>;
}

// Create AnimalContext
const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

// Context provider component
export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [lovedAnimals, setLovedAnimals] = useState<string[]>([]);

  // Function to handle fetching filtered animals
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchFilteredAnimals = async (query: any) => {
    try {
      const response = await axios.get("/api/animals", { params: query });
      setAnimals(response.data.animals);
    } catch (error) {
      console.error("Error fetching filtered animals:", error);
    }
  };

  // Toggle the animal in and out of the Lovelist
  const handleLoveToggle = (animalId: string) => {
    if (lovedAnimals.includes(animalId)) {
      setLovedAnimals(lovedAnimals.filter((id) => id !== animalId));
    } else {
      setLovedAnimals([...lovedAnimals, animalId]);
    }
  };

  // Check if the animal is in the Lovelist
  const isLoved = (animalId: string) => {
    return lovedAnimals.includes(animalId);
  };

  useEffect(() => {
    sendGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get("/api/animals");
      console.log(response.data); // Check the API response structure
      setAnimals(response.data.animals); // Ensure this matches the expected structure
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  return (
    <AnimalContext.Provider
      value={{ animals, isLoved, handleLoveToggle, fetchFilteredAnimals }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

// Custom hook to use AnimalContext
export const useAnimals = () => {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error("useAnimals must be used within an AnimalProvider");
  }
  return context;
};

// Prev Custom hook to use the AnimalContext
// export const useAnimals = () => {
//   const context = useContext(AnimalContext);
//   if (context === undefined) {
//     throw new Error("useAnimals must be used within an AnimalProvider");
//   }
//   return context;
// };

// AnimalCard component
const AnimalCard = ({ animal }: { animal: AnimalType }) => {
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
        <img
          className="h-48 w-full object-cover rounded-lg mt-4"
          src={animal.photos[0]}
          alt={animal.name}
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

// Animals component (wrapped with the provider)
const Animals = () => {
  const { animals } = useAnimals(); // Destructure animals from the context

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
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
  );
};

// Export AnimalProvider and Animals component
export default Animals;

// Previous code
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// type PropsAnimal = {
//   animal: AnimalType;
// };

// type AnimalType = {
//   _id: string;
//   name: string;
//   species: string;
//   breed: string;
//   age: number;
//   weight: number;
//   gender: string;
//   description: string;
//   medicalHistory: string;
//   isAdopted: boolean;
//   shelter: string;
//   dateRescued: Date;
//   photos: string[];
// };

// const Animals = () => {
//   const [animals, setAnimals] = useState<AnimalType[]>([]);

//   useEffect(() => {
//     sendGetRequest();
//   }, []);

//   const sendGetRequest = async () => {
//     try {
//       const response = await axios.get("/api/animals/allanimals");
//       console.log(response.data); // Log the response data
//       setAnimals(response.data.animals);
//     } catch (error) {
//       console.error("Error fetching animals:", error);
//     }
//   };

//   return (
//     <main className="max-w-7xl mx-auto px-4 py-8">
//       <div className="text-center">
//         <h1 className="text-4xl text-brown mb-8">All animals for adoption</h1>
//       </div>
//       {animals.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {animals.map((animal) => (
//             <AnimalCard animal={animal} key={animal._id} />
//           ))}
//         </div>
//       ) : (
//         <div>No Animals Found</div>
//       )}
//     </main>
//   );
// };

// const AnimalCard = ({ animal }: PropsAnimal) => {
//   return (
//     <div className="bg-slate-200 text-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
//       <div>
//         <h3 className="text-2xl font-bold mb-2">{animal.name}</h3>
//         <p className="text-lg mb-2">
//           <span className="font-semibold">Species: </span>
//           {animal.species}
//         </p>
//         <p className="text-lg mb-1">
//           <span className="font-semibold">Breed: </span>
//           {animal.breed}
//         </p>
//         <p className="text-lg mb-1">
//           <span className="font-semibold">Age: </span>
//           {animal.age} years
//         </p>
//         <p className="text-lg mb-1">
//           <span className="font-semibold">Gender: </span>
//           {animal.gender}
//         </p>
//         <p className="text-lg mb-1">
//           <span className="font-semibold">Weight: </span>
//           {animal.weight} kg
//         </p>
//         <p className="text-base mb-2">{animal.description}</p>
//       </div>
//       {animal.photos && animal.photos.length > 0 && (
//         <img
//           className="h-48 w-full object-cover rounded-lg mt-4"
//           src={animal.photos[0]}
//           alt={animal.name}
//         />
//       )}
//       <button
//         type="button"
//         className="bg-violet-100 mx-auto text-white mt-3 px-4 py-2 rounded-md inline-block w-20"
//       >
//         Adopt
//       </button>
//     </div>
//   );
// };

// export default Animals;
