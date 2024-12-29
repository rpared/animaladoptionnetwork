import { useState, useEffect } from "react";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useAnimals } from "@/components/animals"; // Custom hook to access the context

interface HeartButtonProps {
  animalId: string;
  userId: string;
  // isLoved: boolean; // The current "loved" state passed from the parent
  // handleLoveToggle: (animalId: string, userId: string, setIsLoading: (value: boolean) => void) => Promise<void>;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ animalId, userId }) => {
  const { handleLoveToggle, fetchLovelist } = useAnimals(); // Consume context
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoved] = useState<boolean>(false);
  
  // const isLoved = lovelist.some((animal) => animal.animalId === animalId);
  
  
  //     setIsLoved(loved); // Update the state

  // Check the "loved" status on component load
  // useEffect(() => {
  //   const checkLovedStatus = async () => {
  //     const loved = await isLoved2(animalId, userId); // Await the async function
  //     setIsLoved(loved); // Update the state
  //   };
  //   checkLovedStatus();
  // }, [animalId]);
  
  // Another nonworking option to display hearts onload:
  // Fetch initial love state

  const [isLoved, setIsLoved] = useState(false);

  useEffect(() => {
    const checkIfLoved = async () => {
      try {
        setIsLoading(true);
        const fetchedLovelist = await fetchLovelist(userId);
        const loveCheck = fetchedLovelist.some((animal) => animal.animalId === animalId);
        setIsLoved(loveCheck);
        console.log("Fetched Lovelist from HeartButton Component: ", fetchedLovelist);
      } catch (error) {
        console.error("Error fetching lovelist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkIfLoved();
  }, [animalId, userId, fetchLovelist]);

   // Optimistically update love state Finally working yeiii!
  // When handleLoveToggle is called, the isLoved state is immediately toggled to reflect the expected state in the UI.

   const toggleLove = async () => {
    try {
      setIsLoading(true);
      // Optimistic update
      setIsLoved((prev) => !prev);
      await handleLoveToggle(animalId, userId, setIsLoading);
    } catch (error) {
      console.error("Error toggling love state:", error);
      // Revert optimistic update in case of error
      setIsLoved((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <button
      onClick={toggleLove}
      className={`mr-2 text-2xl p-1 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={isLoading} // Disable while loading
    >
      {isLoading ? (
        <svg
          className="animate-spin h-6 w-6 text-violet-100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : isLoved ? (
        <HeartSolidIcon className="h-6 w-6 text-violet-100" />
      ) : (
        <HeartOutlineIcon className="h-6 w-6 text-violet-100" />
      )}
    </button>
  );
};
