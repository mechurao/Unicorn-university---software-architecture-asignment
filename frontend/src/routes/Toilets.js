import React, { useState, useEffect } from 'react';
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/buttons/primaryButton";
import AddToiletForm from "../components/AddToiletForm";
import { APIService } from "../helpers/APIService";
import TokenHelper from "../helpers/TokenHelper";
import Checkbox from '@mui/joy/Checkbox';
import styles from "../styles/toilets.module.css";

function Toilets() {
    const defaultLocation = {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    };

    const [userLocation, setUserLocation] = useState(defaultLocation);
    const [showAddToiletForm, setShowAddToiletForm] = useState(false);
    const [toilets, setToilets] = useState([]);
    const [filteredToilets, setFilteredToilets] = useState([]);

    // checkboxes states
    const [freeCheckbox, setFreeCheckbox] = useState(true);
    const [codeCheckbox, setCodeCheckbox] = useState(true);
    const [paidCheckbox, setPaidCheckbox] = useState(true);

    const radius = 10000; // in meters

    const { getToilets } = APIService();

    const addToiletForm = () => {
        setShowAddToiletForm(true);
    };

    const handleFormClose = () => {
        setShowAddToiletForm(false);
    };

    const fetchToilets = async (location) => {
        const token = TokenHelper.getToken();
        if (!token) {
            alert("Token error");
            return;
        }

        try {
            const response = await getToilets(token, location, radius);
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
        const getUserLocationAndFetchToilets = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const location = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        setUserLocation(location);
                        fetchToilets(location).then();
                    },
                    () => {
                        setUserLocation(defaultLocation);
                        fetchToilets(defaultLocation).then();
                    }
                );
            } else {
                setUserLocation(defaultLocation);
                fetchToilets(defaultLocation).then();
            }
        };

        getUserLocationAndFetchToilets();
    }, []);

    // Checkbox actions
    const freeCheckAction = (event) => {
        setFreeCheckbox(event.target.checked);
    };

    const codeCheckAction = (event) => {
        setCodeCheckbox(event.target.checked);
    }

    const paidCheckAction = (event) => {
        setPaidCheckbox(event.target.checked);
    }

    // Apply filters whenever the checkbox state changes
    useEffect(() => {
        applyFilters(toilets);
    }, [freeCheckbox, codeCheckbox, paidCheckbox]);

    return (
        <>
            <NavBar title="Toilets" />
            <div className={styles.mapContainer}>
                <Map location={userLocation} toilets={filteredToilets} />
            </div>
            <div className={styles.checkboxContainer}>
                <Checkbox className={styles.toiletTypeCheckbox} label={"Free"} checked={freeCheckbox} onChange={freeCheckAction} />
                <Checkbox className={styles.toiletTypeCheckbox} label={"Code"} checked={codeCheckbox} onChange={codeCheckAction}/>
                <Checkbox className={styles.toiletTypeCheckbox} label={"Paid"} checked={paidCheckbox} onChange={paidCheckAction}/>
            </div>
            <PrimaryButton title="Add" callback={addToiletForm} />
            {showAddToiletForm && <AddToiletForm onClose={handleFormClose} />}
        </>
    );
}

export default Toilets;
