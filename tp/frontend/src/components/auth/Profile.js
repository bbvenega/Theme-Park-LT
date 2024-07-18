import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  useEffect(() => {
    const sendTokenToBackend = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("token:", token);
        await axios.post("http://localhost:8080/api/authenticate", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });

        console.log("Token sent to backend successfully");
      } catch (error) {
        console.error("error: sending token to backend: ", error);
      } 
    };

    if (isAuthenticated) {
      sendTokenToBackend();
    }
  }, [isAuthenticated, getAccessTokenSilently]);


  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
