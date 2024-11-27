// contexts/AnimalContext.tsx
"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import Image from "next/image";

// Define ShelterType
export interface ShelterType {
  _id: string;
  city: string;
  province: string;
}

// Define the PhotoType

export type PhotoType = {
  data: Buffer;
  contentType: string;
};

// Define AnimalType
export type AnimalType = {
  animalId: string;
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
  photos: PhotoType[];
};

// Create AnimalContext
interface AnimalContextType {
  animals: AnimalType[];
  lovelist: AnimalType[];
  setLovelist: React.Dispatch<React.SetStateAction<AnimalType[]>>;
  fetchLovelist: (adopterId: string) => Promise<AnimalType[]>;
  // isLoved: (animalId: string) => boolean;
  handleLoveToggle: (animalId: string, adopterId: string, isLoading: (value: boolean) => void) => void;
  addToLovelist: (animal: AnimalType, adopterId: string) => void;
  removeFromLovelist: (animalId: string, adopterId: string) => void;
  // fetchLovelist: (adopterId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchFilteredAnimals: (query: any) => Promise<void>;
  isLoved2: (animalId: string, adopterId: string) => Promise<boolean>;
}

// Create AnimalContext
const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

// Context provider component
export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [lovelist, setLovelist] = useState<AnimalType[]>([]);

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

  const fetchLovelist = useCallback(async (adopterId: string): Promise<AnimalType[]> => {
    try {
      const response = await axios.get('/api/lovelist', { params: { adopterId } });
      const lovelistData = Array.isArray(response.data.lovelist) ? response.data.lovelist : [];
      setLovelist(lovelistData);
      return lovelistData;
    } catch (error) {
      console.error("Error fetching lovelist:", error);
      setLovelist([]); // Ensure lovelist is an empty array in case of error
      return [];
    }
  }, []);

  const addToLovelist = async (animal: AnimalType, adopterId: string) => {
    try {
      await axios.post('/api/lovelist', { adopterId, animalId: animal._id });
      await fetchLovelist(adopterId);
    } catch (error) {
      console.error("Error adding to lovelist:", error);
    }
  };

  const removeFromLovelist = async (animalId: string, adopterId: string) => {
    await axios.delete(`/api/lovelist`, { params: { adopterId, animalId } });
    fetchLovelist(adopterId);
  };

  // Check if the animal is in the Lovelist 
  // const isLoved = (animalId: string) => lovelist.some(animal => animal._id === animalId);
  
  // Check if the animal is in the Lovelist
  const isLoved2 = useCallback(
  async (animalId: string, adopterId: string) => {
    try {
      await fetchLovelist(adopterId); // Ensure this fetch updates `lovelist`

      return lovelist.some((animal) => animal.animalId === animalId);
    } catch (error) {
      console.error("Error fetching lovelist:", error);
      return false;
    }
  },
  [fetchLovelist, lovelist] // Dependencies that might change
);

    const handleLoveToggle = async (animalId: string, userId: string, setLoading: (value: boolean) => void) => {
      setLoading(true);
      console.log("Heart Clicked, the isLoved = ", isLoved2(animalId, userId)); // Debugging
      console.log("Heart Clicked, the animalId = ", animalId); // Debugging
      
      try {
        const currentlyLoved = await isLoved2(animalId, userId); // Dynamically check
        console.log("Currently Loved: ", currentlyLoved); // Debugging
        if (currentlyLoved) {
          await removeFromLovelist(animalId, userId);
          setLovelist((prev) => prev.filter((animal) => animal._id !== animalId));
        } else {
          const animalToAdd = animals.find((animal) => animal._id === animalId);
          if (animalToAdd) {
            await addToLovelist(animalToAdd, userId);
            setLovelist((prev) => [...prev, animalToAdd]);
          }
        }
      } catch (error) {
        console.error("Error toggling lovelist:", error);
      } finally {
        setLoading(false);
      }
    };
    
  



  useEffect(() => {
    console.log("Updated lovelist:", lovelist);
  }, [lovelist]);


  return (
     <AnimalContext.Provider value={{ animals, lovelist, setLovelist, fetchFilteredAnimals, handleLoveToggle, fetchLovelist, addToLovelist, removeFromLovelist, isLoved2 }}>
   
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
      {animal.photos && animal.photos.length > 0 && animal.photos[0]?.data ? (
        <Image
          className="h-48 w-full object-cover rounded-lg mt-4"
          src={`data:${animal.photos[0].contentType};base64,${Buffer.from(
            animal.photos[0].data
          ).toString("base64")}`}
          alt={animal.name}
          width={200}
          height={100}
        />
      ) : (
        <div>-No photo available-</div>
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


// // Prev code without lovelist
// "use client";
// import {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   ReactNode,
// } from "react";
// import axios from "axios";
// import Image from "next/image";

// // Define ShelterType
// export interface ShelterType {
//   _id: string;
//   city: string;
//   province: string;
// }

// // Define the PhotoType

// export type PhotoType = {
//   data: Buffer;
//   contentType: string;
// };

// // Define AnimalType
// export type AnimalType = {
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
//   shelter: {
//     city: string;
//     province: string;
//   };
//   dateRescued: Date;
//   photos: PhotoType[];
// };

// // Create AnimalContext
// interface AnimalContextType {
//   animals: AnimalType[];
//   isLoved: (animalId: string) => boolean;
//   handleLoveToggle: (animalId: string) => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   fetchFilteredAnimals: (query: any) => Promise<void>;
// }

// // Create AnimalContext
// const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

// // Context provider component
// export const AnimalProvider = ({ children }: { children: ReactNode }) => {
//   const [animals, setAnimals] = useState<AnimalType[]>([]);
//   const [lovedAnimals, setLovedAnimals] = useState<string[]>([]);

//   // Function to handle fetching filtered animals
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const fetchFilteredAnimals = async (query: any) => {
//     try {
//       const response = await axios.get("/api/animals", { params: query });
//       setAnimals(response.data.animals);
//     } catch (error) {
//       console.error("Error fetching filtered animals:", error);
//     }
//   };

//   // Toggle the animal in and out of the Lovelist
//   const handleLoveToggle = (animalId: string) => {
//     if (lovedAnimals.includes(animalId)) {
//       setLovedAnimals(lovedAnimals.filter((id) => id !== animalId));
//     } else {
//       setLovedAnimals([...lovedAnimals, animalId]);
//     }
//   };

//   // Check if the animal is in the Lovelist
//   const isLoved = (animalId: string) => {
//     return lovedAnimals.includes(animalId);
//   };

//   useEffect(() => {
//     sendGetRequest();
//   }, []);

//   const sendGetRequest = async () => {
//     try {
//       const response = await axios.get("/api/animals");
//       console.log(response.data); // Check the API response structure
//       setAnimals(response.data.animals); // Ensure this matches the expected structure
//     } catch (error) {
//       console.error("Error fetching animals:", error);
//     }
//   };

//   return (
//     <AnimalContext.Provider
//       value={{ animals, isLoved, handleLoveToggle, fetchFilteredAnimals }}
//     >
//       {children}
//     </AnimalContext.Provider>
//   );
// };

// // Custom hook to use AnimalContext
// export const useAnimals = () => {
//   const context = useContext(AnimalContext);
//   if (!context) {
//     throw new Error("useAnimals must be used within an AnimalProvider");
//   }
//   return context;
// };

// // Prev Custom hook to use the AnimalContext
// // export const useAnimals = () => {
// //   const context = useContext(AnimalContext);
// //   if (context === undefined) {
// //     throw new Error("useAnimals must be used within an AnimalProvider");
// //   }
// //   return context;
// // };

// // AnimalCard component
// const AnimalCard = ({ animal }: { animal: AnimalType }) => {
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
//       {animal.photos && animal.photos.length > 0 && animal.photos[0]?.data ? (
//         <Image
//           className="h-48 w-full object-cover rounded-lg mt-4"
//           src={`data:${animal.photos[0].contentType};base64,${Buffer.from(
//             animal.photos[0].data
//           ).toString("base64")}`}
//           alt={animal.name}
//           width={200}
//           height={100}
//         />
//       ) : (
//         <div>-No photo available-</div>
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

// // Animals component (wrapped with the provider)
// const Animals = () => {
//   const { animals } = useAnimals(); // Destructure animals from the context

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

// // Export AnimalProvider and Animals component
// export default Animals;

