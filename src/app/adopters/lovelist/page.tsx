"use client";
import HeaderAdopters from "@/components/header-adopters";
import AdoptersDashboard from "@/components/adopters-dashboard";
import React, { useEffect, useState } from 'react';
import { useAnimals, AnimalType, AnimalProvider } from '@/components/animals'; // Custom hook to access the context
import { HeartButton } from "@/components/heart";
import Link from "next/link";
import Image from "next/image";
import AdoptionRequestForm from "@/components/adoption-request";
import axios from "axios";
import getUserInfo from "@/components/get-user-info";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const Lovelist: React.FC = () => {
  const { fetchLovelist, lovelist, setLovelist, animals } = useAnimals(); // Consume context
  // const [lovelist, setLovelist] = useState<AnimalType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setUserId(user._id);
        // setUserFName(user.fname);
        console.log("User city is: ", user.city);
        console.log("User id is: ", user._id);
        
      }
    };
    fetchUserData();
  }, []);


  // Fetch lovelist when userId changes
  useEffect(() => {
    const loadLovelist = async () => {
      if (!userId) return; // Don't fetch if userId isn't available yet
      try {
        setIsLoading(true);
        const fetchedLovelist = await fetchLovelist(userId);
        setLovelist(fetchedLovelist); // Update context state
      } catch (error) {
        console.error("Error fetching lovelist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLovelist();
  }, [fetchLovelist, userId, setLovelist]);
  console.log("Lovelist is: ", lovelist);
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AdoptionRequestForm
              onSubmitForm={onSubmitClick}
              closeModal={onModalClose}
            />
          </div>
        </div>
      )}
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-2 text-gray-600 ">
        <div className="mx-auto max-w-[800px] relative isolate pt-6 px-8">
          <div className="mx-auto flex justify-center" >
        <HeartSolidIcon className="h-6 w-6 text-violet-100 mx-1" />
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Lovelist
          </h1>
          <HeartSolidIcon className="h-6 w-6 text-violet-100 mx-1" />
          </div>
          {/* Render Animals */}
          <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
              {animals.length > 0 && lovelist.length > 0 ? (
              animals
                .filter((animal) =>
                  lovelist.some((item) => item.animalId === animal._id)
                )
                .map((animal) => (
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
                        <HeartButton
                          key={animal._id}
                          animalId={animal._id}
                          userId={userId}
                        />
                      </div>
                      <p>Species: {animal.species}</p>
                      <p>Gender: {animal.gender}</p>
                      <p>Weight: {animal.weight} kg</p>
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
        
          
      </main>
    </>
  );
};

const WrappedAnimalSearch = () => (
  <AnimalProvider>
    <Lovelist />
  </AnimalProvider>
);

export default WrappedAnimalSearch;

// export default function Lovelist() {
//   return (
//     <>
//       <HeaderAdopters />
//       <AdoptersDashboard />
//       <main className="bg-white my-2 text-gray-600 ">
//         <div className="mx-auto max-w-[800px] relative isolate pt-6 px-8">
//           <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
//             Lovelist
//           </h1>
//           Soon available!
//         </div>
//       </main>
//     </>
//   );
// }
