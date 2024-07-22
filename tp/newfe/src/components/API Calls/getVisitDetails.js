import axios from "axios";

export const getVisitDetails = async (visitId, getAccessTokenSilently) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.get(
      `http://localhost:8080/visits/${visitId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });

    return response.data;
    } catch (error) {
        console.error("Error fetching visit details: ", error);
        throw error;
    }
};

export const getVisitAttractions = async (visitId, getAccessTokenSilently) => {
    try {
      const token = await getAccessTokenSilently();
      const visitResponse = await axios.get(`http://localhost:8080/visits/${visitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const mainParkId = visitResponse.data.park.id;
      const individualParksResponse = await axios.get(`http://localhost:8080/parks/${mainParkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const individualParks = individualPparksResponse.data.parks;
      const attractionsPromises = individualParks.map((individualPark) =>
        axios.get(`http://localhost:8080/parks/${individualPark.id}/attractions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
  
      const responses = await Promise.all(attractionsPromises);
      return responses.flatMap((res) => res.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
      throw error;
    }
  };