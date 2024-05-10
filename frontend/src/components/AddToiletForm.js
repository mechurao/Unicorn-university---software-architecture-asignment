import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { ToggleButton, ToggleButtonGroup, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import styles from '../styles/addToiletForm.module.css';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '300px',
};

const defaultLocation = {
    lat: 7.2905715,
    lng: 80.6337262,
};

function AddToiletForm({ onClose }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBP8NPW4lmtUS2JM47Qs_ViycFVkzQyaCY',
        libraries,
    });

    const mapRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'Free',
        price: '',
        currency: 'EUR',
        accessCode: '',
    });
    const [mapCenter, setMapCenter] = useState(defaultLocation);
    const [closing, setClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!shouldRender) {
            const timer = setTimeout(() => {
                onClose();
            }, 800); // Trvání animace zavírání
            return () => clearTimeout(timer);
        }
    }, [shouldRender, onClose]);

    function handleFormSubmit(event) {
        event.preventDefault();
        const center = mapRef.current.getCenter();
        setMapCenter({ lat: center.lat(), lng: center.lng() });
        console.log('Form Data:', { ...formData, location: mapCenter });
        setClosing(true);
        setShouldRender(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleTypeChange(event, newType) {
        setFormData({ ...formData, type: newType, price: '', accessCode: '' });
    }

    function handleCancel() {
        setClosing(true);
        setShouldRender(false);
    }

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        shouldRender && (
            <Modal closing={closing} onClose={handleCancel}>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <h2>Add a New Toilet</h2>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        required
                    />
                    <InputLabel>Type:</InputLabel>
                    <ToggleButtonGroup
                        color="primary"
                        value={formData.type}
                        exclusive
                        onChange={handleTypeChange}
                    >
                        <ToggleButton value="Free">Free</ToggleButton>
                        <ToggleButton value="Paid">Paid</ToggleButton>
                        <ToggleButton value="Code access">Code Access</ToggleButton>
                    </ToggleButtonGroup>

                    {formData.type === 'Paid' && (
                        <>
                            <TextField
                                label="Price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                inputProps={{ min: 0 }}
                                required
                            />
                            <FormControl fullWidth required>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="EUR">EUR</MenuItem>
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="GBP">GBP</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}

                    {formData.type === 'Code access' && (
                        <TextField
                            label="Access Code"
                            name="accessCode"
                            value={formData.accessCode}
                            onChange={handleInputChange}
                            required
                        />
                    )}

                    <label>Location:</label>
                    <div className={styles.mapContainer}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={mapCenter}
                            onLoad={(map) => (mapRef.current = map)}
                            onDragEnd={() => {
                                const center = mapRef.current.getCenter();
                                setMapCenter({ lat: center.lat(), lng: center.lng() });
                            }}
                        />
                        <div className={styles.mapPin}></div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        )
    );
}

export default AddToiletForm;
