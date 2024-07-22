import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { formatTime } from '../services/formatTime';

const EditAttractionModal = ({ show, onClose, attraction, onSave, onDelete }) => {
    const [postedWaitTime, setPostedWaitTime] = useState(attraction?.postedWaitTime || "");
    const [actualWaitTime, setActualWaitTime] = useState(attraction?.actualWaitTime || "");
    const [fastpass, setFastpass] = useState(attraction?.fastpass || false);
    const [singleRider, setSingleRider] = useState(attraction?.singleRider || false);
    const [brokeDown, setBrokeDown] = useState(attraction?.brokeDown || false);
    const [timeOfDay, setTimeOfDay] = useState(attraction?.timeOfDay || "");

    console.log("attraction: ", attraction);

    const handleSave = () => {
        onSave({
            ...attraction,
            timeOfDay,
            postedWaitTime,
            actualWaitTime,
            fastpass,
            singleRider,
            brokeDown,
        })
    };

    const handleDelete = () => {
        onDelete(attraction.id);
    };

    if (!show) {
        return null;
    }

    return (
        <div className = "modal-backdrop">
            <div className= "modal-content">
                <button onClick= {onClose} className = "modal-close-button"> &times; </button>
                <h3>Edit Attraction</h3>
                <label>
                    Posted Wait Time:
                    <input
                        type="number"
                        value={postedWaitTime}
                        onChange={(e) => setPostedWaitTime(e.target.value)}
                    />
                </label>
                <label>
                    Actual Wait Time:
                    <input
                        type="number"
                        value={actualWaitTime}
                        onChange={(e) => setActualWaitTime(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    <input
                        type="checkbox"
                        checked={fastpass}
                        onChange={(e) => setFastpass(e.target.checked)}
                    />
                    Fastpass?
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={singleRider}
                        onChange={(e) => setSingleRider(e.target.checked)}
                    />
                    Single Rider?
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={brokeDown}
                        onChange={(e) => setBrokeDown(e.target.checked)}
                    />
                    Broke Down?
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );

};

export default EditAttractionModal;