import React, { useState } from 'react';
import AttractionsList from './AttractionsList';

const AddAttractionToVisit = ({ visitId }) => {
    return (
        <div>
            <h2>Add Attraction</h2>
            <AttractionsList visitId={visitId} />
        </div>
    );
};

export default AddAttractionToVisit;
