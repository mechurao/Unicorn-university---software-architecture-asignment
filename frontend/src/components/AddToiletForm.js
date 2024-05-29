import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import styles from '../styles/addToiletForm.module.css';
import { Currency } from "./objects/Currency";
import { APIService } from "../helpers/APIService";

import { GOOGLE_MAPS_API_KEY } from "../values/keys";
import TokenHelper from "../helpers/TokenHelper";

const { addToilet } = APIService();

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
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const mapRef = useRef();
    const [formData, setFormData] = useState({
        type: "0",
        name: '',
        description: '',
        price: '',
        currency: Currency.eur,
        accessCode: '',
    });
    const [mapCenter, setMapCenter] = useState(defaultLocation);
    const [closing, setClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!shouldRender) {
            const timer = setTimeout(() => {
                onClose();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [shouldRender, onClose]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMapCenter(userLocation);
                },
                () => {
                    console.error("Error fetching user location");
                }
            );
        }
    }, []);

    async function handleFormSubmit(event) {
        event.preventDefault();
        const center = mapRef.current.getCenter();
        setMapCenter({ lat: center.lat(), lng: center.lng() });
        let result = await processData();
        if (result) {
            alert("success");
            setClosing(true);
            setShouldRender(false);
        } else {
            alert("Error");
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === 'currency') {
            setFormData({ ...formData, [name]: Currency[value.toLowerCase()] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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

    async function processData() {
        const data = {
            type: formData.type,
            name: formData.name,
            description: formData.description,
            location: {
                lat: mapCenter.lat,
                lng: mapCenter.lng
            },
        };

        if (formData.type === "1") {
            data.code = formData.accessCode;
        }

        if (formData.type === "2") {
            data.price = {
                amount: formData.price,
                currency: formData.currency.id
            };
        }

        let token = TokenHelper.getToken();
        try {
            return await addToilet(data, token);
        } catch (error) {
            console.error('Failed to add toilet:', error);
            return false;
        }
    }

    const currencyArray = Object.values(Currency);

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
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        fullWidth
                        required
                    />
                    <InputLabel>Type:</InputLabel>
                    <ToggleButtonGroup
                        color="primary"
                        value={formData.type}
                        exclusive
                        onChange={handleTypeChange}
                        fullWidth
                    >
                        <ToggleButton value="0">Free</ToggleButton>
                        <ToggleButton value="1">Code Access</ToggleButton>
                        <ToggleButton value="2">Paid</ToggleButton>
                    </ToggleButtonGroup>

                    {formData.type === "1" && (
                        <TextField
                            label="Access Code"
                            name="accessCode"
                            value={formData.accessCode}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    )}

                    {formData.type === "2" && (
                        <>
                            <TextField
                                label="Price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                inputProps={{ min: 0 }}
                                fullWidth
                                required
                            />
                            <FormControl fullWidth required>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    name="currency"
                                    value={formData.currency.name}
                                    onChange={handleInputChange}>
                                    {currencyArray.map(currency => (
                                        <MenuItem key={currency.id} value={currency.name}>{currency.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
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
