"use client";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import AdoptersDashboard from "@/components/adopters-dashboard";
import HeaderAdopters from "@/components/header-adopters";
import { AdoptionRequest } from "@/app/shelters/requests/page";
import getUserInfo from "@/components/get-user-info";


const RequestList = () => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AdoptionRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adopterId, setAdopterId] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [readFilter, setReadFilter] = useState("unread");
  const [showMap, setShowMap] = useState(false);

  const ApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // const shelterLatitude = 43.668331;
  // const shelterLongitude = -79.39060;
  // const URI = "https://www.google.com/maps/embed/v1/place?key="+ ApiKey + "&q=" + latitude +","+ longitude;


  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      if (user) {
        setAdopterId(user._id);
      } else {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (adopterId) {
      const fetchRequests = async () => {
        try {
          const response = await axios.get("/api/adoptionRequest", {
            params: { adopter: adopterId, isArchived: readFilter === "read" },
          });
      
          const requests = response.data.requests;
      
          // Fetch animal names for all requests concurrently
          const animalIds = requests.map((req: AdoptionRequest) => req.animal);
          const animalNameMap: { [key: string]: string } = {};
      
          await Promise.all(
            animalIds.map(async (animalId: string) => {
              try {
                const res = await axios.get(`/api/animals?animalId=${animalId}`);
                const animal = res.data.animals.find((a: { _id: string }) => a._id === animalId);
                if (animal) {
                  animalNameMap[animalId] = animal.name;
                } else {
                  console.error(`Animal with ID ${animalId} not found in response`);
                }
              } catch (err) {
                console.error(`Failed to fetch animal with ID: ${animalId}`, err);
              }
            })
          );
      
          const updatedRequests = requests.map((req: AdoptionRequest) => ({
            ...req,
            animalName: animalNameMap[req.animal] || "Unknown Animal",
            isArchived: req.status === "pending" ? false : req.isArchived, // Ensure isArchived is false for pending requests
            shelterLatitude: req.shelterLatitude, // Include these in your schema if not present
  shelterLongitude: req.shelterLongitude,
          }));




          setAdoptionRequests(updatedRequests);
          setFilteredRequests(updatedRequests);
          // setLatitude(updatedRequests.shelterLatitude);
          // setLongitude(updatedRequests.shelterLongitude);
          console.log("Latitude: ", latitude);
        } catch (error) {
          setError("Failed to fetch requests.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchRequests();
    }
  }, [adopterId, readFilter]);

  useEffect(() => {
    filterRequests();
  }, [statusFilter, readFilter, adoptionRequests]);

  const filterRequests = () => {
    let filtered = adoptionRequests;
  
    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }
  
    if (readFilter === "unread") {
      filtered = filtered.filter((request) => !request.isArchived);
    } else if (readFilter === "read") {
      filtered = filtered.filter((request) => request.isArchived);
    }
  
    setFilteredRequests(filtered);
  };

  const handleArchiveToggle = async (id: string, isArchived: boolean) => {
    console.log(`Toggling archive status for request ID: ${id}, current status: ${isArchived}`);
    try {
      const response = await axios.put(`/api/adoptionRequest/archive`, { id, isArchived: !isArchived });
      console.log('API response:', response.data);
      if (response.data.success) {
        const updatedRequest = response.data.adoptionRequest;
        setAdoptionRequests((prevRequests) => prevRequests.map((request) =>
          request._id === id ? updatedRequest : request
        ));
      } else {
        setError("Failed to update request.");
      }
    } catch (error) {
      setError("Failed to update request.");
      console.error(error);
    }
  };

  // Set the initial map location on page load
  useEffect(() => {
    if (filteredRequests.length > 0) {
      setLatitude(filteredRequests[0].shelterLatitude ?? 0);
      setLongitude(filteredRequests[0].shelterLongitude ?? 0);
    }
  }, [filteredRequests]);

  const handleToggleMap = (lat: SetStateAction<number> | undefined, lng: SetStateAction<number> | undefined) => {
    if (lat !== undefined && lng !== undefined) {
      setLatitude(lat);
      setLongitude(lng);
    }
    setShowMap(!showMap);
  };




  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    

  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-2 text-gray-600">
        <div className="p-6">
          <h1 className="text-4xl mb-4 font-semibold text-brown">My Adoption Requests</h1>

          {/* Status Filter */}
          <div className="mb-4">
            <label className="text-gray-700 mr-1">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded p-2"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Read Filter */}
          <div className="mb-4">
            <label className="text-gray-700 mr-1">Filter by Read/Unread:</label>
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="border rounded p-2"
            >
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Requests List */}
          <div className="grid gap-4 grid-cols-1">
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className="border p-4 rounded shadow-md bg-white flex flex-col lg:flex-row"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <p className="text-brown p-1">
                      <b>Animal Name:</b> <br />
                      <span className="text-2xl">{request.animalName}</span>
                    </p>
                    <p>
                      <strong>Status:</strong> {request.status}
                    </p>
                    <p>
                      <strong>Request Date:</strong>{" "}
                      {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                    {request.status !== "pending" && (
                      <>
                        <p>
                          <strong>Message:</strong> {request.replyMessage}
                        </p>
                        <button
                          onClick={() =>
                            handleArchiveToggle(
                              request._id,
                              request.isArchived ?? false
                            )
                          }
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                          {request.isArchived ? "Mark as Unread" : "Mark as Read"}
                        </button>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {request.shelterName && (
                      <>
                        <p>
                          <strong>Shelter:</strong> {request.shelterName}
                        </p>
                        <p>
                          <strong>Address:</strong> {request.shelterAddress}
                        </p>
                        <button
                          onClick={() =>
                            handleToggleMap(
                              request.shelterLatitude,
                              request.shelterLongitude
                            )
                          }
                          className="bg-violet-100 text-white px-4 py-2 rounded hover:bg-violet-70"
                        >
                          {showMap && latitude === request.shelterLatitude
                            ? "Hide Map"
                            : "View Map"}
                        </button>
                        {showMap && latitude === request.shelterLatitude && (
                          <div id="Shelter's Google Maps Location" className="mt-4">
                            <iframe
                              className="w-full h-60 rounded"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              src={`https://www.google.com/maps/embed/v1/place?key=${ApiKey}&q=${latitude},${longitude}`}
                            ></iframe>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default RequestList;