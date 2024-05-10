import React, { useState, useEffect } from 'react';
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/buttons/primaryButton";
import AddToiletForm from "../components/AddToiletForm";
import { APIService } from "../helpers/APIService";
import TokenHelper from "../helpers/TokenHelper";

function Toilets() {
    const defaultLocation = {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    };

    const [userLocation, setUserLocation] = useState(defaultLocation);
    const [showAddToiletForm, setShowAddToiletForm] = useState(false);
    const [toilets, setToilets] = useState([]);
    const [error, setError] = useState(null);
    const radius = 10000; // Příklad: poloměr 10 km

    const addToiletForm = () => {
        setShowAddToiletForm(true);
    };

    const handleFormClose = () => {
        setShowAddToiletForm(false);
    };

    const { getToilets } = APIService();

    const fetchToilets = async (location) => {
        const token = TokenHelper.getToken();
        if (!token) {
            setError("No token available.");
            return;
        }

        try {
            const response = await getToilets(token, location, radius);
            if (response.status === 200) {
                setToilets(response.data.toilets);
                setError(null);
            } else {
                setError("Failed to fetch toilets data");
                console.error("Failed to fetch toilets data");
            }
        } catch (error) {
            setError("Failed to fetch toilets data due to an error");
            console.error("Error fetching toilets data:", error);
        }
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

    return (
        <>
            <NavBar title="Toilets" />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Map location={userLocation} toilets={toilets} />
            <PrimaryButton title="Add" callback={addToiletForm} />
            {showAddToiletForm && <AddToiletForm onClose={handleFormClose} />}
        </>
    );
}

export default Toilets;
