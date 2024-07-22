import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';

const EditAttractionModal = ({ show, onClose, attraction, onSave, onDelete }) => {
    const [postedWaitTime, setPostedWaitTime] = useState("");
    const [actualWaitTime, setActualWaitTime] = useState("");
    const [fastpass, setFastpass] = useState(false);
    const [singleRider, setSingleRider] = useState(false);
    const [brokeDown, setBrokeDown] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState("");
    const [isVisibile, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);

    useEffect(() => {
        if (attraction) {
            setPostedWaitTime(attraction.postedWaitTime || "") ;
            setActualWaitTime(attraction.actualWaitTime || "");
            setFastpass(attraction.fastpass || false);
            setSingleRider(attraction.singleRider || false);
            setBrokeDown(attraction.brokeDown || false);
            setTimeOfDay(attraction.timeOfDay || "");
        }
    }, [attraction]);



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



    return (
        <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
            <div className={`modal-content ${show ? 'fade-in' : 'fade-out'}`}>
                <button onClick={onClose} className="modal-close-button"> &times; </button>
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
                <br />
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
                <button className="button" onClick={handleSave}>Save</button>
                <button className="button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );

};

export default EditAttractionModal;
