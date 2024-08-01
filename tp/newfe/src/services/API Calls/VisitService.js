// VisitService is a collection of functions that are used to commuicate with the Database.

import axios from "axios";



// Gets and returns a user's visits from the database
export const getVisitsByUserId = async (user, getAccessTokenSilently) => {
  try {
    const userId = user.sub.split("|")[1];
    const token = await getAccessTokenSilently();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/visits/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching visits: ", error);
    console.log("User: ", user.sub.split("|")[1]);
    throw error;
  }
};

// Gets and returns the details of a visit from the database
export const getVisitDetails = async (visitId, getAccessTokenSilently) => {
  // console.log("User: ", user);
  try {
    const token = await getAccessTokenSilently();
    

    // console.log("User ID: ", userId);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/visits/${visitId}`,  
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching visit details: ", error);
    throw error;
  }
};

// Adds a visit to the database
export const addVisit = async (visit, getAccessTokenSilently) => {
  try {
    const token = await getAccessTokenSilently();
    console.log("Visit: ", visit);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/visits`, visit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.error("Error adding visit: ", error);
    throw error;
  }
};

// Fetches and returns the parks from the database
export const fetchParks = async (getAccessTokenSilently) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/parks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching parks: ", error);
    throw error;
  }
};

// Fetches and returns the attractions of a visit from the database
export const getVisitAttractions = async (visitId, getAccessTokenSilently) => {
  try {
    const token = await getAccessTokenSilently();
    const visitResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/visits/${visitId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const mainParkId = visitResponse.data.park.id;
    const individualParksResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/parks/${mainParkId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const individualParks = individualParksResponse.data.parks;
    const attractionsPromises = individualParks.map((individualPark) =>
      axios.get(
        `${process.env.REACT_APP_API_URL}/parks/${individualPark.id}/attractions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    const responses = await Promise.all(attractionsPromises);
    return responses.flatMap((res) => res.data);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    throw error;
  }
};

// Deletes a visit from the database
export const deleteVisit = async (visitId, getAccessTokenSilently) => {
  try {
    const token = await getAccessTokenSilently();
    await axios.delete(`${process.env.REACT_APP_API_URL}/visits/${visitId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching parks: ", error);
    throw error;
  }
};
