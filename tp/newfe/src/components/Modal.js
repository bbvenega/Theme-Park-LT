import React, {useEffect, useState} from 'react';
import '../Styles/Modal.css'
;

const Modal = ({show, onClose, children}) => {
    const [isVisibile, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);


    return (
        <div className={`modal-backdrop ${show ? 'fade-in' : 'fade-out'}`}>
            <div className= {`modal-content ${show ? 'fade-in' : 'fade-out'}`}>
                <button onClick = {onClose} className = "modal-close-button">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;