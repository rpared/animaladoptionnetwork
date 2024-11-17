"use client";
import HeaderShelters from "@/components/header-shelters";
import DashboardLayout from "@/components/shelters-dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

import getUserInfo from "@/components/get-user-info";


interface AdoptionRequest {
    _id: string;
    adopter: string;
    animal: string;
    status: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    id: string;
    address: string;
    householdSize: number;
    hasOtherPets: boolean;
    salaryRange: string;
    personalReference: string;
    personalReferencePhone: string;
    requestDate: string;
    animalName?: string;
    animalIsAdopted?: boolean;
  }
  
  const ShelterRequests = () => {
    const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<AdoptionRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [operationMessages, setOperationMessages] = useState<{ [key: string]: string }>({});
    const [messages, setMessages] = useState<{ [key: string]: string }>({});
    const [statusFilter, setStatusFilter] = useState<string>("pending");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [disableButtons, setDisableButtons] = useState<{ [key: string]: boolean }>({});
    // const [latitude, setLatitude] = useState<number>(0);
    // const [longitude, setLongitude] = useState<number>(0);
    // const [disableButtons, setDisableButtons] = useState<string>("enabled");
    
  

      
  
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const response = await axios.get("/api/adoptionRequest");
          const requests = response.data.requests;
          setAdoptionRequests(requests);

          // Initialize disableButtons state for each request
        const initialDisableButtons = requests.reduce((acc: { [key: string]: boolean }, request: AdoptionRequest) => {
          acc[request._id] = false;
          return acc;
        }, {});
        setDisableButtons(initialDisableButtons)
  
          // Fetch animal names for all requests concurrently
          const animalIds = requests.map((req: AdoptionRequest) => req.animal);
          const animalNameMap: { [key: string]: string } = {};
          const animalIsAdoptedMap: { [key: string]: boolean } = {};
  
          await Promise.all(
            animalIds.map(async (animalId: string | number) => {
              try {
                const res = await axios.get(`/api/animals/individualAnimal/?animalId=${animalId}`);
                console.log("API response for animal:", res.data);
                animalNameMap[animalId] = res.data.name;
                animalIsAdoptedMap[animalId] = res.data.isAdopted !== undefined ? res.data.isAdopted : false; // Default to false if undefined
                
              } catch (err) {
                console.error(`Failed to fetch animal with ID: ${animalId}`, err);
              }
            })
          );
          
          console.log("animalIsAdoptedMap:", animalIsAdoptedMap);
          const updatedRequests = requests.map((req: AdoptionRequest) => ({
            ...req,
            animalName: animalNameMap[req.animal] || "Unknown Animal",
            animalIsAdopted: animalIsAdoptedMap[req.animal],
          }));
          
  
          setAdoptionRequests(updatedRequests);
          // Apply the initial status filter
        const initialFilteredRequests = updatedRequests.filter((request: { status: string; }) => request.status === statusFilter);
        setFilteredRequests(initialFilteredRequests);
      } catch (err) {
        setError("Failed to fetch adoption requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
      fetchRequests();
    }, []);
  
    // Filter adoption requests based on status and date
    useEffect(() => {
        filterRequests();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [startDate, endDate, statusFilter]);
    
      const filterRequests = () => {
        let filtered = adoptionRequests;
    
        // Filter by date range
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          filtered = filtered.filter(request => {
            const requestDate = new Date(request.requestDate);
            return requestDate >= start && requestDate <= end;
          });
        }
    
        // Filter by status
        if (statusFilter) {
          filtered = filtered.filter(request => request.status === statusFilter);
        }
    
        setFilteredRequests(filtered);
      };

      // Log adoptionRequests state changes
      useEffect(() => {
        console.log('Adoption Requests Updated:', adoptionRequests);
      }, [adoptionRequests]);

// Fetch Shelter data to include in Reply

const [shelterId, setShelterId] = useState<string>("");
const [shelterName, setShelterName] = useState<string>("");
const [shelterEmail, setShelterEmail] = useState<string>("");
const [shelterAddress, setShelterAddress] = useState<string>("");
const [shelterLatitude, setShelterLatitude] = useState<number>(0);
const [shelterLongitude, setShelterLongitude] = useState<number>(0);

