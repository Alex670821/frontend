// src/components/NotificationModal.js
import React from 'react';
import '../styles/NotificationModal.css';

const NotificationModal = ({ show, handleClose, message }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>¡Felicidades!</h2>
                    <button className="close-button" onClick={handleClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="action-button" onClick={handleClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
