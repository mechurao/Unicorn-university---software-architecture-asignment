import React, { useState, useEffect, useRef } from 'react';
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/buttons/primaryButton";
import AddToiletForm from "../components/AddToiletForm";
import { APIService } from "../helpers/APIService";
import TokenHelper from "../helpers/TokenHelper";
import Checkbox from '@mui/joy/Checkbox';
import styles from "../styles/toilets.module.css";
import { Button, IconButton, Slider, Typography } from "@mui/material";
import SecondaryButton from "../components/buttons/secondaryButton";
import { Navigator } from "../helpers/Navigator";
import AddIcon from '@mui/icons-material/Add';

function Toilets() {
    const { getToilets, logout, checkToken } = APIService();
    const { openHome } = Navigator();

    const defaultLocation = {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    };

    const [userLocation, setUserLocation] = useState(defaultLocation);
    const [showAddToiletForm, setShowAddToiletForm] = useState(false);
    const [toilets, setToilets] = useState([]);
    const [filteredToilets, setFilteredToilets] = useState([]);
    const [radius, setRadius] = useState(1000); // Výchozí radius 1 km
    const mapRef = useRef(null);
    const prevCenterRef = useRef(defaultLocation);

    // checkboxes states
    const [freeCheckbox, setFreeCheckbox] = useState(true);
    const [codeCheckbox, setCodeCheckbox] = useState(true);
    const [paidCheckbox, setPaidCheckbox] = useState(true);

    const radiusMarks = [
        { value: 100, label: '100 m' },
        { value: 500, label: '500 m' },
        { value: 1000, label: '1 km' },
        { value: 2000, label: '2 km' },
        { value: 5000, label: '5 km' }
    ];

    const addToiletForm = () => {
        setShowAddToiletForm(true);
    };

    const handleFormClose = () => {
        setShowAddToiletForm(false);
    };

    const logoutUser = async () => {
        let token = TokenHelper.getToken();
        try {
            const response = await logout(token);
            if (response.status === 200) {
                TokenHelper.deleteToken();
                openHome();
            }
        } catch (e) {
            alert("Logout error");
            console.error(e);
        }
    }

    const fetchToilets = async (location, searchRadius) => {
        const token = TokenHelper.getToken();
        if (!token) {
            alert("Token error");
            return;
        }

        try {
            const response = await getToilets(token, location, searchRadius);
            if (response.status === 200) {
                setToilets(response.data.toilets);
                applyFilters(response.data.toilets);
            } else {
                alert("Fetching toilets error");
            }
        } catch (error) {
            alert("Server error");
            console.error("Error fetching toilets data:", error);
        }
    };

    const applyFilters = (toilets) => {
        const filtered = toilets.filter(toilet => {
            if (toilet.type === 0 && !freeCheckbox) return false;
            if (toilet.type === 1 && !codeCheckbox) return false;
            if (toilet.type === 2 && !paidCheckbox) return false;
            return true;
        });
        setFilteredToilets(filtered);
    };

    useEffect(() => {
        const getUserLocationAndFetchToilets = async () => {
            let token = TokenHelper.getToken();
            if (token === undefined) {
                openHome();
                return;
            }
            let valid = await checkToken(token);
            if (!valid) {
                openHome();
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        setUserLocation(location);
                        prevCenterRef.current = location; // Update previous center
                        fetchToilets(location, radius).then();
                    },
                    () => {
                        setUserLocation(defaultLocation);
                        prevCenterRef.current = defaultLocation; // Update previous center
                        fetchToilets(defaultLocation, radius).then();
                    }
                );
            } else {
                setUserLocation(defaultLocation);
                prevCenterRef.current = defaultLocation; // Update previous center
                fetchToilets(defaultLocation, radius).then();
            }
        };

        getUserLocationAndFetchToilets();
    }, []);

    const freeCheckAction = (event) => {
        setFreeCheckbox(event.target.checked);
    };

    const codeCheckAction = (event) => {
        setCodeCheckbox(event.target.checked);
    }

    const paidCheckAction = (event) => {
        setPaidCheckbox(event.target.checked);
    }

    useEffect(() => {
        applyFilters(toilets);
    }, [freeCheckbox, codeCheckbox, paidCheckbox]);

    const handleRadiusChange = (event, newValue) => {
        setRadius(newValue);
        const center = mapRef.current?.getCenter();
        if (center) {
            const location = {
                lat: center.lat(),
                lng: center.lng(),
            };
            fetchToilets(location, newValue).then();
        }
    };

    const handleMapIdle = () => {
        const center = mapRef.current?.getCenter();
        if (center) {
            const newCenter = {
                lat: center.lat(),
                lng: center.lng(),
            };
            const prevCenter = prevCenterRef.current;
            if (newCenter.lat !== prevCenter.lat || newCenter.lng !== prevCenter.lng) {
                prevCenterRef.current = newCenter; // Update previous center
                fetchToilets(newCenter, radius).then();
            }
        }
    };

    return (
        <>
            <NavBar
                title="Toilets"
                leftAction={<SecondaryButton title="Log out" callback={logoutUser} width={100} height={40} />}
                rightAction={
                    <IconButton color="primary" aria-label="add" onClick={addToiletForm} sx={{ color: 'white' }}>
                        <AddIcon />
                    </IconButton>
                }
            />
            <div className={styles.mapContainer}>
                <Map location={userLocation} toilets={filteredToilets} onMapIdle={handleMapIdle} mapRef={mapRef} />
            </div>
            <div className={styles.checkboxContainer}>
                <Checkbox className={styles.toiletTypeCheckbox} label={"Free"} checked={freeCheckbox} onChange={freeCheckAction} />
                <Checkbox className={styles.toiletTypeCheckbox} label={"Code"} checked={codeCheckbox} onChange={codeCheckAction} />
                <Checkbox className={styles.toiletTypeCheckbox} label={"Paid"} checked={paidCheckbox} onChange={paidCheckAction} />
            </div>
            <div className={styles.sliderContainer}>
                <Typography gutterBottom>Search Radius</Typography>
                <Slider
                    value={radius}
                    onChange={handleRadiusChange}
                    valueLabelDisplay="auto"
                    step={null}
                    marks={radiusMarks}
                    min={100}
                    max={5000}
                />
            </div>
            {showAddToiletForm && <AddToiletForm onClose={handleFormClose} />}
        </>
    );
}

export default Toilets;
