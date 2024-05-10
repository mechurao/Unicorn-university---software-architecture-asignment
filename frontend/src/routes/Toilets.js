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
            } else {
                alert("Fetching toilets error");
            }
        } catch (error) {
            alert("Server error");
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
            <Map location={userLocation} toilets={toilets} />
            <PrimaryButton title="Add" callback={addToiletForm} />
            {showAddToiletForm && <AddToiletForm onClose={handleFormClose} />}
        </>
    );
}

export default Toilets;
