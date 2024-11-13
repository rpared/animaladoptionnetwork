"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {AnimalType} from "@/components/animals";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import HeaderAdopters from "@/components/header-adopters";
import AdoptionRequestForm from "@/components/adoption-request";
import getUserInfo from "@/components/get-user-info";


const IndividualAnimalDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the animal ID from the URL
  const [animal, setAnimal] = useState<AnimalType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lovedAnimals, setLovedAnimals] = useState<string[]>([]); // State for "loved" animals
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>();
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<unknown>();
  // const [userLocation, setUserLocation] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  //Adopter data
// Fetch user data
useEffect(() => {
  const fetchUserData = async () => {
    const user = await getUserInfo();
    if (user) {
      setUserId(user._id);
      // setUserFName(user.fname);
      // setUserLocation(user.city);
      // setLocation(user.city); // Auto-populate the location
      console.log("User city is: ", user.city);
      console.log("User id is: ", user._id);
      
    }
  };
  fetchUserData();
}, []);



  useEffect(() => {
    if (id) {
      const fetchAnimalDetails = async () => {
        try {
          const response = await axios.get(`/api/animals?id=${id}`);
          const animalsData = response.data.animals; // Access the 'animals' array
          console.log("Fetched animals data:", animalsData);
          
          if (animalsData && Array.isArray(animalsData)) {
            // Find the specific animal by ID
            const foundAnimal = animalsData.find((animal) => animal._id === id);
            if (foundAnimal) {
              setAnimal(foundAnimal);
            } else {
              setError("Animal not found.");
            }
          } else {
            setError("Invalid data structure received.");
          }
        } catch (error) {
          setError("Failed to fetch animal details.");
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimalDetails();
    }
  }, [id]);
  
  
  const handleLoveToggle = (animalId: string) => {
    // Toggle "loved" state for the animal
    setLovedAnimals((prevLovedAnimals) =>
      prevLovedAnimals.includes(animalId)
        ? prevLovedAnimals.filter((id) => id !== animalId) // Remove love if it exists
        : [...prevLovedAnimals, animalId] // Add love if it doesn't exist
    );
  };

  const isLoved = (animalId: string) => lovedAnimals.includes(animalId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!animal) return <div>No animal details available.</div>; // Handle null animal



//Adoption Request

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
      <main className="bg-white mb-16 text-gray-700 max-w-screen-xl mx-auto">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-semibold text-brown mb-4">
            {animal.name}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
            {animal.photos &&
                      animal.photos.length > 0 &&
                      animal.photos[0]?.data &&
                      animal.photos[0]?.contentType ? (
                        <Image
                          className="h-120 w-full object-cover rounded-lg mt-6"
                          src={`data:${
                            animal.photos[0].contentType
                          };base64,${Buffer.from(animal.photos[0].data)}`}
                          alt={animal.name}
                          width={400}
                          height={400}
                        />
                      ) : (
                        <div>-No photo available-</div>
                      )}
            </div>
            <div className="flex-1 space-y-4 max-w-xl">
              <h1 className="text-4xl font-semibold text-brown mb-4 mt-6">
                  {animal.name}
              </h1>
              <div className="flex items-center space-x-2">
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


              <p>
                <strong>Species:</strong> {animal.species}
              </p>
              <p>
                <strong>Age:</strong> {animal.age}
              </p>
              <p>
                <strong>Gender:</strong> {animal.gender}
              </p>
              <p>
                <strong>Weight:</strong> {animal.weight} kg
              </p>
              <p>
                <strong>Breed:</strong> {animal.breed}
              </p>
              <p>
                <strong>Location:</strong> {animal.shelter?.city}, {animal.shelter?.province}
              </p>
              <p>
                <strong>Description:</strong> {animal.description}
              </p>
              <p>
                <strong>Medical History:</strong> {animal.medicalHistory}
              </p>
              <div className="flex">
                        <button
                          type="button"
                          className="bg-violet-100 text-white mt-3 px-4 py-2 rounded-md hover:opacity-80"
                          onClick={() => onAdoptionClick(animal)}
                        >
                          Visit-Adopt
                        </button>
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      </main>
    </>
  );
};
  const IndividualAnimalDetailsPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <IndividualAnimalDetails />
    </Suspense>
  );

export default IndividualAnimalDetailsPage;

// const WrappedIndividualAnimalDetails = () => (
//   <AnimalProvider>
//     <IndividualAnimalDetails />
//   </AnimalProvider>
// );

// export default WrappedIndividualAnimalDetails;
