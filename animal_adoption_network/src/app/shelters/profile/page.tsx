// shelters/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/shelters-dashboard";
import getUserInfo from "@/components/get-user-info";
import HeaderShelters from "@/components/header-shelters";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [administratorLastName, setAdministratorLastName] = useState("");
  const [administratorFirstName, setAdministratorFirstName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [charitableRegistrationNumber, setCharitableRegistrationNumber] =
    useState("");
  const [operatingLicenseNumber, setOperatingLicenseNumber] = useState("");
  const [legalDocumentUrl, setLegalDocumentUrl] = useState("");
  // const [legalDocumentFileType, setLegalDocumentFileType] = useState("");
  // const [legalDocumentFileSize, setLegalDocumentFileSize] = useState(0);
  //   const [legalDocumentUploadedAt, setLegalDocumentUploadedAt] =
  //     useState<Date | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setUserName(user.name);
        setEmail(user.email);
        // setPassword(user.password);
        setAdministratorLastName(user.administratorLastName);
        setAdministratorFirstName(user.administratorFirstName);
        setProvince(user.province);
        setCity(user.city);
        setAddress(user.address);
        setCharitableRegistrationNumber(user.charitableRegistrationNumber);
        setOperatingLicenseNumber(user.operatingLicenseNumber);

        // Optional legal document fields
        if (user.documentUploads?.legalDocument) {
          setLegalDocumentUrl(user.documentUploads.legalDocument.url);
          // setLegalDocumentFileType(user.documentUploads.legalDocument.fileType);
          // setLegalDocumentFileSize(user.documentUploads.legalDocument.fileSize);
          //   setLegalDocumentUploadedAt(
          //     new Date(user.documentUploads.legalDocument.uploadedAt)
          //   );
        }

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedData: any = {
        userType: "shelter",
        name: userName,
        email: email,
        // Only send the password if it's not empty
        ...(password && { password }), // Spread the password only if provided
        administratorLastName: administratorLastName,
        administratorFirstName: administratorFirstName,
        province: province,
        city: city,
        address: address,
        charitableRegistrationNumber: charitableRegistrationNumber,
        operatingLicenseNumber: operatingLicenseNumber,
        documentUploads: {
          legalDocument: {
            url: legalDocumentUrl,
            // fileType: legalDocumentFileType,
            // fileSize: legalDocumentFileSize,
          },
        },
      };

      // Only add the password if the user has entered a value
      // if (password.trim() !== "") {
      //   updatedData.password = password;
      // }

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
      <HeaderShelters />
      <DashboardLayout>
        <main className="bg-white my-2 text-gray-600 ">
          <div className=" max-w-[600px] relative isolate pt-6 px-8">
            {/* <div className="p-6 text-gray-800"> */}
            <h1 className="text-4xl mb-4 font-semibold text-brown">
              Shelter Profile
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="w-full block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  placeholder="Enter new password (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Administrator Last Name
                </label>
                <input
                  type="text"
                  value={administratorLastName}
                  onChange={(e) => setAdministratorLastName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Administrator First Name
                </label>
                <input
                  type="text"
                  value={administratorFirstName}
                  onChange={(e) => setAdministratorFirstName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Charitable Registration Number
                </label>
                <input
                  type="text"
                  value={charitableRegistrationNumber}
                  onChange={(e) =>
                    setCharitableRegistrationNumber(e.target.value)
                  }
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Operating License Number
                </label>
                <input
                  type="text"
                  value={operatingLicenseNumber}
                  onChange={(e) => setOperatingLicenseNumber(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Legal Document URL (Optional)
                </label>
                <input
                  type="url"
                  value={legalDocumentUrl}
                  onChange={(e) => setLegalDocumentUrl(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-violet-100 text-white px-4 py-2 rounded-md"
              >
                Update Profile
              </button>
            </form>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default UserProfile;
