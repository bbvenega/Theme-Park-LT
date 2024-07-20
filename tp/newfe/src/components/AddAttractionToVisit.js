// import React, { useState } from 'react';
import AttractionsList from './AttractionsList';


const AddAttractionToVisit = ({ visitId, onAddAttraction }) => {
    return (
        <div>
            <h2>Add Attraction</h2>
            <AttractionsList visitId={visitId} onAddAttraction={onAddAttraction} />
        </div>
    );
};

export default AddAttractionToVisit;
