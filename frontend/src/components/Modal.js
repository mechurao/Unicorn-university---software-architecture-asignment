import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styles from '../styles/modal.module.css';

const Modal = ({ children, closing, onClose }) => {
    return (
        <Dialog open={!closing} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogContent>
                <div className={closing ? styles.modalContainerClosing : styles.modalContainer}>
                    <div className={styles.modalBackground}>
                        <div className={styles.modal}>
                            <button className={styles.closeButton} onClick={onClose}>
                                &times;
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