useEffect(() => {
  const fetchUserData = async () => {
    const user = await getUserInfo();
    if (user) {
      setShelterId(user._id);
      setShelterName(user.name);
      setShelterEmail(user.email);
      setShelterAddress(user.address);
      setShelterLatitude(user.latitude);
      setShelterLongitude(user.longitude);

    } else {
      setError("Failed to load user data.");
      setLoading(false);
    }
  };
  fetchUserData();
}, []);


      // Event Handlers
  
      const handleApprove = async (id: string, animalId: string, animalName: string, message: string ) => {
        try {
          // Determine the default message
          const defaultMessage = `You are eligible to adopt ${animalName}. ${animalName} is available, contact us to book a visit. Please notice that the animal will be reserved for you once you confirm the visit.`;
      
          // Use the provided message or the default message
          const replyMessage = message || defaultMessage;

          // Log shelter properties
      console.log("Shelter Properties:", {
        shelterId,
        shelterName,
        shelterEmail,
        shelterAddress,
        shelterLatitude,
        shelterLongitude,
      });
      
          // Step 1: Update the adoption status (approve the adoption) disabled for now as this should be done after the visit
        //   const statusResponse = await axios.put(`/api/updateAdoptionStatus?animalId=${animalId}`, { isAdopted: true });
        //   console.log("Adoption status updated:", statusResponse.data);
      
          // Step 2: Update the adoption request with the replyMessage
          const requestResponse = await fetch('/api/adoptionRequest', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id, // The ID of the adoption request
              status: 'approved', // Set status to "approved"
              replyMessage, // Include the replyMessage for the adopter
              shelterId,
              shelterName,
              shelterEmail,
              shelterAddress,
              shelterLatitude,
              shelterLongitude,
            }),
          });
      
          if (!requestResponse.ok) {
            throw new Error('Failed to update adoption request');
          }
      
          // Parse the response from the adoption request API
          const responseData = await requestResponse.json();
          console.log('Adoption request updated:', responseData);
      
          // Set messages for the Adopter
          setMessages((prev) => ({
            ...prev,
            [id]: replyMessage, // Use the replyMessage
          }));

          // Update the status of the request in the state
          setAdoptionRequests((prevRequests) => {
            const updatedRequests = prevRequests.map((request) =>
              request._id === id ? { ...request, status: 'approved' } : request
            );
            console.log('Updated Requests:', updatedRequests);
            return updatedRequests;
          });
          


          // Set operation message for the specific request UI
          setOperationMessages((prev) => ({
            ...prev,
            [id]: "Request answered!",
          }));

          // Disable buttons for the specific request
          setDisableButtons((prev) => ({
            ...prev,
            [id]: true,
          }));
                  
        } catch (error) {
          console.error('Failed to approve adoption:', error);
        }
      };
      
      
  
      const handleReject = async (id: string, animalName: string, message: string, salary: string) => {
        try {
          // Determine the default message based on salary
          let defaultMessage;
          if (salary === "Below $30,000") {
            defaultMessage = `Sorry, you do not fit the minimum income requirements.`;
          } else {
            defaultMessage = `Sorry, ${animalName} was just reserved or adopted. Please check your email over the following 2 weeks in case ${animalName} becomes available again.`;
          }
      
          // Use the provided message or the default message
          const replyMessage = message || defaultMessage;
      
          // Send the PUT request to update the adoption request status
          const requestResponse = await fetch('/api/adoptionRequest', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id, // The ID of the adoption request
              status: 'rejected', // Set status to "rejected"
              replyMessage, // Include the replyMessage for the adopter
            }),
          });
      
          if (!requestResponse.ok) {
            throw new Error('Failed to update adoption request');
          }
      
          // Update the message state
          setMessages((prev) => ({
            ...prev,
            [id]: replyMessage, // Use the replyMessage
          }));
      
          // Update the status of the request in the state
          setAdoptionRequests((prevRequests) => {
            const updatedRequests = prevRequests.map((request) =>
              request._id === id ? { ...request, status: 'rejected' } : request
            );
            console.log('Updated Requests:', updatedRequests);
            return updatedRequests;
          });
      
          // Set operation message for the specific request UI
        setOperationMessages((prev) => ({
          ...prev,
          [id]: "Request answered!",
        }));

        // Disable buttons for the specific request
        setDisableButtons((prev) => ({
          ...prev,
          [id]: true,
        }));


        console.log(`Rejected request with ID: ${id}, Message: ${replyMessage}`);

        } catch (error) {
          console.error('Failed to reject adoption:', error);
        }
      };
      
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  return (
    <>
      <HeaderShelters />
      <DashboardLayout>
        <main className="bg-white my-2 text-gray-600">
          <div className="p-6">
          <h1 className="text-4xl mb-4 font-semibold text-brown">Adoption Requests</h1>
            {/* Date Range Filters */}
            <div className="mb-4">
              <label className=" text-gray-700 mr-1">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-2 mr-4"
              />
              <label className=" text-gray-700 mr-1">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <label className=" text-gray-700 mr-1">Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded p-2"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="">All</option>
              </select>
            </div>

            {filteredRequests.length === 0 ? (
              <p>No adoption requests found.</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                {filteredRequests.map((request) => (
                  <div
                    key={request._id}
                    className="border p-4 rounded shadow-md bg-white flex flex-col lg:flex-row"
                  >
                    <div className="flex-1 space-y-2">
                    {error && <p className="text-red-500">{error}</p>}
                    {operationMessages[request._id] && (
                      <p className="text-violet-100">{operationMessages[request._id]}</p>
                    )}
                    <p className="text-brown p-1">
                        <b>Animal Name:</b> <br /> <span className="text-2xl">{request.animalName}</span> 
                      </p>
                      <hr />
                      <p className=" text-violet-100"> Animal is adopted: <b><u> {request.animalIsAdopted ? "True" : "False"}</u></b> </p>
                      <hr />
                      <p>
                        <strong>Adopter Name:</strong> {request.fname} {request.lname}
                      </p>
                      <p>
                        <strong>Email:</strong> {request.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {request.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {request.address}
                      </p>
                      <p>
                        <strong>Household Size:</strong> {request.householdSize}
                      </p>
                      <p>
                        <strong>Has Other Pets:</strong> {request.hasOtherPets ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Salary Range:</strong> {request.salaryRange}
                      </p>
                      <p>
                        <strong>Personal Reference:</strong> {request.personalReference}
                      </p>
                      <p>
                        <strong>Reference Phone:</strong> {request.personalReferencePhone}
                      </p>
                      <p className="bg-violet-100 text-slate-100 p-1">
                      <b>Request Date:</b> {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                      <p>
                        <strong>Status:</strong> {request.status}
                      </p>
                    </div>
                    {request.status === "pending" && !disableButtons[request._id] && (
                    <div className="flex-1 flex flex-col justify-start items-start space-y-4 mt-4 lg:mt-0 lg:ml-4">
                    <textarea
                        placeholder="Enter a message (optional). Default messages will be sent if not specified."
                        value={messages[request._id] || ""}
                        onChange={(e) =>
                        setMessages((prev) => ({
                            ...prev,
                            [request._id]: e.target.value,
                        }))
                        }
                        disabled={request.status !== "pending" }
                        className="border p-2 rounded w-full resize-h min-h-[140px]"
                    ></textarea>

                    <div className="flex space-x-2">
                        <button
                        onClick={() =>
                            handleApprove(
                            request._id,
                            request.animal,
                            request.animalName || "Unknown Animal",
                            messages[request._id] || ""
                            )
                        }
                        disabled={request.status !== "pending"}
                        className="bg-violet-100 text-white px-4 py-2 rounded hover:bg-violet-70"
                        >
                        Approve
                        </button>
                        <button
                            onClick={() => handleReject(
                                request._id,
                                request.animalName || "Unknown Animal",
                                messages[request._id] || "", // Pass the message correctly
                                request.salaryRange
                            )}
                            disabled={request.status !== "pending"}
                            className="bg-brown text-white px-4 py-2 rounded hover:bg-red-400"
                            >
                            Reject
                        </button>
                        
                      </div>
                    </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default ShelterRequests;
