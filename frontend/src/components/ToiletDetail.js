import React from 'react';
import { Button, TextField, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from './Modal';
import styles from '../styles/addToiletForm.module.css';

function ToiletDetail({ toilet, onClose }) {
    return (
        <Modal closing={false} onClose={onClose}>
            <div className={styles.form}>
                <DialogTitle>
                    {toilet.name}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={toilet.name}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        label="Description"
                        value={toilet.description}
                        fullWidth
                        multiline
                        rows={3}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    {toilet.type === 1 && (
                        <TextField
                            label="Access Code"
                            value={toilet.extra_info}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    )}
                    {toilet.type === 2 && (
                        <TextField
                            label="Price"
                            value={`${toilet.extra_info}`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    )}
                    <div className={styles.buttonGroup}>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </div>
        </Modal>
    );
}

export default ToiletDetail;
