"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {AnimalProvider, AnimalType, useAnimals} from "@/components/animals";
import HeaderAdopters from "@/components/header-adopters";
import AdoptionRequestForm from "@/components/adoption-request";
import getUserInfo from "@/components/get-user-info";
import AdoptersDashboard from "@/components/adopters-dashboard";
import { HeartButton } from "@/components/heart";


const IndividualAnimalDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the animal ID from the URL
  const [animal, setAnimal] = useState<AnimalType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchLovelist, lovelist, setLovelist } = useAnimals(); // Consume context
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>();
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [userLocation, setUserLocation] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  
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
      <AdoptersDashboard />
      <main className="bg-white mb-16 text-gray-700 max-w-screen-xl mx-auto">
        <div className="container mx-auto px-4 py-10">
         
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
                <HeartButton
                  key={animal._id}
                  animalId={animal._id}
                  userId={userId ?? ""}
                />

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
      <AnimalProvider >
        <IndividualAnimalDetails />
      </ AnimalProvider>
    </Suspense>
  );

export default IndividualAnimalDetailsPage;

// const WrappedIndividualAnimalDetails = () => (
//   <AnimalProvider>
//     <IndividualAnimalDetails />
//   </AnimalProvider>
// );

// export default WrappedIndividualAnimalDetails;
