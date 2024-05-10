import React from 'react';
import styles from '../styles/modal.module.css';

function Modal({ children, onClose, closing }) {
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={closing ? styles.modalContainerClosing : styles.modalContainer} onClick={handleOverlayClick}>
            <div className={styles.modalBackground}>
                <div className={styles.modal}>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
