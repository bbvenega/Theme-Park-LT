import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttractionsList = ({ visitId }) => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  console.log('visitId:', visitId);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const visitResponse = await axios.get(`/api/visits/${visitId}`);
        const mainParkId = visitResponse.data.parkId;

        const individualParksResponse = await axios.get(`/api/parks/${mainParkId}`);
        const individualParks = individualParksResponse.data.individualParks;

        const attractionsPromises = individualParks.map(individualPark =>
          axios.get(`/api/parks/${individualPark.id}/attractions`)
        );

        const responses = await Promise.all(attractionsPromises);
        const allAttractions = responses.flatMap(res => res.data);
        setAttractions(allAttractions);
      } catch (error) {
        console.error('Error fetching attractions:', error);
      }
    };

    fetchAttractions();
  }, [visitId]);

  const handleAttractionSelect = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleAddAttraction = async () => {
    if (selectedAttraction) {
      try {
        await axios.post(`/api/visits/${visitId}/attractions`, {
          attraction_id: selectedAttraction.id
        });
        alert('Attraction added!');
      } catch (error) {
        console.error("Error adding attraction: ", error);
      }
    }
  };

  return (
    <div>
      <h2>Attractions</h2>
      <ul>
        {attractions.map(attraction => (
          <li key={attraction.id} onClick={() => handleAttractionSelect(attraction)}>
            {attraction.name}
          </li>
        ))}
      </ul>
      {selectedAttraction && (
        <div>
          <h3>Selected Attraction: {selectedAttraction.name}</h3>
          <button onClick={handleAddAttraction}>Add Attraction</button>
        </div>
      )}
    </div>
  );
};

export default AttractionsList;
