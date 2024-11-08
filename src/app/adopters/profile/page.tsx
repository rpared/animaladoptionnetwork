// adopters/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import getUserInfo from "@/components/get-user-info";
import HeaderAdopters from "@/components/header-adopters";
import AdoptersDashboard from "@/components/adopters-dashboard";

const UserProfile = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  interface Adoption {
    _id: string;
  }

  const [adoptionHistory, setAdoptionHistory] = useState<Adoption[]>([]); // Array for adoption history
  const [householdSize, setHouseholdSize] = useState(0); // Initial household size
  const [hasOtherPets, setHasOtherPets] = useState(false);
  const [otherPetDetails, setOtherPetDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setFname(user.fname);
        setLname(user.lname);
        setEmail(user.email);
        // setPassword(user.password);
        setProvince(user.province);
        setCity(user.city);
        setAddress(user.address);
        setPhone(user.phone);
        setAdoptionHistory(user.adoptionHistory);
        setHouseholdSize(user.householdSize);
        setHasOtherPets(user.hasOtherPets);
        setOtherPetDetails(user.otherPetDetails);
        setLoading(false);
      } else {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Update user profile PUT request
  const handleUpdateProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const updatedData = {
        userType: "adopter",
        fname: fName,
        lname: lName,
        email: email,
        // Only send the password if it's not empty
        ...(password && { password }), // Spread the password only if provided
        province: province,
        city: city,
        address: address,
        householdSize: householdSize,
        hasOtherPets: hasOtherPets,
        otherPetDetails: otherPetDetails,
      };

      const response = await axios.put("/api/userInfo", updatedData);
      if (response.data.success) {
        alert("Profile updated successfully!");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("Error updating profile: " + err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-2 text-gray-600 ">
        <div className="mx-auto max-w-[800px] relative isolate pt-6 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Adopter Profile
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <form
            onSubmit={handleUpdateProfile}
            className="w-full mx-auto max-w-lg bg-white p-8 shadow-lg rounded-lg"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                value={fName|| ''}
                onChange={(e) => setFname(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                Last Name *
              </label>
              <input
                type="text"
                value={lName || ''}
                onChange={(e) => setLname(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                Email *
              </label>
              <input
                type="email"
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                Password *
              </label>
              <input
                type="password"
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 pl-2 border border-gray-300 rounded-md pt-2"
                placeholder="Enter new password (optional)"
               
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                Province
              </label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="w-full block text-sm font-medium text-gray-700 pt-2"></label>
              {/* Check if adoptionHistory has any entries */}
              {adoptionHistory.length > 0 ? (
                <ul className="list-disc pl-4">
                  {adoptionHistory.map((adoption: Adoption) => (
                    <li key={adoption._id}>
                      {/* Access details from adoption object */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No past adoptions found.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 pt-4">
                Household Size (number of people living with you)
              </label>
              <input
                type="number"
                value={householdSize}
                onChange={(e) => setHouseholdSize(parseInt(e.target.value))}
                className="mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 p-2 pl-0 mt-2">
                Other Pets
              </label>
              <input
                type="checkbox"
                checked={hasOtherPets}
                onChange={(e) => setHasOtherPets(e.target.checked)}
                className=" border border-gray-300 rounded-md p-2 mb-2 mt-2"
              />
            </div>
            {hasOtherPets && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="otherPetDetails"
                >
                  Details about other pets
                </label>
                <textarea
                  id="otherPetDetails"
                  className="p-2 w-full border border-gray-300 rounded-md"
                  value={otherPetDetails}
                  onChange={(e) => setOtherPetDetails(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-violet-100 text-white px-4 py-2 rounded-md mt-2"
            >
              Update Profile
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
