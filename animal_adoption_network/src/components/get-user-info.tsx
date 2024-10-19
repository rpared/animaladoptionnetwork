import axios from "axios";

const getUserInfo = async () => {
  try {
    const response = await axios.get("/api/userInfo");

    // Check if the response contains user data
    if (response.data.success && response.data.user) {
      console.log("User data:", response.data.user);
      return response.data.user;
    } else {
      console.error("User data not found in response");
      return null; // Return null if no user data found
    }
  } catch (err) {
    console.error("Error fetching user info:", err);
    return null; // Return null on error
  }
};

export default getUserInfo;
