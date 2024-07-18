import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import AttractionsList from "../components/AttractionsList";
import AddAttractionToVisit from '../components/AddAttractionToVisit';
import {getVisitDetails} from '../services/VisitService';
import {useAuth0} from '@auth0/auth0-react';

const VisitPage = () => {
    const {visitId} = useParams();
    const [visitDetails, setVisitDetails] = useState(null);
    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const fetchVisitDetails = async () => {
            try {
            const data = await getVisitDetails(visitId);
            setVisitDetails(data);
        } catch (error) {
            console.error("Error fetching visit details: ", error);
        }
    };

    fetchVisitDetails();
}, [visitId, getAccessTokenSilently]);

    return (
        <div>
            <h1>Visit Page</h1>
            {visitDetails ? (
                <div>
            <h2>Visited Attractions</h2>
            <ul> 
                {visitDetails.userAttractions.map((attraction) => (
                    <li key={attraction.attractionName}>{attraction.postedWaitTime} ~ {attraction.actualWaitTime}
                    </li>
                ))}
            </ul>
            </div>
            ) : (
                <p>Loading...</p>
            )}

            <AddAttractionToVisit visitId={visitId} />
        </div>
    );
};

export default VisitPage;