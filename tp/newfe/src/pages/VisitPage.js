import React from 'react';
import { useParams } from 'react-router-dom';
import AttractionsList from "../components/AttractionsList";
import AddAttractionToVisit from '../components/AddAttractionToVisit';

const VisitPage = () => {
    const {visitId} = useParams();

    return (
        <div>
            <h1>Visit Page</h1>
            <AddAttractionToVisit visitId={visitId} />
        </div>
    );
};

export default VisitPage;