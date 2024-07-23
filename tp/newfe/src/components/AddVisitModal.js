import React, { useEffect, useState} from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import '../Styles/Modal.css';

const AddVisitModal = ({ show, onClose, children, themePark, onAdd }) => {
    const [isVisible, setIsVisible] = useState(false);
    // const [dateVisited, setDateVisited] = useState("");
    // const [park, setPark] = useState(null);
    // const {  user } = useAuth0();
    // const [userAttractions, setUserAttractions] = useState([]);


    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);



    // useEffect(() => {
    //     if(themePark) {
    //         setDateVisited(new Date().toISOString().split('T')[0]);
    //         setPark(themePark);
    //         setUserAttractions([]);
            
    //     }
    // }, [themePark]);



    if (!isVisible && !show) {
        return null;
    }

    return (
        <div className={`modal-backdrop ${show ? 'fade-in' : 'fade-out'}`}>
            <div className={`modal-content ${show ? 'fade-in' : 'fade-out'}`}>
                <h3> add a visit </h3>
                <button onClick={onClose} className="modal-close-button">
                    &times;
                </button>
                {children}
            </div>
        </div>
        
    );
};

export default AddVisitModal;
