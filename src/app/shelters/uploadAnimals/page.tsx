<<<<<<< HEAD
"use client";
import { useEffect, useState } from "react";
import HeaderShelters from "@/components/header-shelters";
import DashboardLayout from "@/components/shelters-dashboard";
import axios from "axios";
import getUserInfo from "@/components/get-user-info";

const UploadAnimals = () => {
  const [shelterId, setShelterId] = useState("");
  const [userName, setUserName] = useState<string | null>(null); // State to store user's name

  // Fetch shelter data to retrieve the shelterId
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setShelterId(user._id);
        setUserName(user.name); // Set the user's name in state
      }
    };
    fetchUserData();
  }, []);

  const initialAnimalData = {
    name: "",
    species: "",
    breed: "",
    age: 0,
    weight: 0,
    gender: "Unknown",
    description: "",
    medicalHistory: "",
    isAdopted: false,
  };

  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [animalData, setAnimalData] = useState(initialAnimalData);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null); // Single photo

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setAnimalData({
      ...animalData,
      [name]: value,
    });
  };

  // Handle file selection for a single photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5 MB limit
      if (file.size > maxSize) {
        setError("File size exceeds the 5 MB limit.");
        setSelectedPhoto(null);
      } else {
        setSelectedPhoto(file);
        setError(""); // Clear any previous error
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object to hold the data
    const formData = new FormData();

    // Append animal data to FormData
    Object.entries(animalData).forEach(([key, value]) => {
      formData.append(key, String(value)); // Convert value to string
    });

    // Append shelterId to FormData
    formData.append("shelter", shelterId); // Add shelter ID

    console.log("The shelter Id is: ", shelterId);
    console.log("The username is: ", userName);

    // Append photo to FormData
    if (selectedPhoto) {
      const arrayBuffer = await readFileAsArrayBuffer(selectedPhoto);
      console.log("arrayBuffer: ", arrayBuffer);
      const blob = new Blob([arrayBuffer], { type: selectedPhoto.type });
      console.log("blob: ", blob);
      formData.append("photo", blob, selectedPhoto.name); // Add photo as Blob
    }

    console.log("Form data before submission: ");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Submit the form data to the Upload API
    try {
      const response = await axios.post("/api/uploadAnimals", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // alert('Animal uploaded successfully!');
        setStatusMessage("Animal uploaded successfully!");

        // Reset the form fields after successful upload
        setAnimalData(initialAnimalData);
        setSelectedPhoto(null); // Reset selected photo

        console.log(response.data.animal);
      } else {
        setError("Failed to upload animal data.");
      }
    } catch (error) {
      console.error("Error uploading animal:", error);
      setError("Error uploading animal.");
    }
  };

  // Helper function to read file as ArrayBuffer
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      <HeaderShelters />
      <DashboardLayout>
        <main className="bg-white my-2 text-gray-600 ">
          <div className=" max-w-[600px] relative isolate pt-6 px-8">
            {/* <div className="p-6 text-gray-800"> */}
            <h1 className="text-4xl mb-4 font-semibold text-brown">
              Upload Animals
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            {statusMessage && (
              <p className="text-violet-100">{statusMessage}</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={animalData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Species */}
              <div>
                <label className="block text-sm font-medium" htmlFor="species">
                  Species *
                </label>
                <select
                  name="species"
                  value={animalData.species}
                  onChange={handleChange}
                  required
                  className="w-220 p-2 border rounded-md"
                >
                  {[
                    "Dog",
                    "Cat",
                    "Rabbit",
                    "Bird",
                    "Racoon",
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
                  ].map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className="block text-sm font-medium">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={animalData.breed}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={animalData.age}
                  onChange={handleChange}
                  className="w-220 p-2 border rounded-md"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={animalData.weight}
                  onChange={handleChange}
                  className="w-220 p-2 border rounded-md"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium" htmlFor="gender">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={animalData.gender}
                  onChange={handleChange}
                  required
                  className="w-220 p-2 border rounded-md"
                >
                  {["Unknown", "Male", "Female"].map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={animalData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={animalData.medicalHistory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* File upload field for photos */}
              <div className="mb-4">
                <label htmlFor="photo">Upload Photo:</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="p-2 border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-violet-200"
              >
                Upload Animal
              </button>
            </form>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default UploadAnimals;

// Various failed attempts to upload animals with photos:
//Failed attempt to load formData (multipart object with photos) But works to upload just the data without photos
/* eslint-disable prefer-const */
// "use client";
// import { useEffect, useState } from "react";
// import HeaderShelters from "@/components/header-shelters";
// import DashboardLayout from "@/components/shelters-dashboard";
// // import axios from "axios";
// import getUserInfo from "@/components/get-user-info";

// const UploadAnimals = () => {
//   const [shelterId, setShelterId] = useState("");
//   const [userName, setUserName] = useState<string | null>(null); // State to store user's name

//   // Fetch shelter data to retrieve the shelterId
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = await getUserInfo();
//       if (user) {
//         setShelterId(user._id);
//         setUserName(user.name); // Set the user's name in state
//       }
//     };
//     fetchUserData();
//   }, []);

//   const initialAnimalData = {
//     name: "",
//     species: "Dog", // default to dog
//     breed: "",
//     age: 0,
//     weight: 0,
//     gender: "Unknown",
//     description: "",
//     medicalHistory: "",
//     isAdopted: false,
//   };

//   const [error, setError] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [animalData, setAnimalData] = useState(initialAnimalData);
//   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null); // Single photo

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setAnimalData({
//       ...animalData,
//       [name]: value,
//     });
//   };

//   // Handle file selection for a single photo
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       const maxSize = 5 * 1024 * 1024; // 5 MB limit
//       if (file.size > maxSize) {
//         setError("File size exceeds the 5 MB limit.");
//         setSelectedPhoto(null);
//       } else {
//         setSelectedPhoto(file);
//         setError(""); // Clear any previous error
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Create FormData object to hold the data
//     const formData = new FormData();

//     // Append animal data to FormData
//     Object.entries(animalData).forEach(([key, value]) => {
//       formData.append(key, String(value)); // Convert value to string
//     });

//     // Append shelterId to FormData
//     formData.append("shelter", shelterId); // Add shelter ID

//     console.log("The shelter Id is: ", shelterId);
//     console.log("The username is: ", userName);

//     // Append photo to FormData
//     if (selectedPhoto) {
//       formData.append("photo", selectedPhoto); // Add single photo
//       console.log("Selected photo:", selectedPhoto);
//       console.log(
//         "Selected photo:",
//         selectedPhoto.name,
//         selectedPhoto.type,
//         selectedPhoto.size
//       );
//     }

//     console.log("Form data before submission: ");
//     formData.forEach((value, key) => {
//       console.log(`${key}: ${value}`);
//     });

//     // Submit the form data to the Upload API
//     // try {
//     //   const response = await axios.post("/api/uploadAnimals", formData, {
//     //     headers: {
//     //       "Content-Type": "multipart/form-data",
//     //     },
//     //   });
//     try {
//       const response = await fetch("/api/uploadAnimals", {
//         method: "POST",
//         body: formData, // formData automatically sets Content-Type to multipart/form-data
//       });

//       if (response.status === 201) {
//         alert("Animal uploaded successfully!");
//         setStatusMessage("Animal uploaded successfully!");

//         // Reset the form fields after successful upload
//         setAnimalData(initialAnimalData);
//         setSelectedPhoto(null); // Reset selected photo
//       } else {
//         setError("Failed to upload animal data.");
//       }
//     } catch (error) {
//       console.error("Error uploading animal:", error);
//       setError("Error uploading animal.");
//     }
//   };

//   return (
//     <>
//       <HeaderShelters />
//       <DashboardLayout>
//         <main className="bg-white my-2 text-gray-600 ">
//           <div className=" max-w-[600px] relative isolate pt-6 px-8">
//             {/* <div className="p-6 text-gray-800"> */}
//             <h1 className="text-4xl mb-4 font-semibold text-brown">
//               Upload Animals
//             </h1>
//             {error && <p className="text-red-500">{error}</p>}
//             {statusMessage && (
//               <p className="text-violet-100">{statusMessage}</p>
//             )}
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4"
//               encType="multipart/form-data"
//             >
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium" htmlFor="name">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={animalData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* Species */}
//               <div>
//                 <label className="block text-sm font-medium" htmlFor="species">
//                   Species *
//                 </label>
//                 <select
//                   name="species"
//                   value={animalData.species}
//                   onChange={handleChange}
//                   required
//                   className="w-220 p-2 border rounded-md"
//                 >
//                   {[
//                     "Dog",
//                     "Cat",
//                     "Rabbit",
//                     "Bird",
//                     "Racoon",
//                     "Ferret",
//                     "Pig",
//                     "Goat",
//                     "Duck",
//                     "Chicken",
//                     "Turkey",
//                     "Possum",
//                     "Guinea Pig",
//                     "Hamster",
//                     "Mouse",
//                     "Rat",
//                   ].map((species) => (
//                     <option key={species} value={species}>
//                       {species}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Breed */}
//               <div>
//                 <label className="block text-sm font-medium">Breed</label>
//                 <input
//                   type="text"
//                   name="breed"
//                   value={animalData.breed}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* Age */}
//               <div>
//                 <label className="block text-sm font-medium">Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={animalData.age}
//                   onChange={handleChange}
//                   className="w-220 p-2 border rounded-md"
//                 />
//               </div>

//               {/* Weight */}
//               <div>
//                 <label className="block text-sm font-medium">Weight (kg)</label>
//                 <input
//                   type="number"
//                   name="weight"
//                   value={animalData.weight}
//                   onChange={handleChange}
//                   className="w-220 p-2 border rounded-md"
//                 />
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="block text-sm font-medium" htmlFor="gender">
//                   Gender *
//                 </label>
//                 <select
//                   name="gender"
//                   value={animalData.gender}
//                   onChange={handleChange}
//                   required
//                   className="w-220 p-2 border rounded-md"
//                 >
//                   {["Unknown", "Male", "Female"].map((gender) => (
//                     <option key={gender} value={gender}>
//                       {gender}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <textarea
//                   name="description"
//                   value={animalData.description}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* Medical History */}
//               <div>
//                 <label className="block text-sm font-medium">
//                   Medical History
//                 </label>
//                 <textarea
//                   name="medicalHistory"
//                   value={animalData.medicalHistory}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* File upload field for photos */}
//               <div className="mb-4">
//                 <label htmlFor="photo">Upload Photo:</label>
//                 <input
//                   type="file"
//                   name="photo"
//                   onChange={handleFileChange}
//                   className="p-2 border rounded-md"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="mt-4 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-violet-200"
//               >
//                 Upload Animal
//               </button>
//             </form>
//           </div>
//         </main>
//       </DashboardLayout>
//     </>
//   );
// };

// export default UploadAnimals;

=======
>>>>>>> sara2
// //Working code to upload animals without photos
// "use client";
// import { useEffect, useState } from "react";
// import HeaderShelters from "@/components/header-shelters";
// import DashboardLayout from "@/components/shelters-dashboard";
// import axios from "axios";
// import getUserInfo from "@/components/get-user-info";

// const UploadAnimals = () => {
//   const [shelterId, setShelterId] = useState("");
//   const [userName, setUserName] = useState<string | null>(null); // State to store user's name
//   // Fetch shelter data to retrieve the shelterId
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = await getUserInfo();
//       if (user) {
//         setShelterId(user._id);
//         setUserName(user.name); // Set the user's name in state
//       }
//     };
//     fetchUserData();
//   }, []);
//   console.log(userName, shelterId);

//   const initialAnimalData = {
//     name: "",
//     species: "",
//     breed: "",
//     age: 0,
//     weight: 0,
//     gender: "Unknown",
//     description: "",
//     medicalHistory: "",
//     isAdopted: false,
//     photos: [],
//   };

//   const [error, setError] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [animalData, setAnimalData] = useState({
//     name: "",
//     species: "Dog", // default to dog
//     breed: "",
//     age: 0,
//     weight: 0,
//     gender: "Unknown", // default to Unknown
//     description: "",
//     medicalHistory: "",
//     isAdopted: false,
//     // photos: [],
//   });
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setAnimalData({
//       ...animalData,
//       [name]: value,
//     });

//     setAnimalData((animalData) => ({
//       ...animalData,
//       shelter: shelterId, // Appending shelterId to the animalData state
//     }));

//     console.log(animalData);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/api/uploadAnimals", animalData);
//       if (response.status === 201) {
//         alert("Animal uploaded successfully!");
//         setStatusMessage("Animal uploaded successfully!");

//         // Reset the form fields after successful upload
//         setAnimalData(initialAnimalData);
//       } else {
//         setError("Failed to upload animal data.");
//         setStatusMessage("Failed to upload animal data.");
//       }
//     } catch (error) {
//       console.error("Error uploading animal:", error);
//     }
//   };

//   return (
//     <>
//       <HeaderShelters />
//       <DashboardLayout>
//         <main className="bg-white my-2 text-gray-600 ">
//           <div className=" max-w-[600px] relative isolate pt-6 px-8">
//             {/* <div className="p-6 text-gray-800"> */}
//             <h1 className="text-4xl mb-4 font-semibold text-brown">
//               Upload Animals
//             </h1>
//             {error && <p className="text-red-500">{error}</p>}
//             {statusMessage && (
//               <p className="text-violet-100">{statusMessage}</p>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium" htmlFor="name">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={animalData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* Species */}
//               <div>
//                 <label className="block text-sm font-medium" htmlFor="species">
//                   Species *
//                 </label>
//                 <select
//                   name="species"
//                   value={animalData.species}
//                   onChange={handleChange}
//                   required
//                   className="w-220 p-2 border rounded-md"
//                 >
//                   {[
//                     "Dog",
//                     "Cat",
//                     "Rabbit",
//                     "Bird",
//                     "Racoon",
//                     "Ferret",
//                     "Pig",
//                     "Goat",
//                     "Duck",
//                     "Chicken",
//                     "Turkey",
//                     "Possum",
//                     "Guinea Pig",
//                     "Hamster",
//                     "Mouse",
//                     "Rat",
//                   ].map((species) => (
//                     <option key={species} value={species}>
//                       {species}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Breed */}
//               <div>
//                 <label className="block text-sm font-medium">Breed</label>
//                 <input
//                   type="text"
//                   name="breed"
//                   value={animalData.breed}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* Age */}
//               <div>
//                 <label className="block text-sm font-medium">Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={animalData.age}
//                   onChange={handleChange}
//                   className="w-220 p-2 border rounded-md"
//                 />
//               </div>

//               {/* Weight */}
//               <div>
//                 <label className="block text-sm font-medium">Weight (kg)</label>
//                 <input
//                   type="number"
//                   name="weight"
//                   value={animalData.weight}
//                   onChange={handleChange}
//                   className="w-220 p-2 border rounded-md"
//                 />
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="block text-sm font-medium" htmlFor="gender">
//                   Gender *
//                 </label>
//                 <select
//                   name="gender"
//                   value={animalData.gender}
//                   onChange={handleChange}
//                   required
//                   className="w-220 p-2 border rounded-md"
//                 >
//                   {["Unknown", "Male", "Female"].map((gender) => (
//                     <option key={gender} value={gender}>
//                       {gender}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <textarea
//                   name="description"
//                   value={animalData.description}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* Medical History */}
//               <div>
//                 <label className="block text-sm font-medium">
//                   Medical History
//                 </label>
//                 <textarea
//                   name="medicalHistory"
//                   value={animalData.medicalHistory}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               {/* File upload field for photos */}
//               {/* <div className="mb-4">
//                 <label htmlFor="photos">Upload Photos (up to 5):</label>
//                 <input
//                   type="file"
//                   id="photos"
//                   name="photos"
//                   multiple
//                   // onChange={handleFileChange}
//                   className="p-2 border rounded-md"
//                 />
//               </div> */}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="mt-4 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-violet-200"
//               >
//                 Upload Animal
//               </button>
//             </form>
//           </div>
//         </main>
//       </DashboardLayout>
//     </>
//   );
// };

// export default UploadAnimals;
<<<<<<< HEAD
=======

//Failed attempt to load formData (multipart object with photos) But works to upload just the data without photos
/* eslint-disable prefer-const */
"use client";
import { useEffect, useState } from "react";
import HeaderShelters from "@/components/header-shelters";
import DashboardLayout from "@/components/shelters-dashboard";
// import axios from "axios";
import getUserInfo from "@/components/get-user-info";

const UploadAnimals = () => {
  const [shelterId, setShelterId] = useState("");
  const [userName, setUserName] = useState<string | null>(null); // State to store user's name

  // Fetch shelter data to retrieve the shelterId
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setShelterId(user._id);
        setUserName(user.name); // Set the user's name in state
      }
    };
    fetchUserData();
  }, []);

  const initialAnimalData = {
    name: "",
    species: "Dog", // default to dog
    breed: "",
    age: 0,
    weight: 0,
    gender: "Unknown",
    description: "",
    medicalHistory: "",
    isAdopted: false,
  };

  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [animalData, setAnimalData] = useState(initialAnimalData);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null); // Single photo

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setAnimalData({
      ...animalData,
      [name]: value,
    });
  };

  // Handle file selection for a single photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5 MB limit
      if (file.size > maxSize) {
        setError("File size exceeds the 5 MB limit.");
        setSelectedPhoto(null);
      } else {
        setSelectedPhoto(file);
        setError(""); // Clear any previous error
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object to hold the data
    const formData = new FormData();

    // Append animal data to FormData
    Object.entries(animalData).forEach(([key, value]) => {
      formData.append(key, String(value)); // Convert value to string
    });

    // Append shelterId to FormData
    formData.append("shelter", shelterId); // Add shelter ID

    console.log("The shelter Id is: ", shelterId);
    console.log("The username is: ", userName);

    // Append photo to FormData
    if (selectedPhoto) {
      formData.append("photo", selectedPhoto); // Add single photo
      console.log("Selected photo:", selectedPhoto);
      console.log(
        "Selected photo:",
        selectedPhoto.name,
        selectedPhoto.type,
        selectedPhoto.size
      );
    }

    console.log("Form data before submission: ");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Submit the form data to the Upload API
    // try {
    //   const response = await axios.post("/api/uploadAnimals", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    try {
      const response = await fetch("/api/uploadAnimals", {
        method: "POST",
        body: formData, // formData automatically sets Content-Type to multipart/form-data
      });

      if (response.status === 201) {
        alert("Animal uploaded successfully!");
        setStatusMessage("Animal uploaded successfully!");

        // Reset the form fields after successful upload
        setAnimalData(initialAnimalData);
        setSelectedPhoto(null); // Reset selected photo
      } else {
        setError("Failed to upload animal data.");
      }
    } catch (error) {
      console.error("Error uploading animal:", error);
      setError("Error uploading animal.");
    }
  };

  return (
    <>
      <HeaderShelters />
      <DashboardLayout>
        <main className="bg-white my-2 text-gray-600 ">
          <div className=" max-w-[600px] relative isolate pt-6 px-8">
            {/* <div className="p-6 text-gray-800"> */}
            <h1 className="text-4xl mb-4 font-semibold text-brown">
              Upload Animals
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            {statusMessage && (
              <p className="text-violet-100">{statusMessage}</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={animalData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Species */}
              <div>
                <label className="block text-sm font-medium" htmlFor="species">
                  Species *
                </label>
                <select
                  name="species"
                  value={animalData.species}
                  onChange={handleChange}
                  required
                  className="w-220 p-2 border rounded-md"
                >
                  {[
                    "Dog",
                    "Cat",
                    "Rabbit",
                    "Bird",
                    "Racoon",
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
                  ].map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className="block text-sm font-medium">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={animalData.breed}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={animalData.age}
                  onChange={handleChange}
                  className="w-220 p-2 border rounded-md"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={animalData.weight}
                  onChange={handleChange}
                  className="w-220 p-2 border rounded-md"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium" htmlFor="gender">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={animalData.gender}
                  onChange={handleChange}
                  required
                  className="w-220 p-2 border rounded-md"
                >
                  {["Unknown", "Male", "Female"].map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={animalData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={animalData.medicalHistory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* File upload field for photos */}
              <div className="mb-4">
                <label htmlFor="photo">Upload Photo:</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="p-2 border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-violet-100 text-white py-2 px-4 rounded-md hover:bg-violet-200"
              >
                Upload Animal
              </button>
            </form>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default UploadAnimals;
>>>>>>> sara2
