import React from 'react';
import '../Styles/Modal.css';
import { formatTime } from '../services/formatTime';

const ConfirmationModal = ({ show, onClose, onConfirm, elapsedTime }) => {
    if (!show) {
        return null;
    }

    return (
        <div className = "modal-backdrop">
            <div className = "modal-content">
                <h3> Confirm Submission</h3>
                <p> Are you sure you want to submit the time: {formatTime(elapsedTime)}?</p>
                <button onClick = {onConfirm}> Yes</button>
                <button onClick = {onClose}> No</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;