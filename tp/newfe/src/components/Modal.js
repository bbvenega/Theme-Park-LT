import React from 'react';
import '../Styles/Modal.css';

const Modal = ({show, onClose, children}) => {
    if (!show) {
        return null;
    }

    return (
        <div className = "modal-backdrop">
            <div className = "modal-content">
                <button onClick = {onClose} className = "modal-close-button">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;