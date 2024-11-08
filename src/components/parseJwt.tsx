const parseJwt = (token: string) => {
  try {
    // Split the token and get the payload (the second part)
    const base64Url = token.split(".")[1];

    // Base64 URL decode the payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // Parse the JSON payload
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error parsing JWT", e);
    return null;
  }
};

export default parseJwt;
